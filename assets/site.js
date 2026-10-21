/* marcondes.dev — page behaviour shared by every page: language, menus,
   the animated favicon, the cursor-reactive résumé text, and the links
   between the timeline and the gallery cards. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- language: both versions are in the page; this flips which one shows ---- */
  var titles = {};
  try { titles = JSON.parse((document.getElementById("i18n-title") || {}).textContent || "{}"); } catch (e) { titles = {}; }
  function applyLang(l, announce) {
    root.setAttribute("data-lang", l);
    root.lang = l === "pt" ? "pt-BR" : "en";
    if (titles[l]) document.title = titles[l];
    [].forEach.call(document.querySelectorAll("[data-set-lang]"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === l ? "true" : "false");
    });
    [].forEach.call(document.querySelectorAll("[data-aria-" + l + "]"), function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-aria-" + l));
    });
    [].forEach.call(document.querySelectorAll("[data-href-" + l + "]"), function (el) {
      el.setAttribute("href", el.getAttribute("data-href-" + l));
    });
    if (announce) document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  }
  applyLang(root.getAttribute("data-lang") === "pt" ? "pt" : "en", false);
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-lang]");
    if (!b) return;
    var l = b.getAttribute("data-set-lang");
    try { localStorage.setItem("lang", l); } catch (err) {}
    applyLang(l, true);
  });

  /* ---- animated favicon: a pulsing green dot ---- */
  (function () {
    var link = document.getElementById("favicon");
    if (!link) return;
    var cv = document.createElement("canvas");
    if (!cv.getContext) return;
    cv.width = cv.height = 64;
    var g = cv.getContext("2d");
    var GREEN = "34,197,94";  /* #22c55e */
    function draw(phase) {
      g.clearRect(0, 0, 64, 64);
      var cx = 32, cy = 32, env = Math.sin(phase * Math.PI);   /* 0 → 1 → 0 */
      var haloR = 11 + phase * 20;
      var grd = g.createRadialGradient(cx, cy, Math.max(0.1, haloR * 0.35), cx, cy, haloR);
      grd.addColorStop(0, "rgba(" + GREEN + "," + (0.55 * env).toFixed(3) + ")");
      grd.addColorStop(1, "rgba(" + GREEN + ",0)");
      g.fillStyle = grd; g.beginPath(); g.arc(cx, cy, haloR, 0, 6.2832); g.fill();
      var coreR = 8.5 + env * 1.6;
      g.fillStyle = "rgb(" + GREEN + ")";
      g.beginPath(); g.arc(cx, cy, coreR, 0, 6.2832); g.fill();
      try { link.href = cv.toDataURL("image/png"); } catch (e) {}
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { draw(0.0001); return; }
    var start = performance.now(), period = 1500;
    setInterval(function () { draw((((performance.now() - start) % period) / period)); }, 66);
  })();

  /* ---- links dropdown ---- */
  (function () {
    var lm = document.getElementById("linkmenu");
    var btn = document.getElementById("linkBtn");
    if (!lm || !btn) return;
    function setOpen(o) {
      lm.dataset.open = o ? "true" : "false";
      btn.setAttribute("aria-expanded", o ? "true" : "false");
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(lm.dataset.open !== "true"); });
    document.addEventListener("click", function (e) { if (!lm.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lm.dataset.open === "true") { setOpen(false); btn.focus(); }
    });
  })();

  /* ---- timeline rows and gallery cards light each other up ---- */
  (function () {
    var cards = [].slice.call(document.querySelectorAll(".card[data-id]"));
    if (!cards.length) return;
    cards.forEach(function (c) {
      c.addEventListener("pointerenter", function () { document.dispatchEvent(new CustomEvent("card:hover", { detail: c.getAttribute("data-id") })); });
      c.addEventListener("pointerleave", function () { document.dispatchEvent(new CustomEvent("card:hover", { detail: null })); });
    });
    document.addEventListener("timeline:hover", function (e) {
      cards.forEach(function (c) { c.classList.toggle("is-hot", c.getAttribute("data-id") === e.detail); });
      var hot = cards.filter(function (c) { return c.getAttribute("data-id") === e.detail; })[0];
      if (window.ASCII) window.ASCII.sea.focus(hot || null);
    });
  })();

  /* ---- tool icons glitch for a moment when hovered ---- */
  (function () {
    var G = "#%&*+=-:./\\|<>~^";
    [].forEach.call(document.querySelectorAll(".tool"), function (li) {
      var pre = li.querySelector(".tool-ico");
      if (!pre) return;
      var orig = pre.textContent, glyph = pre.getAttribute("data-g") || "", timer = null;
      li.addEventListener("pointerenter", function () {
        if (timer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        var n = 0;
        timer = setInterval(function () {
          n++;
          var s = glyph.padEnd(5).slice(0, 5).split("").map(function (ch, i) {
            return i < n - 3 ? ch : G[Math.floor(Math.random() * G.length)];
          }).join("");
          pre.textContent = orig.replace(/│.{5}│/, "│" + s + "│");
          if (n > 9) { clearInterval(timer); timer = null; pre.textContent = orig; }
        }, 45);
      });
    });
  })();

  /* ---- cursor-reactive focus on muted text (subtle; off for reduced-motion / touch) ---- */
  (function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    var vignette = document.querySelector(".vignette");
    function readRGB(n) { return getComputedStyle(root).getPropertyValue(n).trim().split(",").map(Number); }
    var INK = readRGB("--ink-rgb"), MUT = readRGB("--muted-rgb");
    var items = [].slice.call(document.querySelectorAll(".page .dim")).map(function (el) { return { el: el, cx: 0, cy: 0, f: 0 }; });
    function measure() {
      for (var i = 0; i < items.length; i++) {
        var r = items[i].el.getBoundingClientRect();
        items[i].cx = r.left + r.width / 2; items[i].cy = r.top + r.height / 2;
      }
    }
    measure();
    var mx = -9999, my = -9999, active = false, raf = null, R = 165, R2 = R * R;
    function tick() {
      var busy = active;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var dx = mx - it.cx, dy = my - it.cy, d2 = dx * dx + dy * dy, t = 0;
        if (active && d2 < R2) t = Math.pow(1 - Math.sqrt(d2) / R, 1.7);
        it.f += (t - it.f) * 0.16;
        if (it.f > 0.004) {
          busy = true;
          var f = it.f * 0.72;
          it.el.style.color = "rgb(" + Math.round(MUT[0] + (INK[0] - MUT[0]) * f) + "," + Math.round(MUT[1] + (INK[1] - MUT[1]) * f) + "," + Math.round(MUT[2] + (INK[2] - MUT[2]) * f) + ")";
        } else if (it.el.style.color) { it.el.style.color = ""; it.f = 0; }
      }
      raf = busy ? requestAnimationFrame(tick) : null;
    }
    function ensure() { if (!raf) raf = requestAnimationFrame(tick); }
    window.addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY; active = true;
      if (vignette) { vignette.style.setProperty("--mx", mx + "px"); vignette.style.setProperty("--my", my + "px"); }
      ensure();
    }, { passive: true });
    window.addEventListener("pointerleave", function () { active = false; ensure(); });
    window.addEventListener("blur", function () { active = false; ensure(); });
    var rz;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(measure, 150); });
    window.addEventListener("scroll", measure, { passive: true });
    document.addEventListener("langchange", function () { setTimeout(measure, 50); });
  })();
})();
