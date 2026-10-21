/* marcondes.dev — the tour: a short pitch told as one continuous scene.
   A single field of ASCII particles flies from one shape to the next while a
   year ruler pans underneath, so the steps read as one camera move rather
   than a stack of slides. Text decodes in place; nothing is reloaded. */
(function () {
  "use strict";
  var A = window.ASCII;
  var dataEl = document.getElementById("tour-data");
  if (!A || !dataEl) return;
  var DATA = JSON.parse(dataEl.textContent);
  var tr = A.tr, clamp = A.clamp, ease = A.ease, REDUCE = A.REDUCE;

  /* ---------- shapes ---------- */
  var SHAPES = {
    question: [
      "      .-~~~~~~-.",
      "    .'  .----.  '.",
      "   /   /      \\   \\",
      "   |   |      |   |",
      "    \\__/      /   /",
      "            .'  .'",
      "           /  .'",
      "          |  |",
      "          |__|",
      "",
      "          .--.",
      "          '--'"],
    leg: [
      "    .--------------.",
      "    |  ::::::::::  |",
      "    |  ::::::::::  |",
      "     \\  ::::::::  /",
      "      \\__________/",
      "         [====]",
      "          ||||",
      "          ||||",
      "          ||||",
      "          ||||",
      "          ||||",
      "         _||||___",
      "        /        `--.._",
      "       (______________)~~"],
    trike: [
      "                    .--.",
      "                   ( o  )",
      "                    `--'\\",
      "                         \\____",
      "          ___         ____\\   `--.____",
      "       .-'   '-.     /     \\        ==o\\",
      "      /    |    \\   /       \\         ) )",
      "     |  ---O---  |-'         `--.__ _/_/",
      "      \\    |    /                 .---.",
      "       '-.___.-'                 ( -O- )",
      "                                  `---'",
      "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"],
    network: [
      "          o-----------o",
      "         / \\         / \\",
      "        /   \\       /   \\",
      "   o---o     \\     /     o---o",
      "        \\     [ NRO ]     /",
      "         \\   /   |   \\   /",
      "          o-o    |    o-o",
      "         /       |       \\",
      "        o    o---o---o    o",
      "             |       |",
      "             o       o"],
    brain: [
      "         _.-~~~-._.-~~~-._",
      "       .'   .-.     .-.   '.",
      "      /   .'   '-.-'   '.   \\",
      "     |   (    .--.--.    )   |",
      "      \\   '-.(  (_)  ).-'   /",
      "       '.    '-.___.-'    .'",
      "         '-.__       __.-'",
      "              ||   ||",
      "  _/\\_/\\/\\_   ||   ||   _/\\/\\_/\\_",
      "              ||   ||",
      "             [ FES  ]"],
    lungs: [
      "               ||",
      "               ||",
      "         .-.   ||   .-.",
      "       .'   \\_/  \\_/   '.",
      "      /  :::::|  |:::::  \\",
      "     |  ::::::|  |::::::  |",
      "     |  ::::::|  |::::::  |",
      "      \\  ::::/    \\::::  /",
      "       '.__.'      '.__.'",
      "     ~~~~~~~~~~~~~~~~~~~~~~~",
      "       ‿‿‿  diaphragm  ‿‿‿"],
    andon: [
      "     [#]        [#]        [#]",
      "      |          |          |",
      "   .------.   .------.   .------.",
      "   | ST1  |   | ST2  |   | ST3  |",
      "   '------'   '------'   '------'",
      "  ================================",
      "    []     []      []     []   []",
      "",
      "   ░░▒▒▓▓██  calls x hour  ██▓▒░"],
    stars: [
      "   *              .            +",
      "          .---*-------.",
      "     +   /     \\       \\      *",
      "        *       +-------*",
      "         \\     /    .",
      "   .      *---*            +",
      "                \\",
      "      +          *-----*        .",
      "                         \\",
      "    .       +             *"],
    shark: [
      "                      _",
      "                    _/ |",
      "                  _/   |",
      "   \\`._       _.-'      `'--..__",
      "    \\  `-.--''                  ``-._",
      "     >  )))                   o      `>",
      "    /  ,-.--..__            ____.--''",
      "   /,-'         ``---.....--'",
      "               `\\ \\",
      "                 `-'"]
  };
  var COLORS = ["indigo", "blue", "violet", "indigo", "lime"];
  function shapeCells(name, aspect) {
    var cells = [];
    if (name === "dot") {
      var r = 11;
      for (var y = -Math.ceil(r / aspect); y <= Math.ceil(r / aspect); y++)
        for (var x = -r; x <= r; x++) {
          var d = Math.hypot(x, y * aspect) / r;
          if (d > 1) continue;
          cells.push({ x: x, y: y, ch: "@%#*+=-:."[Math.min(8, Math.floor(d * 9))], c: d < 0.55 ? "lime" : d < 0.8 ? "limeHi" : "lime", a: 1 - d * 0.55 });
        }
      return cells;
    }
    var art = SHAPES[name] || SHAPES.stars, w = 0;
    art.forEach(function (l) { w = Math.max(w, l.length); });
    art.forEach(function (l, row) {
      for (var i = 0; i < l.length; i++) {
        if (l[i] === " ") continue;
        var ch = l[i], c = COLORS[(row + Math.floor(i / 9)) % 4];
        if ("░▒▓█".indexOf(ch) >= 0) c = "violet";
        if (ch === "~" || ch === "‿" || ch === "*" || ch === "o" && name === "network") c = "lime";
        cells.push({ x: i - w / 2, y: row - art.length / 2, ch: ch, c: c, a: 0.95 });
      }
    });
    return cells;
  }

  /* ---------- state ---------- */
  var ov, cv, G, textBox, kickerEl, titleEl, bodyEl, statsEl, moreEl, ctaEl, progEl, playBtn, prevBtn, nextBtn, closeBtn, hintEl;
  var parts = [], step = 0, playing = !REDUCE, stepStart = 0, raf = 0, opened = false, lastFocus = null;
  var titleTarget = "", titleStart = 0, kickerTarget = "", rulerX = 0, rulerFrom = 0, rulerTo = 0, rulerT = 0;
  var STEP_SECONDS = 7.5, N = 560, GLYPHS = ".:+*·•%#=-";
  var steps = DATA.steps;
  var years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function build() {
    ov = el("div", "tour");
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Tour");
    cv = el("canvas", "tour-cv"); cv.setAttribute("aria-hidden", "true");
    ov.appendChild(cv);
    textBox = el("div", "tour-text"); textBox.setAttribute("aria-live", "polite");
    kickerEl = el("p", "tour-kicker"); titleEl = el("h2", "tour-title"); bodyEl = el("p", "tour-body");
    statsEl = el("ul", "tour-stats"); ctaEl = el("div", "tour-cta"); moreEl = el("a", "tour-more");
    [kickerEl, titleEl, bodyEl, statsEl, ctaEl, moreEl].forEach(function (x) { textBox.appendChild(x); });
    ov.appendChild(textBox);
    var bar = el("div", "tour-bar");
    prevBtn = el("button", "tour-btn", "←"); playBtn = el("button", "tour-btn", "❚❚"); nextBtn = el("button", "tour-btn", "→");
    [prevBtn, playBtn, nextBtn].forEach(function (b) { b.type = "button"; });
    progEl = el("div", "tour-prog");
    steps.forEach(function (s, i) {
      var b = el("button", null, "<i></i>"); b.type = "button";
      b.addEventListener("click", function () { go(i); });
      progEl.appendChild(b);
    });
    hintEl = el("span", "tour-hint");
    bar.appendChild(prevBtn); bar.appendChild(playBtn); bar.appendChild(nextBtn); bar.appendChild(progEl); bar.appendChild(hintEl);
    ov.appendChild(bar);
    closeBtn = el("button", "tour-btn tour-close", "✕"); closeBtn.type = "button";
    ov.appendChild(closeBtn);
    document.body.appendChild(ov);
    G = new A.Grid(cv);
    prevBtn.addEventListener("click", function () { go(step - 1); });
    nextBtn.addEventListener("click", function () { go(step + 1); });
    playBtn.addEventListener("click", function () { setPlaying(!playing); });
    closeBtn.addEventListener("click", close);
    ov.addEventListener("keydown", onKey);
    window.addEventListener("resize", function () { if (opened) { size(); retarget(true); } });
    document.addEventListener("langchange", function () { if (opened) { labels(); show(step, true); } });
  }
  function labels() {
    var U = DATA.ui;
    prevBtn.setAttribute("aria-label", tr(U.prev)); nextBtn.setAttribute("aria-label", tr(U.next));
    closeBtn.setAttribute("aria-label", tr(U.close));
    playBtn.setAttribute("aria-label", playing ? tr(U.pause) : tr(U.play));
    hintEl.textContent = tr(U.hint);
    [].forEach.call(progEl.children, function (b, i) { b.setAttribute("aria-label", (i + 1) + " / " + steps.length + " · " + tr(steps[i].title)); });
  }
  function size() {
    var W = window.innerWidth, H = window.innerHeight;
    var fs = clamp(W * 0.42 / (46 * 0.6), 9, 19);
    if (W < 680) fs = clamp(W * 0.9 / (46 * 0.6), 7, 12);
    G.font(Math.round(fs * 10) / 10, 1.2);
    G.size(W, H);
  }
  function center() {
    var narrow = window.innerWidth < 680;
    return narrow ? [G.cols * 0.5, G.rows * 0.27] : [G.cols * 0.72, G.rows * 0.46];
  }

  /* ---------- particles ---------- */
  function seed() {
    parts = [];
    for (var i = 0; i < N; i++) {
      var x = Math.random() * G.cols, y = Math.random() * G.rows;
      parts.push({ x: x, y: y, sx: x, sy: y, tx: x, ty: y, ch: "·", tch: "·", c: "muted", tc: "muted", a: 0, ta: 0.2, sa: 0, delay: 0, dur: 1, swirl: 0, dust: true, seed: Math.random() * 100 });
    }
  }
  function retarget(instant) {
    var s = steps[step], cells = shapeCells(s.shape, G.aspect), c = center();
    var now = performance.now() / 1000;
    var cx = 0, cy = 0;
    parts.forEach(function (p) { cx += p.x; cy += p.y; }); cx /= parts.length; cy /= parts.length;
    var ord = parts.map(function (p, i) { return i; });
    ord.sort(function (a, b) { return Math.atan2((parts[a].y - cy) * G.aspect, parts[a].x - cx) - Math.atan2((parts[b].y - cy) * G.aspect, parts[b].x - cx); });
    cells.sort(function (a, b) { return Math.atan2(a.y * G.aspect, a.x) - Math.atan2(b.y * G.aspect, b.x); });
    var m = Math.min(cells.length, parts.length);
    /* spread the assignment so leftovers are drawn from all around the field */
    var stride = parts.length / Math.max(1, m);
    var used = {};
    for (var k = 0; k < m; k++) {
      var idx = ord[Math.floor(k * stride) % ord.length];
      used[idx] = 1;
      var p = parts[idx], cell = cells[k];
      launch(p, c[0] + cell.x, c[1] + cell.y, cell.ch, cell.c, cell.a, k / m, now, instant);
      p.dust = false;
    }
    parts.forEach(function (p, i) {
      if (used[i]) return;
      var x = Math.random() * G.cols, y = Math.random() * G.rows;
      launch(p, x, y, Math.random() < 0.5 ? "·" : ".", "muted", 0.18 + Math.random() * 0.12, Math.random(), now, instant);
      p.dust = true;
    });
  }
  function launch(p, tx, ty, ch, c, a, order, now, instant) {
    p.sx = p.x; p.sy = p.y; p.sa = p.a;
    p.tx = tx; p.ty = ty; p.tch = ch; p.tc = c; p.ta = a;
    p.t0 = now; p.delay = instant || REDUCE ? 0 : order * 0.45 + Math.random() * 0.25;
    p.dur = instant || REDUCE ? 0.0001 : 0.9 + Math.random() * 0.6;
    p.swirl = (Math.random() - 0.5) * 14;
  }
  function frame(now) {
    raf = 0;
    if (!opened) return;
    var t = now / 1000;
    G.clear();
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], q = clamp((t - p.t0 - p.delay) / p.dur, 0, 1), e = ease(q);
      var dx = p.tx - p.sx, dy = p.ty - p.sy, len = Math.hypot(dx, dy) || 1;
      var off = Math.sin(q * Math.PI) * p.swirl;
      p.x = p.sx + dx * e + (-dy / len) * off;
      p.y = p.sy + dy * e + (dx / len) * off / G.aspect;
      p.a = p.sa + (p.ta - p.sa) * e;
      if (q >= 1) { p.ch = p.tch; p.c = p.tc; }
      else if (q > 0) { if (Math.random() < 0.3) p.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; p.c = q > 0.6 ? p.tc : "indigo"; }
      var wob = p.dust && !REDUCE ? Math.sin(t * 0.4 + p.seed) * 0.6 : 0;
      var shimmer = !p.dust && q >= 1 && !REDUCE ? 0.85 + 0.15 * Math.sin(t * 2.2 + p.seed) : 1;
      G.set(p.x + wob, p.y, p.ch, p.c, Math.max(0, p.a * shimmer));
    }
    /* year ruler: pans to the step's year, so the whole tour reads as one move */
    var rp = REDUCE ? 1 : ease(clamp((t - rulerT) / 1.4, 0, 1));
    rulerX = rulerFrom + (rulerTo - rulerFrom) * rp;
    var ry = G.rows - 6, span = Math.max(14, Math.floor(G.cols / 6)), mid = Math.floor(G.cols / 2);
    for (var x = 0; x < G.cols; x++) {
      var yr = (x - mid) / span + rulerX;
      var near = Math.abs(yr - Math.round(yr)) < 0.5 / span;
      G.set(x, ry, near ? "┼" : "─", "muted", 0.35);
      if (near) {
        var Y = Math.round(yr);
        if (years.indexOf(Y) >= 0) G.text(Math.round(x - 2), ry + 1, String(Y), Math.abs(Y - rulerTo) < 0.01 && rp > 0.9 ? "limeInk" : "muted", Math.abs(Y - rulerTo) < 0.01 ? 1 : 0.6);
      }
    }
    G.set(mid, ry - 1, "▼", "lime", 0.9);
    /* a shark crossing the deep end, slowly */
    if (!REDUCE) {
      var spr = A.SPRITES.small.l[Math.floor(t * 3) % 2], sx = G.cols - ((t * 6) % (G.cols + 30)) + 10;
      G.art(Math.round(sx), ry - 5, spr, "blue", 0.18);
    }
    G.draw();
    decode(t);
    progress(t);
    if (playing && !steps[step].final && t - stepStart > STEP_SECONDS) go(step + 1);
    raf = requestAnimationFrame(frame);
  }

  /* ---------- text ---------- */
  function decode(t) {
    var p = REDUCE ? 1 : clamp((t - titleStart) / 0.9, 0, 1);
    var n = Math.floor(titleTarget.length * p), out = "";
    for (var i = 0; i < titleTarget.length; i++) {
      var ch = titleTarget[i];
      if (i < n || ch === " ") out += ch;
      else if (i < n + 8) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      else out += "\u00a0";
    }
    if (titleEl.textContent !== out) titleEl.textContent = out;
    var k = Math.floor(kickerTarget.length * clamp((t - titleStart + 0.2) / 0.5, 0, 1));
    var ks = REDUCE ? kickerTarget : kickerTarget.slice(0, k);
    if (kickerEl.textContent !== ks) kickerEl.textContent = ks;
  }
  function progress(t) {
    [].forEach.call(progEl.children, function (b, i) {
      var f = i < step ? 1 : i > step ? 0 : steps[step].final ? 1 : clamp((t - stepStart) / STEP_SECONDS, 0, 1);
      b.firstChild.style.width = (f * 100) + "%";
      b.setAttribute("aria-current", i === step ? "step" : "false");
    });
  }
  function show(i, keepTitle) {
    var s = steps[i], U = DATA.ui;
    titleTarget = tr(s.title); kickerTarget = tr(s.kicker);
    if (!keepTitle) titleStart = performance.now() / 1000;
    titleEl.setAttribute("aria-label", titleTarget);
    bodyEl.classList.add("is-out");
    setTimeout(function () {
      bodyEl.textContent = tr(s.body);
      bodyEl.classList.remove("is-out");
      statsEl.innerHTML = (s.stats || []).map(function (x) { return "<li><b>" + x.v + "</b><span>" + tr(x.l) + "</span></li>"; }).join("");
      statsEl.style.display = s.stats ? "" : "none";
      if (s.href) { moreEl.style.display = ""; moreEl.href = s.href; moreEl.textContent = (A.lang() === "pt" ? "Ver o projeto" : "See the project") + " →"; }
      else moreEl.style.display = "none";
      if (s.final) {
        var pt = A.lang() === "pt";
        ctaEl.innerHTML =
          '<a class="pill" href="mailto:matheus@marcondes.dev"><span class="pill-ico">@</span>' + (pt ? "Escrever" : "Email me") + "</a>" +
          '<a class="pill" href="cv/matheus-marcondes-cv-' + (pt ? "pt" : "en") + '.pdf" download><span class="pill-ico">↓</span>PDF</a>' +
          '<a class="pill" href="neurodynamics/" data-close><span class="pill-ico">→</span>' + (pt ? "Ver projetos" : "See the projects") + "</a>";
        bodyEl.innerHTML = '<a class="lnk" href="mailto:matheus@marcondes.dev">matheus@marcondes.dev</a>';
      } else ctaEl.innerHTML = "";
      ctaEl.style.display = s.final ? "" : "none";
    }, REDUCE ? 0 : 260);
    void U;
  }
  function go(i) {
    if (i < 0 || i >= steps.length) { if (i >= steps.length) setPlaying(false); return; }
    var prevYear = steps[step] ? steps[step].year : 2026;
    step = i;
    stepStart = performance.now() / 1000;
    rulerFrom = rulerX || prevYear; rulerTo = steps[i].year; rulerT = stepStart;
    retarget(false);
    show(i);
    prevBtn.disabled = i === 0; nextBtn.disabled = i === steps.length - 1;
  }
  function setPlaying(v) {
    playing = v;
    playBtn.textContent = v ? "❚❚" : "▶";
    playBtn.setAttribute("aria-label", v ? tr(DATA.ui.pause) : tr(DATA.ui.play));
    if (v) stepStart = performance.now() / 1000;
  }
  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(step + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(step - 1); }
    else if (e.key === " " && e.target.tagName !== "BUTTON" && e.target.tagName !== "A") { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(steps.length - 1); }
    else if (e.key === "Tab") {
      var f = [].slice.call(ov.querySelectorAll("button, a[href]")).filter(function (x) { return x.offsetParent !== null && !x.disabled; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  }

  /* ---------- open / close ---------- */
  function open() {
    if (opened) return;
    if (!ov) build();
    opened = true; lastFocus = document.activeElement;
    document.body.classList.add("tour-open");
    ov.style.display = "";
    size(); seed(); labels();
    rulerX = 2019; step = 0; setPlaying(!REDUCE);
    requestAnimationFrame(function () { ov.classList.add("is-on"); });
    go(0);
    closeBtn.focus();
    try { history.replaceState(null, "", "#tour"); } catch (e) {}
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function close() {
    if (!opened) return;
    opened = false;
    ov.classList.remove("is-on");
    document.body.classList.remove("tour-open");
    setTimeout(function () { if (!opened) ov.style.display = "none"; }, REDUCE ? 0 : 450);
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#tourBtn")) { e.preventDefault(); open(); }
    if (opened && e.target.closest && e.target.closest("[data-close]")) close();
  });
  if (location.hash === "#tour") open();
  window.addEventListener("hashchange", function () { if (location.hash === "#tour") open(); });
})();
