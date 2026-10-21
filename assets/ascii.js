/* marcondes.dev — ASCII engine
   A small cell-grid renderer on <canvas>, the background sharks, and the
   widgets pages declare with data-ascii="…" (timeline, charts, counters,
   scenes). No dependencies. Every widget still renders one finished frame
   under prefers-reduced-motion. */
(function () {
  "use strict";

  var root = document.documentElement;
  var MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace';
  var PAL = {
    ink: "#1b1a18", muted: "#b3b0aa", faint: "#d6d3cc", paper: "#f3f2ef",
    blue: "#2563eb", indigo: "#4f46e5", violet: "#7c3aed",
    lime: "#65a30d", limeHi: "#84cc16", limeInk: "#4d7c0f"
  };
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COARSE = window.matchMedia("(pointer: coarse)").matches;

  function C(c) { return PAL[c] || c || PAL.ink; }
  function lang() { return root.getAttribute("data-lang") === "pt" ? "pt" : "en"; }
  function tr(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) return v[lang()] != null ? v[lang()] : (v.en || "");
    return v == null ? "" : String(v);
  }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function ease(x) { x = clamp(x, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function easeOut(x) { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); }
  function hash(n) { var s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }

  /* ---------- the grid ---------- */
  function Grid(canvas) {
    this.cv = canvas;
    this.g = canvas.getContext("2d");
    this.cols = 0; this.rows = 0;
    this.dx = 0; this.dy = 0;               /* translation, used to crop scenes into thumbnails */
    this.font(13, 1.3);
  }
  Grid.prototype.font = function (fs, lh) {
    this.fs = fs; this.lh = lh || this.lh || 1.3;
    this.g.font = fs + "px " + MONO;
    this.cw = this.g.measureText("M").width || fs * 0.6;
    this.chh = Math.round(fs * this.lh * 100) / 100;
    this.aspect = this.chh / this.cw;            /* how tall a cell is, in cell widths */
  };
  Grid.prototype.size = function (w, h) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr; this.w = w; this.h = h;
    this.cv.width = Math.max(1, Math.round(w * dpr));
    this.cv.height = Math.max(1, Math.round(h * dpr));
    this.cv.style.width = w + "px"; this.cv.style.height = h + "px";
    this.cols = Math.max(1, Math.floor(w / this.cw));
    this.rows = Math.max(1, Math.floor(h / this.chh));
    this.ox = (w - this.cols * this.cw) / 2;
    this.oy = (h - this.rows * this.chh) / 2;
    this.n = this.cols * this.rows;
    this.ch = new Array(this.n);
    this.co = new Array(this.n);
    this.al = new Float32Array(this.n);
    this.clear();
  };
  Grid.prototype.clear = function () { for (var i = 0; i < this.n; i++) this.ch[i] = ""; };
  Grid.prototype.set = function (x, y, c, color, a) {
    x = Math.round(x + this.dx); y = Math.round(y + this.dy);
    if (!c || c === " " || x < 0 || y < 0 || x >= this.cols || y >= this.rows) return;
    var i = y * this.cols + x;
    this.ch[i] = c; this.co[i] = C(color); this.al[i] = a == null ? 1 : a;
  };
  Grid.prototype.erase = function (x, y) {
    x = Math.round(x + this.dx); y = Math.round(y + this.dy);
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return;
    this.ch[y * this.cols + x] = "";
  };
  Grid.prototype.get = function (x, y) {
    x = Math.round(x + this.dx); y = Math.round(y + this.dy);
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return "";
    return this.ch[y * this.cols + x];
  };
  Grid.prototype.text = function (x, y, s, color, a, opaque) {
    s = String(s);
    for (var i = 0; i < s.length; i++) {
      if (s[i] === " ") { if (opaque) this.erase(x + i, y); continue; }
      this.set(x + i, y, s[i], color, a);
    }
    return s.length;
  };
  /* right-aligned text ending at column x (exclusive) */
  Grid.prototype.rtext = function (x, y, s, color, a) { s = String(s); return this.text(x - s.length, y, s, color, a); };
  Grid.prototype.ctext = function (x, y, s, color, a) { s = String(s); return this.text(Math.round(x - s.length / 2), y, s, color, a); };
  /* multi-line art; spaces are transparent. colorAt(ch, col, row) may recolor cells */
  Grid.prototype.art = function (x, y, lines, color, a, colorAt) {
    for (var r = 0; r < lines.length; r++) {
      var L = lines[r];
      for (var c = 0; c < L.length; c++) {
        if (L[c] === " ") continue;
        var k = colorAt ? colorAt(L[c], c, r) : null;
        if (k === false) continue;
        this.set(x + c, y + r, L[c], k || color, a);
      }
    }
  };
  Grid.prototype.fill = function (x, y, w, h, c, color, a) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) this.set(x + i, y + j, c, color, a);
  };
  Grid.prototype.wipe = function (x, y, w, h) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) this.erase(x + i, y + j);
  };
  Grid.prototype.box = function (x, y, w, h, color, a, style) {
    var s = style === "ascii" ? "+-+|+-+" : style === "heavy" ? "┏━┓┃┗━┛" : style === "dash" ? "┌╌┐╎└╌┘" : "╭─╮│╰─╯";
    this.set(x, y, s[0], color, a); this.set(x + w - 1, y, s[2], color, a);
    this.set(x, y + h - 1, s[4], color, a); this.set(x + w - 1, y + h - 1, s[6], color, a);
    for (var i = 1; i < w - 1; i++) { this.set(x + i, y, s[1], color, a); this.set(x + i, y + h - 1, s[5], color, a); }
    for (var j = 1; j < h - 1; j++) { this.set(x, y + j, s[3], color, a); this.set(x + w - 1, y + j, s[3], color, a); }
  };
  /* lines in the classic hand-made style: _.-' for shallow runs, _/ and \_
     staircases for diagonals, | for steep ones. A glyph forces plain stepping. */
  Grid.prototype.line = function (x0, y0, x1, y1, color, a, glyph) {
    var dx = x1 - x0, dy = y1 - y0, i, n;
    if (glyph) {
      n = Math.max(Math.abs(dx), Math.abs(dy), 1);
      for (i = 0; i <= n; i++) this.set(x0 + dx * i / n, y0 + dy * i / n, glyph, color, a);
      return;
    }
    if (dx < 0) { var tx = x0, ty = y0; x0 = x1; y0 = y1; x1 = tx; y1 = ty; dx = -dx; dy = -dy; }
    var ang = Math.atan2(-dy * this.aspect, dx) * 180 / Math.PI;   /* -90..90, up is positive */
    var abs = Math.abs(ang), x, y, r;
    if (abs < 24) {
      for (x = Math.round(x0); x <= Math.round(x1); x++) {
        y = dx ? y0 + dy * clamp((x - x0) / dx, 0, 1) : y0;
        var yy = y + 0.5; r = Math.floor(yy); var f = yy - r;
        this.set(x, r, f < 0.3 ? "'" : f < 0.6 ? "-" : f < 0.82 ? "." : "_", color, a);
      }
      return;
    }
    var ra = Math.round(y0), rb = Math.round(y1), step = rb >= ra ? 1 : -1, prev = null;
    for (r = ra; r !== rb + step; r += step) {
      x = dy ? x0 + dx * clamp((r - y0) / dy, 0, 1) : x0;
      var cx = Math.round(x);
      if (abs > 70) {
        this.set(cx, r, prev != null && cx !== prev ? (ang > 0 ? "/" : "\\") : "|", color, a);
      } else if (ang > 0) {            /* rising: _/ */
        this.set(cx, r, "/", color, a);
        if (prev != null) for (var k = prev + 1; k < cx; k++) this.set(k, r, "_", color, a);
      } else {                         /* falling: \_ */
        if (prev != null) for (var k2 = prev + 1; k2 < cx; k2++) this.set(k2, r - step, "_", color, a);
        this.set(cx, r, "\\", color, a);
      }
      prev = cx;
    }
  };
  /* ellipse that looks round on screen: rx in columns, ry follows the cell aspect */
  Grid.prototype.circle = function (cx, cy, rx, color, a, glyph, from, to) {
    var ry = rx / this.aspect;
    from = from == null ? 0 : from; to = to == null ? Math.PI * 2 : to;
    if (glyph || rx < 3) {
      var n = Math.max(12, Math.round(rx * 7));
      for (var i = 0; i <= n; i++) {
        var t = from + (to - from) * i / n;
        this.set(cx + Math.cos(t) * rx, cy + Math.sin(t) * ry, glyph || "o", color, a);
      }
      return;
    }
    var segs = Math.max(10, Math.round(rx * 1.6)), px = null, py = null;
    for (var j = 0; j <= segs; j++) {
      var u = from + (to - from) * j / segs, x = cx + Math.cos(u) * rx, y = cy + Math.sin(u) * ry;
      if (px != null) this.line(px, py, x, y, color, a);
      px = x; py = y;
    }
  };
  /* a plotted series: one glyph per column, chosen by where the value falls in
     the cell (_ . - '), with | to bridge jumps of more than a row */
  Grid.prototype.plot = function (x0, ys, color, a) {
    var prev = null;
    for (var i = 0; i < ys.length; i++) {
      if (ys[i] == null) { prev = null; continue; }
      var yy = ys[i] + 0.5, r = Math.floor(yy), f = yy - r, x = x0 + i;
      if (prev != null && Math.abs(r - prev) > 1) {
        var s = r > prev ? 1 : -1;
        for (var k = prev + s; k !== r; k += s) this.set(r > prev ? x : x - 1, k, "|", color, a);
      }
      this.set(x, r, f < 0.3 ? "'" : f < 0.6 ? "-" : f < 0.82 ? "." : "_", color, a);
      prev = r;
    }
  };
  Grid.prototype.draw = function () {
    var g = this.g, cols = this.cols;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    g.clearRect(0, 0, this.w, this.h);
    g.font = this.fs + "px " + MONO;
    g.textAlign = "center"; g.textBaseline = "middle";
    var buckets = {}, keys = [];
    for (var i = 0; i < this.n; i++) {
      if (!this.ch[i]) continue;
      var k = this.co[i] + "|" + (Math.round(this.al[i] * 20) / 20);
      if (!buckets[k]) { buckets[k] = []; keys.push(k); }
      buckets[k].push(i);
    }
    for (var b = 0; b < keys.length; b++) {
      var parts = keys[b].split("|"), idx = buckets[keys[b]];
      g.fillStyle = parts[0]; g.globalAlpha = +parts[1];
      for (var j = 0; j < idx.length; j++) {
        var q = idx[j], x = q % cols, y = (q / cols) | 0;
        g.fillText(this.ch[q], this.ox + (x + 0.5) * this.cw, this.oy + (y + 0.5) * this.chh);
      }
    }
    g.globalAlpha = 1;
  };
  /* which cell is under a client point */
  Grid.prototype.cellAt = function (clientX, clientY) {
    var r = this.cv.getBoundingClientRect();
    return { x: Math.floor((clientX - r.left - this.ox) / this.cw), y: Math.floor((clientY - r.top - this.oy) / this.chh) };
  };

  /* ---------- widget registry, layout and the shared loop ---------- */
  var REG = {}, live = new Set(), raf = 0, all = [];
  function loop(now) {
    raf = 0;
    live.forEach(function (w) {
      if (w.t0 == null) w.t0 = now;
      if (now - (w.last || 0) >= (w.interval || 33)) { w.last = now; paint(w, (now - w.t0) / 1000); }
    });
    if (live.size) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf && live.size && !REDUCE) raf = requestAnimationFrame(loop); }
  function paint(w, t) { w.G.clear(); w.frame(t); w.G.draw(); }
  function still(w) { paint(w, w.still != null ? w.still : 60); }

  function layout(w) {
    var el = w.el, G = w.G, cs = getComputedStyle(el);
    var padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    var padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    var width = el.clientWidth - padX;
    if (width <= 0) return;
    if (w.vcols) {
      /* scenes: a fixed virtual grid scaled to the box width */
      G.font(100, w.lh || 1.18);
      var k = G.cw / 100;
      var fs = clamp(width / (w.vcols * k), w.minFs || 5, w.maxFs || 15);
      G.font(Math.floor(fs * 10) / 10, w.lh || 1.18);
      G.size(width, Math.ceil(w.vrows * G.chh));
    } else {
      G.font(w.fs || (width < 520 ? 11 : 12.5), w.lh || 1.3);
      var cols = Math.floor(width / G.cw);
      G.size(width, Math.ceil(w.rows(cols) * G.chh));
    }
    el.style.height = (G.h + padY) + "px";
    if (w.resize) w.resize();
    if (REDUCE || !live.has(w)) still(w);
  }
  var ro = "ResizeObserver" in window ? new ResizeObserver(function (es) {
    es.forEach(function (e) {
      var w = e.target.__w; if (!w) return;
      var cw = Math.round(e.contentRect.width);
      if (cw !== w.lastW) { w.lastW = cw; layout(w); }
    });
  }) : null;
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var w = e.target.__w; if (!w) return;
      if (e.isIntersecting && !REDUCE) live.add(w); else live.delete(w);
    });
    kick();
  }, { rootMargin: "60px" }) : null;

  function mount(el) {
    if (el.__w) return el.__w;
    var f = REG[el.getAttribute("data-ascii")];
    if (!f) return null;
    var cfg = {};
    try { cfg = JSON.parse(el.getAttribute("data-cfg") || "{}"); } catch (e) { cfg = {}; }
    var cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    el.insertBefore(cv, el.firstChild);
    var G = new Grid(cv);
    var w = f(G, cfg, el) || {};
    w.G = G; w.el = el; w.cfg = cfg;
    el.__w = w; all.push(w);
    w.lastW = el.clientWidth;
    layout(w);
    if (ro) ro.observe(el);
    if (io) io.observe(el); else { live.add(w); kick(); }
    return w;
  }
  function mountAll(scope) {
    [].forEach.call((scope || document).querySelectorAll("[data-ascii]"), mount);
  }
  /* labels follow the language toggle */
  document.addEventListener("langchange", function () {
    all.forEach(function (w) { if (w.relang) w.relang(); layout(w); });
  });

  /* ---------- background sharks ---------- */
  var MIRROR = { "/": "\\", "\\": "/", "(": ")", ")": "(", "<": ">", ">": "<", "{": "}", "}": "{", "[": "]", "]": "[", "`": "'", "'": "`" };
  function mirror(lines) {
    var w = 0; lines.forEach(function (l) { w = Math.max(w, l.length); });
    return lines.map(function (l) {
      var p = l; while (p.length < w) p += " ";
      return p.split("").reverse().map(function (c) { return MIRROR[c] || c; }).join("");
    });
  }
  var SPRITES = {
    big: [[
      "         _/|",
      "\\`.____.-'  `'--._",
      " >  )))       o   `>",
      "/.'`--.____.-''''`",
      "          `\\"
    ], [
      "         _/|",
      "/`.____.-'  `'--._",
      " >  )))       o   `>",
      "\\.'`--.____.-''''`",
      "          `\\"
    ]],
    small: [[
      "    _/|",
      "\\.-'  `-._",
      " > ))   o `>",
      "/'`-.__.-'"
    ], [
      "    _/|",
      "/.-'  `-._",
      " > ))   o `>",
      "\\'`-.__.-'"
    ]]
  };
  Object.keys(SPRITES).forEach(function (k) {
    SPRITES[k] = { r: SPRITES[k], l: SPRITES[k].map(mirror) };
  });

  var Sea = (function () {
    var cv, g, W = 0, H = 0, dpr = 1, cw = 7.8, lh = 15, fs = 12.5;
    var sharks = [], bubbles = [], rings = [];
    var mouse = { x: -1, y: -1, t: -1e9 }, focusEl = null, focusT = 0, lastRing = 0, T = 0, prev = 0, raf2 = 0;
    var tint = "indigo";

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.font = fs + "px " + MONO;
      cw = g.measureText("M").width; lh = Math.round(fs * 1.2);
    }
    function spawn() {
      var n = clamp(Math.round(W * H / 210000), 3, COARSE ? 4 : 7);
      var colors = ["indigo", "blue", "violet", "indigo", "blue", "violet", "lime"];
      sharks = [];
      for (var i = 0; i < n; i++) {
        var big = i % 3 !== 2;
        sharks.push({
          x: hash(i + 1) * W, y: 80 + hash(i + 7) * (H - 160),
          vx: (hash(i + 3) - 0.5) * 1.2, vy: 0, dir: hash(i + 5) > 0.5 ? 1 : -1, flip: 0,
          kind: big ? "big" : "small", depth: big ? 1 : 0.72,
          color: colors[i % colors.length], spin: i % 2 ? 1 : -1,
          orbit: (i / n) * Math.PI * 2, rad: 90 + (i % 3) * 55, lane: i % 3,
          wx: hash(i + 11) * W, wy: hash(i + 13) * H, wt: 0, tail: hash(i) * 6, glow: 0
        });
      }
    }
    function steer(s, dt) {
      var tx, ty, max, force, now = T;
      var mouseOn = now - mouse.t < 5;
      if (focusEl) {
        var r = focusEl.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var a = s.orbit + now * 1.1 * s.spin;
        tx = cx + Math.cos(a) * (r.width / 2 + 70 + s.lane * 34);
        ty = cy + Math.sin(a) * (r.height / 2 + 30 + s.lane * 16);
        max = 4.4 * s.depth; force = 0.2;
      } else if (mouseOn) {
        var b = s.orbit + now * 0.45 * s.spin;
        tx = mouse.x + Math.cos(b) * s.rad;
        ty = mouse.y + Math.sin(b) * s.rad * 0.5;
        max = 2.7 * s.depth; force = 0.075;
      } else {
        s.wt -= dt / 60;
        if (s.wt <= 0 || Math.abs(s.wx - s.x) + Math.abs(s.wy - s.y) < 90) {
          s.wx = 60 + Math.random() * (W - 120); s.wy = 60 + Math.random() * (H - 120); s.wt = 6 + Math.random() * 8;
        }
        tx = s.wx; ty = s.wy; max = 0.95 * s.depth; force = 0.03;
      }
      var dx = tx - s.x, dy = ty - s.y, d = Math.hypot(dx, dy) || 1;
      var sp = max * Math.min(1, d / 140);
      var ax = dx / d * sp - s.vx, ay = dy / d * sp - s.vy;
      var am = Math.hypot(ax, ay); if (am > force) { ax = ax / am * force; ay = ay / am * force; }
      /* keep a little room between sharks */
      for (var j = 0; j < sharks.length; j++) {
        var o = sharks[j]; if (o === s) continue;
        var ex = (s.x - o.x) / 170, ey = (s.y - o.y) / 58, e2 = ex * ex + ey * ey;
        if (e2 < 1 && e2 > 0) { ax += ex / Math.sqrt(e2) * 0.05; ay += ey / Math.sqrt(e2) * 0.05; }
      }
      s.vx += ax * dt; s.vy += ay * dt;
      var v = Math.hypot(s.vx, s.vy); if (v > max) { s.vx = s.vx / v * max; s.vy = s.vy / v * max; }
      s.x += s.vx * dt; s.y += s.vy * dt;
      /* turn around only when clearly swimming the other way */
      if ((s.vx > 0.3 && s.dir < 0) || (s.vx < -0.3 && s.dir > 0)) { s.flip += dt / 60; if (s.flip > 0.14) { s.dir = -s.dir; s.flip = 0; } } else s.flip = 0;
      s.tail += dt / 60 * (2 + v * 2.2);
      s.glow += ((focusEl ? 1 : 0) - s.glow) * 0.06 * dt;
      if (Math.random() < 0.006 * dt * (0.4 + v)) {
        bubbles.push({ x: s.x + s.dir * 40 * s.depth, y: s.y - 6, life: 0, w: Math.random() * 6, a: s.depth });
      }
    }
    function drawShark(s) {
      var spr = SPRITES[s.kind][s.dir > 0 ? "r" : "l"][Math.floor(s.tail) % 2];
      var wpx = spr[1].length * cw, hpx = spr.length * lh;
      var base = s.kind === "big" ? 0.2 : 0.13;
      g.globalAlpha = base + s.glow * 0.3;
      g.fillStyle = C(s.glow > 0.5 ? (s.lane === 0 ? "violet" : s.lane === 1 ? "indigo" : "lime") : s.color);
      for (var r = 0; r < spr.length; r++) g.fillText(spr[r], s.x - wpx / 2, s.y - hpx / 2 + r * lh);
    }
    function tick(now) {
      raf2 = 0;
      var dt = prev ? clamp((now - prev) / 16.67, 0.2, 3) : 1; prev = now; T = now / 1000;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      g.font = fs + "px " + MONO; g.textBaseline = "top"; g.textAlign = "left";
      /* rings around whatever the sharks are circling: "this is clickable" */
      if (focusEl && T - lastRing > 0.85) { lastRing = T; rings.push({ el: focusEl, t: 0 }); }
      for (var i = rings.length - 1; i >= 0; i--) {
        var R = rings[i]; R.t += dt / 60;
        if (R.t > 1.7) { rings.splice(i, 1); continue; }
        var rr = R.el.getBoundingClientRect(), p = easeOut(R.t / 1.7);
        var rx = rr.width / 2 + 14 + p * 90, ry = rr.height / 2 + 8 + p * 46;
        var n = Math.round((rx + ry) / 7);
        g.fillStyle = C("lime"); g.globalAlpha = (1 - p) * 0.55;
        for (var k = 0; k < n; k++) {
          var a = k / n * Math.PI * 2 + R.t * 0.4;
          g.fillText(k % 2 ? "·" : "°", rr.left + rr.width / 2 + Math.cos(a) * rx - 3, rr.top + rr.height / 2 + Math.sin(a) * ry - 7);
        }
      }
      for (var b = bubbles.length - 1; b >= 0; b--) {
        var B = bubbles[b]; B.life += dt / 60; B.y -= 0.45 * dt; B.x += Math.sin(B.life * 3 + B.w) * 0.25 * dt;
        if (B.life > 2.6) { bubbles.splice(b, 1); continue; }
        g.globalAlpha = (1 - B.life / 2.6) * 0.3 * B.a; g.fillStyle = C("blue");
        g.fillText(B.life < 0.9 ? "o" : B.life < 1.8 ? "°" : ".", B.x, B.y);
      }
      sharks.forEach(function (s) { steer(s, dt); });
      sharks.slice().sort(function (a, b) { return a.depth - b.depth; }).forEach(drawShark);
      g.globalAlpha = 1;
      raf2 = requestAnimationFrame(tick);
    }
    function stillFrame() {
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.font = fs + "px " + MONO; g.textBaseline = "top";
      sharks.forEach(function (s, i) { s.x = W * (0.18 + 0.32 * i) % W; s.y = H * (0.25 + 0.27 * i) % H; drawShark(s); });
    }
    function init() {
      if (document.body.hasAttribute("data-nosea")) return;
      cv = document.createElement("canvas");
      cv.className = "sea"; cv.setAttribute("aria-hidden", "true");
      document.body.insertBefore(cv, document.body.firstChild);
      g = cv.getContext("2d");
      resize(); spawn();
      var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { resize(); if (REDUCE) stillFrame(); }, 120); });
      if (REDUCE) { stillFrame(); return; }
      window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = T; }, { passive: true });
      window.addEventListener("pointerdown", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = T; }, { passive: true });
      document.addEventListener("visibilitychange", function () { prev = 0; });
      raf2 = requestAnimationFrame(tick);
    }
    /* anything with data-shark gets circled while hovered or focused */
    function wire(scope) {
      [].forEach.call((scope || document).querySelectorAll("[data-shark]"), function (el) {
        if (el.__shark) return; el.__shark = 1;
        el.addEventListener("pointerenter", function () { focus(el); });
        el.addEventListener("pointerleave", function () { if (focusEl === el) focus(null); });
        el.addEventListener("focusin", function () { focus(el); });
        el.addEventListener("focusout", function () { if (focusEl === el) focus(null); });
      });
    }
    function focus(el) {
      focusEl = el; lastRing = -1;
      if (!el) rings.length = 0;
    }
    return { init: init, wire: wire, focus: focus, set tint(v) { tint = v; } };
  })();

  /* ---------- helpers shared by widgets ---------- */
  function months(a, b) {  /* "2024-11" → "2025-05" inclusive count */
    var A = a.split("-").map(Number), B = b.split("-").map(Number);
    return (B[0] - A[0]) * 12 + (B[1] - A[1]) + 1;
  }
  function addMonths(a, n) {
    var A = a.split("-").map(Number), m = A[0] * 12 + (A[1] - 1) + n;
    return Math.floor(m / 12) + "-" + String(m % 12 + 1).padStart(2, "0");
  }
  function duration(n) {
    var y = Math.floor(n / 12), m = n % 12, pt = lang() === "pt";
    if (!y) return n + (pt ? (n === 1 ? " mês" : " meses") : " mo");
    return y + (pt ? "a" : "y") + (m ? " " + m + "m" : "");
  }
  var MON = { en: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], pt: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"] };
  var RAMP = "░▒▓█▓▒░";
  function fmt(v, d) {
    var s = Number(v).toFixed(d || 0);
    var parts = s.split("."), sep = lang() === "pt" ? "." : ",", dec = lang() === "pt" ? "," : ".";
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return parts.join(dec);
  }

  /* ---------- timeline: an ASCII gantt of how long each project ran ---------- */
  REG.timeline = function (G, cfg, el) {
    var rows = cfg.rows || [], hover = -1, now = cfg.now, from = cfg.from, to = cfg.to || cfg.now;
    var span = months(from, to);
    var L = { lw: 0, x0: 0, bw: 0 };
    function resize() {
      var longest = 0; rows.forEach(function (r) { longest = Math.max(longest, tr(r.label).length); });
      L.lw = Math.min(longest + 2, Math.max(10, Math.floor(G.cols * 0.3)));
      L.x0 = L.lw + 1; L.bw = Math.max(10, G.cols - L.x0 - 9);
    }
    function xAt(m) { return L.x0 + Math.round(m / span * L.bw); }
    function rowY(i) { return 4 + i * 2; }
    function frame(t) {
      var nowM = months(from, now) - 1;
      /* years and months along the top */
      var every = L.bw / span < 2.2 ? 3 : 1;
      for (var m = 0; m < span; m++) {
        var ym = addMonths(from, m), mm = +ym.split("-")[1], x = xAt(m);
        if (mm === 1 || m === 0) G.text(x, 0, ym.split("-")[0], "muted");
        if ((mm - 1) % every === 0) G.set(x, 1, MON[lang()][mm - 1], mm === 1 ? "ink" : "muted", mm === 1 ? 0.8 : 0.6);
        G.set(x, 2, mm === 1 ? "┼" : (mm - 1) % every === 0 ? "┬" : "┴", "muted", (mm - 1) % every === 0 ? 0.7 : 0.35);
      }
      for (var x2 = L.x0; x2 <= L.x0 + L.bw; x2++) if (!G.get(x2, 2)) G.set(x2, 2, "─", "muted", 0.5);
      /* the "now" line, pulsing */
      if (cfg.showNow !== false) {
        var nx = xAt(nowM + 0.5), pulse = 0.55 + 0.45 * Math.sin(t * 3.2);
        for (var y = 3; y < rowY(rows.length); y++) if (y % 2) G.set(nx, y, "┊", "lime", 0.35 + 0.3 * pulse);
        G.set(nx, 2, "▼", "lime", 0.6 + 0.4 * pulse);
      }
      rows.forEach(function (r, i) {
        var y = rowY(i), a = months(from, r.from) - 1, b = months(from, r.to || now) - 1;
        var xs = xAt(a), xe = Math.max(xs + 1, xAt(b + 1) - 1);
        var dim = hover >= 0 && hover !== i;
        var p = REDUCE ? 1 : easeOut((t - 0.25 - i * 0.16) / 1.1);
        var xr = xs + Math.round((xe - xs) * p);
        var color = r.color || "indigo", alpha = dim ? 0.25 : 1;
        G.rtext(L.lw, y, tr(r.label).slice(0, L.lw - 1), dim ? "muted" : "ink", dim ? 0.7 : 1);
        for (var x = xs; x <= xr; x++) {
          var k = Math.floor(((x - xs) * 0.55 - t * 7 + i * 3) % RAMP.length + RAMP.length) % RAMP.length;
          var ch = x === xr && p < 1 ? "▌" : RAMP[k];
          G.set(x, y, ch, color, alpha * (hover === i ? 1 : 0.88));
        }
        if (p >= 1) {
          var ongoing = !r.to;
          if (ongoing) G.set(xe + 1, y, Math.sin(t * 6) > 0 ? "▶" : "▷", color, alpha);
          G.text(xe + (ongoing ? 3 : 2), y, duration(months(r.from, r.to || now)), dim ? "muted" : color, dim ? 0.6 : 0.95);
          G.set(xs, y + 1, "╵", color, alpha * 0.35);
        }
      });
      /* a little shark patrols the baseline */
      var by = rowY(rows.length), W2 = L.bw + 10, sx = L.x0 + ((t * 5) % W2) - 6;
      var spr = SPRITES.small.r[Math.floor(t * 3) % 2];
      if (!REDUCE) G.art(Math.round(sx), by - 1, spr.slice(1, 3), "blue", 0.28);
      for (var x3 = L.x0; x3 <= L.x0 + L.bw; x3++) if (!G.get(x3, by + 1)) G.set(x3, by + 1, (x3 + Math.floor(t * 2)) % 6 === 0 ? "~" : "·", "muted", 0.35);
    }
    function pick(e) {
      var c = G.cellAt(e.clientX, e.clientY), idx = -1;
      rows.forEach(function (r, i) { if (Math.abs(c.y - rowY(i)) <= 0 && c.x >= 0) idx = i; });
      return idx;
    }
    function setHover(i, fromCard) {
      if (i === hover) return;
      hover = i;
      G.cv.style.cursor = i >= 0 && rows[i].href ? "pointer" : "";
      if (!fromCard) document.dispatchEvent(new CustomEvent("timeline:hover", { detail: i >= 0 ? rows[i].id : null }));
      if (REDUCE) still(el.__w);
    }
    G.cv.addEventListener("pointermove", function (e) { setHover(pick(e)); });
    G.cv.addEventListener("pointerleave", function () { setHover(-1); });
    G.cv.addEventListener("click", function (e) { var i = pick(e); if (i >= 0 && rows[i].href) location.href = rows[i].href; });
    document.addEventListener("card:hover", function (e) {
      var id = e.detail, i = -1; rows.forEach(function (r, k) { if (r.id === id) i = k; });
      setHover(i, true);
    });
    return { frame: frame, resize: resize, rows: function () { return 4 + rows.length * 2 + 2; }, interval: 50, still: 30 };
  };

  /* ---------- horizontal bars ---------- */
  REG.bars = function (G, cfg) {
    var items = cfg.items || [], max = cfg.max || Math.max.apply(null, items.map(function (i) { return i.value; }));
    var lw = 0;
    return {
      rows: function () { return items.length * 2; },
      resize: function () { lw = 0; items.forEach(function (it) { lw = Math.max(lw, tr(it.label).length); }); lw = Math.min(lw + 1, Math.floor(G.cols * 0.42)); },
      frame: function (t) {
        var bw = G.cols - lw - 2 - 10;
        items.forEach(function (it, i) {
          var y = i * 2, p = REDUCE ? 1 : easeOut((t - 0.2 - i * 0.12) / 1.2);
          var len = Math.max(1, Math.round(it.value / max * bw * p));
          G.rtext(lw, y, tr(it.label).slice(0, lw), "ink", 0.85);
          var color = it.color || cfg.color || "indigo";
          for (var x = 0; x < len; x++) {
            var head = len - x;
            G.set(lw + 1 + x, y, head === 1 ? "▓" : head === 2 && p < 1 ? "▒" : "█", color, 0.9);
          }
          if (p > 0.98 && !REDUCE) {
            var sh = Math.floor((t * 10 + i * 4) % (len + 12));
            if (sh < len) G.set(lw + 1 + sh, y, "▓", color, 0.6);
          }
          var v = (cfg.prefix || "") + fmt(it.value * (REDUCE ? 1 : Math.min(1, p * 1.02)), cfg.decimals || it.decimals) + (tr(it.unit || cfg.unit) || "");
          G.text(lw + 2 + len, y, v, color === "lime" ? "limeInk" : color, 1);
          if (it.note) G.text(lw + 1, y + 1, tr(it.note), "muted", 0.9);
        });
      }, still: 10
    };
  };

  /* ---------- vertical columns (e.g. commits per month) ---------- */
  var EIGHTHS = " ▁▂▃▄▅▆▇█";
  REG.columns = function (G, cfg) {
    var items = cfg.items || [], H = cfg.height || 9;
    var max = cfg.max || Math.max.apply(null, items.map(function (i) { return i.value; }));
    return {
      rows: function () { return H + 4; },
      frame: function (t) {
        G.dy = 1;
        var n = items.length, slot = Math.max(3, Math.floor((G.cols - 2) / n)), bw = Math.max(1, Math.min(slot - 2, 6));
        var x0 = Math.floor((G.cols - slot * n) / 2);
        for (var x = x0; x < x0 + slot * n; x++) G.set(x, H, "─", "muted", 0.6);
        items.forEach(function (it, i) {
          var p = REDUCE ? 1 : easeOut((t - 0.2 - i * 0.08) / 1.1), h = it.value / max * H * p;
          var full = Math.floor(h), frac = Math.round((h - full) * 8), xs = x0 + i * slot + Math.floor((slot - bw) / 2);
          var color = it.color || cfg.color || "indigo";
          for (var y = 0; y < full; y++) for (var k = 0; k < bw; k++) G.set(xs + k, H - 1 - y, "█", color, 0.9);
          if (frac > 0 && full < H) for (var k2 = 0; k2 < bw; k2++) G.set(xs + k2, H - 1 - full, EIGHTHS[frac], color, 0.9);
          var v = fmt(it.value * Math.min(1, p * 1.02), cfg.decimals);
          G.ctext(xs + bw / 2, H - 2 - full, v, color === "lime" ? "limeInk" : color, p > 0.05 ? 1 : 0);
          G.ctext(xs + bw / 2, H + 1, tr(it.label).slice(0, slot), "muted", 1);
        });
        G.dy = 0;
      }, still: 10
    };
  };

  /* ---------- line chart, drawn left to right by a scanning cursor ---------- */
  REG.lines = function (G, cfg) {
    var H = cfg.height || 12, series = cfg.series || [];
    var xmin = cfg.x ? cfg.x.min : 0, xmax = cfg.x ? cfg.x.max : 1, ymin = cfg.y.min, ymax = cfg.y.max;
    return {
      rows: function () { return H + 4; },
      frame: function (t) {
        var lx = 7, w = G.cols - lx - 2;
        /* axes */
        for (var y = 0; y < H; y++) G.set(lx, y, "│", "muted", 0.6);
        G.set(lx, H, "└", "muted", 0.6);
        for (var x = 1; x <= w; x++) G.set(lx + x, H, x % 10 === 0 ? "┴" : "─", "muted", 0.6);
        (cfg.y.ticks || [ymin, ymax]).forEach(function (v) {
          var yy = Math.round((1 - (v - ymin) / (ymax - ymin)) * (H - 1));
          G.rtext(lx - 1, yy, String(v) + (cfg.y.unit || ""), "muted", 0.9);
          for (var x = 1; x <= w; x += 2) if (!G.get(lx + x, yy)) G.set(lx + x, yy, "·", "muted", 0.4);
        });
        (cfg.x.ticks || []).forEach(function (v) {
          var xx = lx + 1 + Math.round((v.at - xmin) / (xmax - xmin) * (w - 1));
          G.ctext(xx, H + 1, tr(v.label), "muted", 0.9);
        });
        var p = REDUCE ? 1 : clamp((t - 0.2) / 2.2, 0, 1);
        var reveal = lx + 1 + Math.round(p * (w - 1));
        series.forEach(function (s, si) {
          var pts = s.points, ys = [];
          for (var c = 0; c < w; c++) {
            var xv = xmin + (xmax - xmin) * c / (w - 1), X = lx + 1 + c;
            if (X > reveal) break;
            var j = 0; while (j < pts.length - 2 && pts[j + 1][0] < xv) j++;
            var a0 = pts[j], a1 = pts[Math.min(j + 1, pts.length - 1)];
            var f = a1[0] === a0[0] ? 0 : clamp((xv - a0[0]) / (a1[0] - a0[0]), 0, 1);
            var v = a0[1] + (a1[1] - a0[1]) * f;
            ys.push((1 - (v - ymin) / (ymax - ymin)) * (H - 1));
          }
          G.plot(lx + 1, ys, s.color, s.dash ? 0.55 : 0.95);
          if (s.marks) pts.forEach(function (pt) {
            var X2 = lx + 1 + Math.round((pt[0] - xmin) / (xmax - xmin) * (w - 1));
            var Y2 = Math.round((1 - (pt[1] - ymin) / (ymax - ymin)) * (H - 1));
            if (X2 <= reveal) G.set(X2, Y2, "●", s.color, 1);
          });
          if (s.label) {
            var lbl = "▬ " + tr(s.label), off = 0;
            for (var q = 0; q < si; q++) off += tr(series[q].label).length + 5;
            G.text(lx + 1 + off, H + 2, lbl, s.color, 0.95);
          }
        });
        if (p < 1) for (var yy2 = 0; yy2 < H; yy2++) G.set(reveal, yy2, "┊", "lime", 0.5);
        if (cfg.x.label) G.rtext(G.cols, H + 2, tr(cfg.x.label), "muted", 0.9);
      }, still: 10
    };
  };

  /* ---------- heatmap: cells settle in at random ---------- */
  REG.heatmap = function (G, cfg) {
    var R = cfg.rows || [], K = cfg.cols || [], V = cfg.values || [], ramp = cfg.ramp || " ·░▒▓█";
    var max = cfg.max || Math.max.apply(null, V.map(function (r) { return Math.max.apply(null, r); }));
    var lw = 0;
    return {
      rows: function () { return R.length + 3; },
      resize: function () { lw = 0; R.forEach(function (r) { lw = Math.max(lw, tr(r).length); }); lw = Math.min(lw + 1, 18); },
      frame: function (t) {
        var cw = Math.max(2, Math.min(6, Math.floor((G.cols - lw - 2) / K.length)));
        K.forEach(function (k, j) { G.text(lw + 1 + j * cw, 0, tr(k).slice(0, cw - 0), "muted", 0.9); });
        R.forEach(function (r, i) {
          G.rtext(lw, i + 1, tr(r).slice(0, lw), "ink", 0.85);
          K.forEach(function (_, j) {
            var v = (V[i] || [])[j] || 0, f = v / max;
            var p = REDUCE ? 1 : clamp((t - 0.2 - hash(i * 31 + j) * 1.2) / 0.5, 0, 1);
            var lvl = Math.round(f * (ramp.length - 1) * p);
            var color = f > 0.75 ? (cfg.hot || "violet") : f > 0.45 ? (cfg.warm || "indigo") : (cfg.cool || "blue");
            for (var c = 0; c < cw - 1; c++) G.set(lw + 1 + j * cw + c, i + 1, ramp[lvl] || "·", color, 0.35 + 0.65 * f);
          });
        });
        var legend = (cfg.legend ? tr(cfg.legend) + "  " : "") + ramp.trim().split("").join(" ");
        G.text(lw + 1, R.length + 2, legend, "muted", 0.9);
      }, still: 10
    };
  };

  /* ---------- gauge: a needle settling on a value against a limit ---------- */
  REG.gauge = function (G, cfg) {
    return {
      rows: function () { return 3; },
      frame: function (t) {
        var w = G.cols - 2, max = cfg.max, v = cfg.value, lim = cfg.limit;
        var p = REDUCE ? 1 : easeOut((t - 0.2) / 1.4), cur = v * p;
        var n = Math.round(cur / max * w);
        G.set(0, 1, "[", "muted"); G.set(w + 1, 1, "]", "muted");
        for (var x = 0; x < w; x++) G.set(1 + x, 1, x < n ? "█" : "░", x < n ? (cfg.color || "indigo") : "muted", x < n ? 0.9 : 0.5);
        if (lim != null) { var lx = 1 + Math.round(lim / max * w); G.set(lx, 0, "▼", "lime"); G.set(lx, 2, "▲", "lime"); G.text(Math.min(lx + 2, G.cols - tr(cfg.limitLabel).length), 0, tr(cfg.limitLabel), "limeInk"); }
        G.text(1, 2, fmt(cur, cfg.decimals) + (cfg.unit || ""), cfg.color || "indigo");
      }, still: 10
    };
  };

  /* ---------- counters in a heavy box-drawing digit face ---------- */
  var DIG = {
    "0": ["┏━┓", "┃┃┃", "┗━┛"], "1": ["╺┓ ", " ┃ ", "╺┻╸"], "2": ["┏━┓", "┏━┛", "┗━╸"], "3": ["┏━┓", "╺━┫", "┗━┛"],
    "4": ["╻ ╻", "┗━┫", "  ╹"], "5": ["┏━╸", "┗━┓", "┗━┛"], "6": ["┏━┓", "┣━┓", "┗━┛"], "7": ["┏━┓", "  ┃", "  ╹"],
    "8": ["┏━┓", "┣━┫", "┗━┛"], "9": ["┏━┓", "┗━┫", "┗━┛"], " ": [" ", " ", " "]
  };
  REG.counter = function (G, cfg) {
    var w = { lh: 1.12, vcols: 0, vrows: 3 };
    /* thousands become a thin gap and the decimal mark a small square, so the
       big digits read the same in English and Portuguese */
    function digits(v) { return Number(v).toFixed(cfg.decimals || 0).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", "▪"); }
    DIG["▪"] = [" ", " ", "▪"];
    function render(v) {
      var s = digits(v);
      var pre = tr(cfg.prefix || ""), suf = tr(cfg.suffix || "");
      var x = 0;
      if (pre) { G.text(x, 1, pre, cfg.color === "lime" ? "limeInk" : cfg.color || "indigo"); x += pre.length + 1; }
      for (var i = 0; i < s.length; i++) {
        var d = DIG[s[i]] || [" ", " ", s[i]];
        G.art(x, 0, d, cfg.color || "indigo", 1);
        x += d[0].length + 1;
      }
      if (suf) G.text(x, 2, suf, cfg.color === "lime" ? "limeInk" : cfg.color || "indigo");
    }
    function widthOf() {
      var s = digits(cfg.value), n = 0;
      for (var i = 0; i < s.length; i++) n += (DIG[s[i]] || [" "])[0].length + 1;
      return n + (tr(cfg.prefix || "").length ? tr(cfg.prefix).length + 1 : 0) + tr(cfg.suffix || "").length + 1;
    }
    w.vcols = Math.max(8, widthOf());
    w.minFs = 9; w.maxFs = cfg.fs || 15;
    w.resize = function () { w.vcols = Math.max(8, widthOf()); };
    w.frame = function (t) {
      var p = REDUCE ? 1 : easeOut((t - 0.1) / 1.5);
      var v = cfg.value * p;
      if (!cfg.decimals) v = Math.round(v);
      render(v);
    };
    w.still = 10;
    return w;
  };

  /* ---------- tree (org chart / WBS), typed line by line ---------- */
  REG.tree = function (G, cfg) {
    var lines = cfg.lines || [];
    return {
      rows: function () { return lines.length; },
      frame: function (t) {
        var budget = REDUCE ? 1e9 : Math.max(0, (t - 0.2) * 90);
        lines.forEach(function (L, i) {
          var s = (L.pre || "") + tr(L.text), n = Math.min(s.length, Math.floor(budget));
          budget -= s.length;
          var pre = (L.pre || "").length;
          G.text(0, i, s.slice(0, Math.min(n, pre)), "muted", 0.8);
          if (n > pre) G.text(pre, i, s.slice(pre, n), L.color || "ink", L.color ? 1 : 0.9);
          if (L.note && n >= s.length) G.text(s.length + 2, i, tr(L.note), "muted", 0.9);
          if (n > 0 && n < s.length && !REDUCE) G.set(n, i, "▌", "lime");
        });
      }, still: 30
    };
  };

  /* ---------- status board: rows of state + progress, swept by a scanline ---------- */
  REG.board = function (G, cfg) {
    var items = cfg.items || [], lw = 0;
    return {
      rows: function () { return items.length + 2; },
      resize: function () { lw = 0; items.forEach(function (i) { lw = Math.max(lw, tr(i.label).length); }); lw += 1; },
      frame: function (t) {
        var sw = 14, bx = lw + sw + 2, bw = Math.max(6, G.cols - bx - 6);
        G.text(0, 0, tr(cfg.head || { en: "PROJECT", pt: "PROJETO" }), "muted", 0.9);
        G.text(lw + 1, 0, tr({ en: "STATUS", pt: "STATUS" }), "muted", 0.9);
        var scan = REDUCE ? -9 : Math.floor((t * 2.2) % (items.length + 4)) - 2;
        items.forEach(function (it, i) {
          var y = i + 1, on = scan === i;
          var p = REDUCE ? 1 : easeOut((t - 0.3 - i * 0.1) / 1.0);
          G.text(0, y, tr(it.label), on ? it.color || "indigo" : "ink", 0.95);
          var st = tr(it.status), blink = it.live && !REDUCE && Math.sin(t * 5 + i) > 0;
          G.text(lw + 1, y, (it.live ? (blink ? "● " : "○ ") : "· ") + st, it.color || "muted", it.live ? 1 : 0.8);
          var n = Math.round((it.progress || 0) * bw * p);
          for (var x = 0; x < bw; x++) G.set(bx + x, y, x < n ? "▰" : "▱", x < n ? it.color || "indigo" : "muted", x < n ? 0.9 : 0.4);
          if (on) for (var x2 = 0; x2 < G.cols; x2++) if (!G.get(x2, y)) G.set(x2, y, "·", "lime", 0.35);
        });
      }, interval: 60, still: 30
    };
  };

  /* ---------- funnel (e.g. PRISMA screening) ---------- */
  REG.funnel = function (G, cfg) {
    var items = cfg.items || [];
    return {
      rows: function () { return items.length * 2; },
      frame: function (t) {
        var max = items[0].value, lw = 0;
        items.forEach(function (i) { lw = Math.max(lw, tr(i.label).length); });
        var bw = G.cols - lw - 10;
        items.forEach(function (it, i) {
          var p = REDUCE ? 1 : easeOut((t - 0.2 - i * 0.35) / 0.9);
          var w = Math.max(1, Math.round(it.value / max * bw * p)), x0 = lw + 2 + Math.round((bw - w) / 2);
          G.rtext(lw, i * 2, tr(it.label), "ink", 0.85);
          for (var x = 0; x < w; x++) G.set(x0 + x, i * 2, "█", it.color || "indigo", 0.85);
          G.text(x0 + w + 1, i * 2, String(Math.round(it.value * Math.min(1, p))), it.color || "indigo");
          if (i < items.length - 1 && p >= 1) G.set(lw + 2 + Math.round(bw / 2), i * 2 + 1, "▼", "muted", 0.7);
        });
      }, still: 30
    };
  };

  /* ---------- risk matrix: severity × occurrence, before → after ---------- */
  REG.matrix = function (G, cfg) {
    var N = 5;
    return {
      rows: function () { return N * 2 + 4; },
      frame: function (t) {
        var phase = REDUCE ? 1 : clamp(((t - 1.5) % 7) / 1.2, 0, 1) * (((t - 1.5) % 7) < 5.5 ? 1 : 0);
        var cell = Math.max(4, Math.min(7, Math.floor((G.cols - 8) / N)));
        var ox = 6;
        for (var r = 0; r < N; r++) {
          G.rtext(ox - 1, r * 2 + 1, String(N - r), "muted");
          for (var c = 0; c < N; c++) {
            var sev = N - r, occ = c + 1, score = sev * occ;
            var zone = score >= 15 ? "violet" : score >= 8 ? "indigo" : "blue";
            G.text(ox + c * cell, r * 2 + 1, "░".repeat(cell - 1), zone, 0.25 + score / 25 * 0.4);
          }
        }
        for (var c2 = 0; c2 < N; c2++) G.ctext(ox + c2 * cell + (cell - 1) / 2, N * 2 + 1, String(c2 + 1), "muted");
        G.text(ox, N * 2 + 2, tr(cfg.xLabel || { en: "occurrence →", pt: "ocorrência →" }), "muted");
        G.text(0, 0, tr(cfg.yLabel || { en: "severity ↑", pt: "severidade ↑" }), "muted");
        (cfg.risks || []).forEach(function (rk, i) {
          var s = rk.s[0] + (rk.s[1] - rk.s[0]) * ease(phase), o = rk.o[0] + (rk.o[1] - rk.o[0]) * ease(phase);
          var x = ox + (o - 1) * cell + 1 + (i % 3), y = (N - s) * 2 + 1;
          G.set(x, Math.round(y), String.fromCharCode(65 + i), "ink", 1);
        });
        var lbl = phase > 0.5 ? cfg.after : cfg.before;
        G.text(ox + N * cell + 1, 1, tr(lbl || ""), phase > 0.5 ? "limeInk" : "violet");
      }, interval: 50, still: 30
    };
  };

  /* ---------- polar phase map: when each channel fires through a 360° turn ---------- */
  REG.polar = function (G, cfg) {
    var w = { vcols: 64, vrows: 22, lh: 1.18 };
    w.frame = function (t) {
      var cx = 20, cy = 10.5, R = 15, chans = cfg.channels || [];
      var theta = REDUCE ? 1.2 : (t * (Math.PI * 2) / (cfg.period || 3)) % (Math.PI * 2);
      G.circle(cx, cy, R + 1.6, "muted", 0.35, "·");
      chans.forEach(function (ch, i) {
        var r = R - i * 2.4, a0 = ch.from / 180 * Math.PI - Math.PI / 2, a1 = ch.to / 180 * Math.PI - Math.PI / 2;
        var active = angleIn(theta, a0 + Math.PI / 2, a1 + Math.PI / 2);
        G.circle(cx, cy, r, ch.color, active ? 1 : 0.4, active ? "█" : "▒", a0, a1);
        G.text(40, 3 + i * 3, (active ? "▶ " : "  ") + tr(ch.label), ch.color, active ? 1 : 0.65);
        G.text(42, 4 + i * 3, ch.from + "°–" + ch.to + "°", "muted", 0.9);
      });
      /* the crank */
      var ex = cx + Math.cos(theta - Math.PI / 2) * (R - 1), ey = cy + Math.sin(theta - Math.PI / 2) * (R - 1) / G.aspect;
      G.line(cx, cy, ex, ey, "ink", 0.9);
      G.set(ex, ey, "◉", "ink"); G.set(cx, cy, "◎", "ink");
      ["0°", "90°", "180°", "270°"].forEach(function (s, i) {
        var a = i * Math.PI / 2 - Math.PI / 2;
        G.ctext(cx + Math.cos(a) * (R + 3.5), cy + Math.sin(a) * (R + 3.5) / G.aspect, s, "muted", 0.9);
      });
    };
    function angleIn(th, a, b) { th = (th + Math.PI * 4) % (Math.PI * 2); a = (a + Math.PI * 4) % (Math.PI * 2); b = (b + Math.PI * 4) % (Math.PI * 2); return a <= b ? th >= a && th <= b : th >= a || th <= b; }
    w.still = 1.2;
    return w;
  };

  /* ---------- signal: a scrolling trace with an optional highlighted window ---------- */
  REG.signal = function (G, cfg) {
    var H = cfg.height || 8;
    var fn = SIGNALS[cfg.kind] || SIGNALS.eeg;
    return {
      rows: function () { return H + 2; },
      frame: function (t) {
        var w = G.cols, mid = (H - 1) / 2;
        var ys = [];
        for (var x = 0; x < w; x++) {
          var s = fn(t - (w - x) * (cfg.dt || 0.02), x);
          if (s.on) for (var yy = 0; yy < H; yy++) G.set(x, yy, "░", cfg.onColor || "lime", 0.3);
          ys.push(mid - s.v * mid);
        }
        G.plot(0, ys, cfg.color || "indigo", 0.95);
        for (var x2 = 0; x2 < w; x2++) G.set(x2, H, "─", "muted", 0.5);
        if (cfg.legend) G.text(0, H + 1, tr(cfg.legend), "muted");
        if (cfg.onLabel) G.rtext(w, H + 1, "░ " + tr(cfg.onLabel), cfg.onColor === "lime" || !cfg.onColor ? "limeInk" : cfg.onColor);
      }, still: 6
    };
  };
  var SIGNALS = {
    eeg: function (t) {
      var v = 0.35 * Math.sin(t * 2 * Math.PI * 1.3) + 0.25 * Math.sin(t * 2 * Math.PI * 9.7 + 1) + 0.18 * Math.sin(t * 2 * Math.PI * 21 + 2);
      var burst = ((t % 6) + 6) % 6 > 3.2 && ((t % 6) + 6) % 6 < 5.2;
      if (burst) v = v * 0.5 + 0.45 * Math.sin(t * 2 * Math.PI * 21);
      return { v: clamp(v + (hash(Math.floor(t * 50)) - 0.5) * 0.2, -1, 1), on: burst };
    },
    flow: function (t) {
      var P = 4.5, TI = 1.5, u = ((t % P) + P) % P;
      var v = u < TI ? Math.sin(Math.PI * u / TI) * 0.9 : -0.75 * Math.exp(-(u - TI) / 0.55) * Math.min(1, (u - TI) * 8);
      return { v: v, on: u > 0.25 && u < TI - 0.1 };
    }
  };

  /* ---------- scenes (registered by scenes.js) ---------- */
  var SCENES = {};
  REG.scene = function (G, cfg, el) {
    var S = SCENES[cfg.scene];
    if (!S) return { rows: function () { return 1; }, frame: function () {} };
    var thumb = cfg.mode === "thumb";
    var narrow = thumb && el.clientWidth < 440;
    var crop = thumb ? (narrow && S.tight) || S.thumb || null : null;
    crop = crop || { x: 0, y: 0, cols: S.cols, rows: S.rows };
    var w = { vcols: crop.cols, vrows: crop.rows, lh: 1.18, interval: S.interval || 40, maxFs: thumb ? 10 : 14, minFs: 3 };
    var tags = thumb ? [] : (S.tags || []);
    w.still = S.still != null ? S.still : 8;
    w.frame = function (t) {
      G.dx = -crop.x; G.dy = -crop.y;
      S.draw(G, t, { thumb: thumb, cfg: cfg, tr: tr });
      if (!thumb) drawTags(G, tags, t);
      G.dx = 0; G.dy = 0;
    };
    return w;
  };
  /* numbered tags typed one after another, with an elbow leader to the part */
  function drawTags(G, tags, t) {
    var budget = REDUCE ? 1e9 : Math.max(0, (t - 1.0) * 26);
    tags.forEach(function (tg, i) {
      var title = tr(tg.title).toUpperCase().replace(/Β/g, "β"), num = String(i + 1).padStart(2, "0");
      var s = num + " " + title, n = Math.min(s.length, Math.floor(budget));
      budget -= s.length + 14;
      if (n <= 0) return;
      var lx = tg.at[0], ly = tg.at[1], ax = tg.to[0], ay = tg.to[1];
      var right = tg.align === "right", x0 = right ? lx - s.length : lx;
      G.text(x0, ly, s.slice(0, 2), "limeInk"); G.text(x0 + 3, ly, s.slice(3, n), "ink", 0.95);
      if (n < s.length) return;
      /* leader: underline the label, then run to the anchor */
      var ux = right ? x0 + s.length : x0 - 1;
      var by = ly + (ay > ly ? 1 : -1);
      for (var x = x0; x < x0 + s.length; x++) G.set(x, by, "─", "muted", 0.5);
      /* the leader never writes over the drawing, only through empty cells */
      var ex = right ? x0 - 1 : x0 + s.length, steps = Math.max(Math.abs(ex - ax), Math.abs(by - ay), 1);
      for (var k = 1; k < steps; k++) {
        var lx2 = ax + (ex - ax) * k / steps, ly2 = ay + (by - ay) * k / steps;
        if (!G.get(lx2, ly2)) G.set(lx2, ly2, "·", "muted", 0.55);
      }
      G.set(ax, ay, "◆", "lime", 1);
      void ux;
    });
  }

  /* ---------- boot ---------- */
  /* boot after every deferred script (scenes.js registers into this file) has run */
  var booted = false;
  function boot() {
    if (booted) return; booted = true;
    Sea.init();
    Sea.wire();
    mountAll();
  }
  if (document.readyState === "complete") setTimeout(boot, 0);
  else { document.addEventListener("DOMContentLoaded", boot); window.addEventListener("load", boot); }

  window.ASCII = {
    PAL: PAL, MONO: MONO, REDUCE: REDUCE, Grid: Grid, SPRITES: SPRITES, mirror: mirror,
    tr: tr, lang: lang, clamp: clamp, ease: ease, easeOut: easeOut, hash: hash, fmt: fmt,
    register: function (name, f) { REG[name] = f; }, scene: function (name, s) { SCENES[name] = s; },
    mount: mount, mountAll: mountAll, sea: Sea, months: months
  };
})();
