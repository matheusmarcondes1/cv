/* marcondes.dev — project scenes
   Each scene draws one frame into a fixed 110×30 design grid; the engine
   scales it to the stage and crops it for gallery thumbnails. The four
   "how it works" scenes follow the NeuroDynamics animation prototypes
   (FES trike, Órion, Opalina) as ASCII: numbered tags, typed titles,
   elbow leaders, lime where a muscle is working. */
(function () {
  "use strict";
  var A = window.ASCII;
  if (!A) return;
  var tr = A.tr, clamp = A.clamp, hash = A.hash, ease = A.ease;

  /* ---------- drawing helpers ---------- */
  function seg(G, a, b, c, al, gl) { G.line(a[0], a[1], b[0], b[1], c, al, gl); }
  /* two-bone IK in screen-true units (rows scaled by the cell aspect) */
  function ik(G, hip, foot, L1, L2, side) {
    var k = G.aspect, hx = hip[0], hy = hip[1] * k, fx = foot[0], fy = foot[1] * k;
    var dx = fx - hx, dy = fy - hy, d = Math.min(Math.hypot(dx, dy) || 1, L1 + L2 - 0.01);
    var ux = dx / d, uy = dy / d, a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
    var px = -uy * side, py = ux * side;
    return [hx + ux * a + px * h, (hy + uy * a + py * h) / k];
  }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
  /* a polyline of dots with a bright pulse travelling along it */
  function wire(G, pts, color, al, phase, pulse) {
    var cells = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]), 1);
      for (var j = 0; j < n; j++) cells.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]);
    }
    cells.push(pts[pts.length - 1]);
    cells.forEach(function (p, i) { if (i % 2 === 0) G.set(p[0], p[1], "·", color, al); });
    if (phase != null) {
      var q = cells[Math.floor(((phase % 1) + 1) % 1 * cells.length)];
      if (q) G.set(q[0], q[1], "•", pulse || "lime", 1);
    }
    return cells;
  }
  var RIM = {
    big: { c: [9, 4], r: 7, art: [
      "      _.-----._",
      "   .-'         '-.",
      "  /               \\",
      " |                 |",
      " |                 |",
      " |                 |",
      "  \\               /",
      "   '-._       _.-'",
      "       '-----'"] },
    small: { c: [7, 3], r: 5, art: [
      "    _.---._",
      "  .'       '.",
      " /           \\",
      "|             |",
      " \\           /",
      "  '.       .'",
      "    '-----'"] }
  };
  /* a hand-drawn rim with spokes that turn */
  function wheel(G, cx, cy, size, ang, color, al) {
    var W = RIM[size];
    G.art(cx - W.c[0], cy - W.c[1], W.art, color, al);
    for (var s = 0; s < 3; s++) {
      var a = ang + s * Math.PI * 2 / 3;
      G.line(cx - Math.cos(a) * W.r, cy - Math.sin(a) * W.r / G.aspect, cx + Math.cos(a) * W.r, cy + Math.sin(a) * W.r / G.aspect, color, al * 0.45);
    }
    G.set(cx, cy, "◎", color, al);
  }
  function ground(G, y, x0, x1, t, speed) {
    for (var x = x0; x <= x1; x++) {
      var k = Math.floor(x + t * (speed || 0));
      G.set(x, y, k % 9 === 0 ? "." : k % 13 === 0 ? "," : "_", "muted", 0.55);
    }
  }
  /* pedal-cycle activation: quads fire while the leg extends, hamstrings while it bends */
  function activation(G, hip, crank, R, theta, lead) {
    function dist(th) { var p = [crank[0] + Math.cos(th) * R, crank[1] + Math.sin(th) * R / G.aspect]; return Math.hypot(p[0] - hip[0], (p[1] - hip[1]) * G.aspect); }
    var e = 0.02, rate = (dist(theta - lead - e) - dist(theta - lead + e)) / (2 * e) / R;
    function ramp(v) { v = clamp((v - 0.15) / 0.5, 0, 1); return v * v * (3 - 2 * v); }
    return { q: ramp(rate), h: ramp(-rate) };
  }
  function pads(G, hip, knee, act) {
    [0.35, 0.65].forEach(function (f) {
      var p = lerp(hip, knee, f);
      G.set(p[0], p[1] - 1, "▣", act.q > 0.2 ? "lime" : "muted", act.q > 0.2 ? 1 : 0.6);
      G.set(p[0] + 1, p[1] + 1, "▣", act.h > 0.2 ? "violet" : "muted", act.h > 0.2 ? 1 : 0.5);
      if (act.q > 0.5 && Math.random() < 0.5) G.set(p[0] + (Math.random() * 4 - 2), p[1] - 2, Math.random() < 0.5 ? "'" : "*", "limeHi", 0.8);
    });
  }
  function leg(G, hip, knee, foot, act, al, near) {
    var thighC = act.q > 0.25 ? "lime" : act.h > 0.25 ? "violet" : "ink";
    seg(G, hip, knee, near ? thighC : "muted", near ? 1 : al);
    seg(G, knee, foot, near ? "ink" : "muted", near ? 0.95 : al);
    G.set(knee[0], knee[1], "o", near ? "ink" : "muted", near ? 1 : al);
  }
  /* text that blanks the cells under its spaces (box titles over borders) */
  function label(G, x, y, str, color, a) { G.text(x, y, str, color, a, true); }
  function lcd(G, x, y, w, lines, color) {
    G.box(x, y, w, lines.length + 2, color || "ink", 0.8);
    lines.forEach(function (l, i) { G.text(x + 2, y + 1 + i, String(l).slice(0, w - 4), i ? "muted" : color || "ink", i ? 0.95 : 1); });
  }

  /* ---------- FES trike · Cybathlon ("there is no motor") ---------- */
  A.scene("trike", {
    cols: 110, rows: 30, tight: { x: 12, y: 3, cols: 92, rows: 26 }, thumb: { x: 10, y: 3, cols: 96, rows: 26 },
    tags: [
      { title: { en: "Muscle stimulation", pt: "Estimulação muscular" }, at: [58, 2], to: [70, 13] },
      { title: { en: "Crank angle", pt: "Ângulo do pedal" }, at: [109, 29], to: [98, 18], align: "right" },
      { title: { en: "Stimulator + control", pt: "Estimulador + controle" }, at: [44, 29], to: [56, 23] },
      { title: { en: "No motor", pt: "Sem motor" }, at: [2, 2], to: [22, 22] }
    ],
    draw: function (G, t) {
      var period = 2.6, theta = -t * Math.PI * 2 / period, crank = [98, 18], R = 4;
      ground(G, 27, 0, 109, t, 9);
      for (var i = 0; i < 5; i++) {
        var y = 10 + i * 2, x = 26 - ((t * 26 + i * 17) % 40);
        if (x > 0) G.text(x, y, i % 2 ? "- --" : "--  -", "muted", 0.35);
      }
      var spin = -t * Math.PI * 2 / 1.3;
      wheel(G, 22, 22, "big", spin, "ink", 0.8);
      wheel(G, 84, 23, "small", spin * 1.4, "ink", 0.8);
      /* frame, seat and boom */
      G.line(22, 22, 96, 19, "ink", 0.85); G.line(84, 23, 84, 20, "ink", 0.7);
      G.line(35, 11, 45, 20, "muted", 0.9); G.line(45, 20, 56, 20, "muted", 0.9); G.line(50, 20, 49, 21, "muted", 0.7);
      for (var c = 0; c < 72; c += 3) G.set(96 - c, 19.8 + c * 0.03, "·", "muted", 0.4);
      var hip = [50, 18], th2 = theta + Math.PI;
      var f2 = [crank[0] + Math.cos(th2) * R, crank[1] + Math.sin(th2) * R / G.aspect];
      var k2 = ik(G, hip, f2, 26.5, 26.5, -1), a2 = activation(G, hip, crank, R, th2, 0.35);
      leg(G, hip, k2, f2, a2, 0.45, false);
      /* rider: head, torso against the seat, arm to the under-seat bar */
      G.art(31, 5, [" .--.", "(  o )", " `--'"], "ink", 0.95);
      seg(G, [36, 8], hip, "ink", 0.95);
      seg(G, [39, 11], [42, 16], "ink", 0.85); seg(G, [42, 16], [49, 19], "ink", 0.85);
      G.set(50, 19, "¤", "ink", 0.9);
      var f1 = [crank[0] + Math.cos(theta) * R, crank[1] + Math.sin(theta) * R / G.aspect];
      var k1 = ik(G, hip, f1, 26.5, 26.5, -1), a1 = activation(G, hip, crank, R, theta, 0.35);
      G.circle(crank[0], crank[1], 2.2, "ink", 0.5);
      seg(G, crank, f1, "ink", 0.9); seg(G, crank, f2, "muted", 0.6);
      G.set(crank[0], crank[1], "◎", "ink");
      leg(G, hip, k1, f1, a1, 1, true);
      G.text(f1[0], f1[1], "▶", "ink");
      pads(G, hip, k1, a1);
      /* stimulator under the seat, one LED per channel */
      G.wipe(56, 22, 14, 3); G.box(56, 22, 14, 3, "ink", 0.85);
      var leds = [a1.q, a1.h, a2.q, a2.h], cols = ["lime", "violet", "lime", "violet"];
      G.text(58, 23, "FES", "ink");
      leds.forEach(function (v, j) { G.set(62 + j * 2, 23, v > 0.2 ? "▮" : "▯", v > 0.2 ? cols[j] : "muted", v > 0.2 ? 1 : 0.6); });
      wire(G, [[63, 21], [63, 19], lerp(hip, k1, 0.5)], "muted", 0.5, t * 0.8);
    },
    still: 0.9
  });

  /* ---------- seated FES-cycling with IMU · Calima (after Órion) ---------- */
  A.scene("ergometer", {
    cols: 110, rows: 30, tight: { x: 12, y: 0, cols: 66, rows: 28 }, thumb: { x: 6, y: 0, cols: 100, rows: 28 },
    tags: [
      { title: { en: "Track · IMU", pt: "Acompanhar · IMU" }, at: [40, 1], to: [52, 20] },
      { title: { en: "Coordinate · Connect®", pt: "Coordenar · Connect®" }, at: [108, 10], to: [98, 13], align: "right" },
      { title: { en: "Contract", pt: "Contrair" }, at: [2, 29], to: [38, 13] },
      { title: { en: "Any cycle ergometer", pt: "Qualquer cicloergômetro" }, at: [109, 29], to: [76, 25], align: "right" }
    ],
    draw: function (G, t) {
      var period = 3.2, theta = -t * Math.PI * 2 / period, crank = [64, 20], R = 4;
      ground(G, 27, 0, 109, 0, 0);
      /* wheelchair */
      wheel(G, 23, 22, "big", 0.4, "muted", 0.7);
      G.line(16, 17, 34, 17, "ink", 0.8); G.line(17, 17, 15, 6, "ink", 0.8);
      G.line(34, 17, 34, 25, "muted", 0.7); G.set(34, 26, "o", "muted");
      /* ergometer: base, column, console */
      G.text(56, 26, "▁".repeat(24), "ink", 0.8);
      G.line(74, 25, 74, 10, "ink", 0.8); G.line(73, 25, 66, 21, "ink", 0.6);
      var rpm = Math.round(30 + 2 * Math.sin(t));
      lcd(G, 67, 4, 16, [rpm + " rpm", "FES ▸ ON"], "ink");
      var hip = [28, 16], th2 = theta + Math.PI;
      var f2 = [crank[0] + Math.cos(th2) * R, crank[1] + Math.sin(th2) * R / G.aspect];
      var k2 = ik(G, hip, f2, 21.5, 21.5, -1), a2 = activation(G, hip, crank, R, th2, 0.4);
      leg(G, hip, k2, f2, a2, 0.45, false);
      /* seated patient */
      G.art(18, 1, [" .--.", "(  o )", " `--'"], "ink", 0.95);
      seg(G, [21, 4], hip, "ink", 0.95);
      seg(G, [23, 7], [26, 11], "ink", 0.85); seg(G, [26, 11], [32, 13], "ink", 0.85);
      var f1 = [crank[0] + Math.cos(theta) * R, crank[1] + Math.sin(theta) * R / G.aspect];
      var k1 = ik(G, hip, f1, 21.5, 21.5, -1), a1 = activation(G, hip, crank, R, theta, 0.4);
      G.circle(crank[0], crank[1], 2.2, "ink", 0.5);
      seg(G, crank, f1, "ink", 0.9); seg(G, crank, f2, "muted", 0.6);
      G.set(crank[0], crank[1], "◎", "ink");
      leg(G, hip, k1, f1, a1, 1, true);
      G.text(f1[0], f1[1], "▶", "ink");
      pads(G, hip, k1, a1);
      /* IMU on the shank, streaming over BLE */
      var imu = lerp(k1, f1, 0.45);
      G.text(imu[0] - 1, imu[1], "[▪]", "blue");
      for (var w = 0; w < 3; w++) {
        var ph = (t * 1.6 + w / 3) % 1;
        G.set(imu[0] + 3 + ph * (86 - imu[0] - 3), imu[1] + ph * (16 - imu[1]), ")", "blue", 1 - ph * 0.8);
      }
      /* Connect® stimulator, one bar per channel */
      G.box(88, 13, 20, 7, "ink", 0.85);
      label(G, 90, 13, " Connect® ", "ink");
      var ch = [["CH1", a1.q, "lime", "quad"], ["CH2", a1.h, "violet", "ham"], ["CH3", a2.q * 0.8, "indigo", "glut"]];
      ch.forEach(function (c, i) {
        G.text(90, 14 + i, c[0], "muted");
        var n = Math.round(c[1] * 5);
        for (var j = 0; j < 5; j++) G.set(94 + j, 14 + i, j < n ? "▮" : "▯", j < n ? c[2] : "muted", j < n ? 1 : 0.5);
        G.text(101, 14 + i, c[3], "muted", 0.8);
      });
      G.text(90, 18, "θ " + String(Math.round(((-theta * 180 / Math.PI) % 360 + 360) % 360)).padStart(3, " ") + "°", "blue");
      wire(G, [[88, 18], [60, 18], lerp(hip, k1, 0.5)], "muted", 0.45, t * 0.7);
    },
    still: 1.1
  });

  /* ---------- diaphragm pacing on the ventilator's rhythm · Opalina ---------- */
  A.scene("breath", {
    cols: 110, rows: 30, thumb: { x: 0, y: 1, cols: 104, rows: 28 },
    tags: [
      { title: { en: "Flow sensor", pt: "Sensor de fluxo" }, at: [2, 1], to: [22, 6] },
      { title: { en: "ReCARE®", pt: "ReCARE®" }, at: [76, 1], to: [70, 4] },
      { title: { en: "Neck electrodes", pt: "Eletrodos no pescoço" }, at: [36, 24], to: [34, 15] },
      { title: { en: "Diaphragm", pt: "Diafragma" }, at: [62, 24], to: [50, 16] }
    ],
    draw: function (G, t) {
      var P = 4.5, TI = 1.5, u = ((t % P) + P) % P;
      var vol = u < TI ? 0.5 - 0.5 * Math.cos(Math.PI * u / TI) : Math.exp(-(u - TI) / 0.6);
      var insp = u < TI, stim = u > 0.25 && u < TI - 0.1;
      ground(G, 28, 0, 109, 0, 0);
      /* ventilator on its trolley */
      G.box(2, 3, 16, 8, "ink", 0.85);
      G.text(4, 4, "VENT", "ink"); G.text(10, 4, "12/min", "muted");
      for (var x = 0; x < 12; x++) {
        var uu = ((t - (11 - x) * 0.18) % P + P) % P, f = uu < TI ? Math.sin(Math.PI * uu / TI) : -0.6 * Math.exp(-(uu - TI) / 0.5);
        G.set(4 + x, 7 - Math.round(f * 1.4), "-", "indigo", 0.95);
      }
      G.text(4, 9, "◉ ◉  ▭▭", "muted");
      G.line(10, 11, 10, 25, "ink", 0.7); G.text(6, 26, "─┴┴─", "ink", 0.7); G.text(5, 27, "o    o", "muted");
      /* tube with the flow sensor inline */
      for (var i = 18; i <= 25; i++) G.set(i, 6, "~", "muted", 0.85);
      G.line(26, 7, 32, 13, "muted", 0.85, "~");
      var blink = insp && Math.sin(t * 14) > -0.2;
      G.text(21, 5, "┌─┐", "ink", 0.8); G.set(21, 6, "│", "ink", 0.8); G.set(22, 6, "▷", blink ? "lime" : "muted"); G.set(23, 6, "│", "ink", 0.8); G.text(21, 7, "└─┘", "ink", 0.8);
      if (vol > 0.08) for (var k = 0; k < 4; k++) {
        var ph = ((t * 0.9 * (insp ? 1 : -1) + k / 4) % 1 + 1) % 1, px = 18 + ph * 14, py = px < 26 ? 6 : 6 + (px - 26);
        G.set(px, py, "∙", insp ? "blue" : "muted", insp ? 0.9 : 0.6);
      }
      /* bed */
      G.text(24, 19, "▁".repeat(76), "muted", 0.7);
      G.text(24, 20, "═".repeat(76), "ink", 0.8);
      G.line(28, 21, 28, 26, "ink", 0.7); G.line(96, 21, 96, 26, "ink", 0.7);
      G.set(28, 27, "o", "muted"); G.set(96, 27, "o", "muted");
      G.text(23, 18, "(______)", "muted", 0.5);
      /* patient, supine: head, chest rising with each breath, blanket */
      G.art(25, 14, [" .-^-.", "(  -  )", " `---'"], "ink", 0.95);
      var top = 14.4 - vol * 1.3;
      for (var x2 = 33; x2 <= 62; x2++) {
        var bump = Math.sin(Math.PI * clamp((x2 - 33) / 27, 0, 1));
        var yy = top + (1 - bump) * 1.6;
        G.line(x2, yy, x2 + 1, top + (1 - Math.sin(Math.PI * clamp((x2 - 32) / 27, 0, 1))) * 1.6, "ink", 0.9);
      }
      for (var x3 = 62; x3 <= 98; x3++) for (var y3 = 16; y3 <= 18; y3++) G.set(x3, y3, (x3 * 3 + y3 * 5 + Math.floor(t)) % 11 === 0 ? "~" : "▒", "indigo", 0.18);
      G.text(62, 15, "_".repeat(37), "ink", 0.7);
      /* lungs fill; the diaphragm flattens and lights while stimulated */
      for (var x4 = 36; x4 < 48; x4++) for (var y4 = 15; y4 <= 17; y4++) if (hash(x4 * 7 + y4) < 0.3 + vol * 0.65) G.set(x4, y4, "░", "blue", 0.55);
      var s = stim ? Math.min(1, (u - 0.25) / 0.3) : 0, shift = Math.round(s * 2);
      [[15, 2], [16, 0], [17, 0], [18, 2]].forEach(function (r) {
        G.set(49 + shift + Math.round(r[1] * (1 - s * 0.7)), r[0], "(", s > 0 ? "lime" : "violet", s > 0 ? 1 : 0.85);
      });
      if (s > 0.5 && Math.random() < 0.5) G.set(52 + Math.random() * 3, 14.5, "*", "limeHi", 0.8);
      /* electrodes on the neck, wired to ReCARE */
      G.set(34, 15, "▣", s > 0 ? "lime" : "muted");
      wire(G, [[52, 8], [52, 11], [35, 14]], "muted", 0.55, stim ? t * 1.5 : null);
      /* ReCARE® */
      var L = A.lang() === "pt" ? ["Fluxo 10", "conectado ao ReCARE"] : ["Flow 10", "connected to ReCARE"];
      G.wipe(44, 2, 26, 6); G.box(44, 2, 26, 6, "ink", 0.85);
      label(G, 46, 2, " ReCARE® ", "ink");
      G.text(46, 3, L[0], "ink"); G.text(60, 3, "CH1", "muted"); G.set(64, 3, stim ? "▮" : "▯", stim ? "lime" : "muted");
      G.text(46, 4, L[1], "muted");
      G.text(46, 5, stim ? "▶ stim" : "· idle", stim ? "limeInk" : "muted");
      if (insp) for (var b = 0; b < 3; b++) { var q = (t * 1.8 + b / 3) % 1; G.set(25 + q * 18, 5 - q * 2, ")", "blue", 1 - q); }
      /* bedside monitor: flow and stimulus */
      G.box(92, 3, 16, 9, "ink", 0.8);
      G.text(94, 4, "flow", "indigo"); G.text(94, 8, "stim", "limeInk");
      for (var x5 = 0; x5 < 12; x5++) {
        var u2 = ((t - (11 - x5) * 0.22) % P + P) % P;
        var f2 = u2 < TI ? Math.sin(Math.PI * u2 / TI) : -0.6 * Math.exp(-(u2 - TI) / 0.5);
        G.set(94 + x5, 6 - Math.round(f2 * 1.2), "-", "indigo");
        G.set(94 + x5, u2 > 0.25 && u2 < TI - 0.1 ? 9 : 10, u2 > 0.25 && u2 < TI - 0.1 ? "▀" : "_", "lime");
      }
      G.line(100, 12, 100, 18, "muted", 0.6);
    },
    still: 0.9
  });

  /* ---------- FES-BCI pipeline · Nebula ---------- */
  var HEAD = [
    "     .-''''-.",
    "   .'        '.",
    "  /            \\",
    " ;              ;",
    " |               \\",
    " |              _/",
    " ;             (",
    "  \\            _>",
    "   '.        .'",
    "     |      |",
    "     |      |"
  ];
  A.scene("bci", {
    cols: 110, rows: 30, thumb: { x: 2, y: 1, cols: 104, rows: 28 },
    tags: [
      { title: { en: "EEG · 2 prefrontal ch.", pt: "EEG · 2 canais pré-frontais" }, at: [2, 1], to: [16, 6] },
      { title: { en: "Ganglion → BLE", pt: "Ganglion → BLE" }, at: [2, 28], to: [46, 12] },
      { title: { en: "β-band detector", pt: "Detector da banda β" }, at: [58, 1], to: [70, 6] },
      { title: { en: "Smart relay < 250 ms", pt: "Relé inteligente < 250 ms" }, at: [36, 26], to: [68, 24] },
      { title: { en: "FES → contraction", pt: "FES → contração" }, at: [109, 1], to: [96, 8], align: "right" }
    ],
    draw: function (G, t) {
      var cyc = (t % 7 + 7) % 7, focus = cyc > 3 && cyc < 5.6;
      var beta = focus ? 0.85 + 0.12 * Math.sin(t * 6) : 0.3 + 0.12 * Math.sin(t * 3.1) + 0.06 * Math.sin(t * 9);
      var on = focus && cyc > 3.35;
      G.art(3, 5, HEAD, "ink", 0.9);
      G.text(13, 6, "●", on ? "lime" : "indigo"); G.text(9, 4, "‿‿‿", "muted", 0.8);
      G.set(16, 9, "·", "ink");
      /* two EEG traces leaving the forehead */
      [8, 11].forEach(function (yy, c) {
        for (var x = 21; x <= 40; x++) {
          var tt = t - (40 - x) * 0.03 + c * 0.7;
          var v = 0.5 * Math.sin(tt * 9.3) + 0.4 * Math.sin(tt * 21 + c) * (focus ? 1.6 : 0.6) + (hash(Math.floor(tt * 40) + c) - 0.5) * 0.5;
          G.set(x, yy - Math.round(clamp(v, -1.4, 1.4)), "-", c ? "blue" : "indigo", 0.9);
        }
      });
      G.text(21, 13, "Fp1 · Fp2", "muted");
      /* Ganglion board */
      G.box(42, 7, 12, 5, "ink", 0.85);
      G.text(44, 8, "GANGLION", "ink"); G.text(44, 9, "▪▪ 200 Hz", "muted"); G.text(44, 10, "4ch · BLE", "muted");
      for (var b = 0; b < 3; b++) { var q = (t * 1.5 + b / 3) % 1; G.set(55 + q * 4, 9, ")", "blue", 1 - q); }
      /* laptop with the band-power view */
      G.box(60, 2, 27, 15, "ink", 0.85);
      G.text(62, 3, "β ~21 Hz", "ink"); G.text(76, 3, focus ? "FOCUS" : "rest ", focus ? "limeInk" : "muted");
      var bands = [["δ", 0.55 + 0.1 * Math.sin(t * 1.3)], ["θ", 0.45 + 0.1 * Math.sin(t * 1.7)], ["α", 0.5 + 0.12 * Math.sin(t * 2.1)], ["β", beta], ["γ", 0.25 + 0.06 * Math.sin(t * 4)]];
      bands.forEach(function (bd, i) {
        var h = Math.round(bd[1] * 8), x = 63 + i * 5;
        for (var y = 0; y < h; y++) G.text(x, 13 - y, "██", bd[0] === "β" ? (beta > 0.7 ? "lime" : "indigo") : "blue", bd[0] === "β" ? 1 : 0.55);
        G.ctext(x + 1, 14, bd[0], bd[0] === "β" ? "ink" : "muted");
      });
      for (var x6 = 62; x6 < 86; x6 += 2) if (!G.get(x6, 7)) G.set(x6, 7, "-", "violet", 0.8);
      G.text(81, 7, "thr", "violet");
      G.text(58, 17, "╲" + "▔".repeat(29) + "╱", "ink", 0.7);
      /* relay and stimulator */
      wire(G, [[73, 18], [73, 21]], "muted", 0.7, on ? t : null);
      G.box(64, 21, 18, 5, on ? "lime" : "ink", 0.9);
      G.text(66, 22, "RELAY", "ink"); G.text(73, 22, on ? "[ ON ]" : "[OFF ]", on ? "limeInk" : "muted");
      G.text(66, 23, (focus ? Math.round(180 + 40 * Math.sin(t)) : "—") + (focus ? " ms" : ""), "muted");
      wire(G, [[82, 23], [88, 23]], "muted", 0.7, on ? t * 1.3 : null);
      G.box(88, 21, 10, 5, "ink", 0.85);
      G.text(90, 22, "FES", "ink");
      G.text(90, 23, on ? "/\\/\\/" : "_____", on ? "lime" : "muted");
      wire(G, [[93, 21], [93, 13], [92, 10]], "muted", 0.6, on ? t * 1.6 : null);
      /* the leg: a thigh with pads, the shank swings when stimulated */
      var lift = on ? Math.min(1, (cyc - 3.35) * 1.6) * (cyc < 5.3 ? 1 : Math.max(0, 1 - (cyc - 5.3) * 4)) : 0;
      G.art(88, 8, [" ______________", "(  ▣       ▣   )", " ‾‾‾‾‾‾‾‾‾‾‾‾‾‾"], on ? "lime" : "ink", 0.9, function (ch) { return ch === "▣" ? (on ? "lime" : "muted") : null; });
      G.text(88, 12, A.lang() === "pt" ? "coxa" : "thigh", "muted", 0.8);
      if (on && Math.random() < 0.6) G.set(92 + Math.random() * 8, 7, "*", "limeHi", 0.8);
      var knee = [104, 9], ang = (90 - lift * 55) * Math.PI / 180;
      var foot = [knee[0] + Math.cos(ang) * 16, knee[1] + Math.sin(ang) * 16 / G.aspect];
      G.set(knee[0], knee[1], "o", "ink");
      seg(G, knee, foot, "ink", 0.95);
      G.text(foot[0] - 1, foot[1] + 1, "▄▄", "ink", 0.9);
    },
    still: 4.2
  });

  /* ---------- SOMA, the team's management system ---------- */
  A.scene("soma", {
    cols: 110, rows: 30, tight: { x: 0, y: 0, cols: 74, rows: 26 }, thumb: { x: 0, y: 0, cols: 110, rows: 30 }, interval: 60,
    draw: function (G, t) {
      var pt = A.lang() === "pt";
      var mods = pt ? ["Início", "Agenda", "Quadros", "OKRs", "Projetos", "Arquivos", "Treinamentos", "Equipe", "LABBIO", "Studio", "Seleção"]
        : ["Home", "Calendar", "Boards", "OKRs", "Projects", "Documents", "Training", "Team", "LABBIO", "Studio", "Recruiting"];
      var views = [2, 8, 5, 0], vi = Math.floor(t / 4.5) % views.length, vt = t % 4.5, sel = views[vi];
      G.box(1, 0, 108, 29, "ink", 0.85);
      label(G, 3, 0, " soma.neurodynamics.dev ", "muted");
      G.text(3, 1, "◉ SOMA", "indigo"); G.text(24, 1, "⌘K  " + (pt ? "buscar…" : "search…"), "muted");
      G.text(92, 1, "◔ 3", "violet"); G.text(100, 1, "MM", "ink");
      for (var x = 2; x < 108; x++) G.set(x, 2, "─", "muted", 0.6);
      for (var y = 3; y < 28; y++) G.set(19, y, "│", "muted", 0.6);
      mods.forEach(function (m, i) { G.text(3, 4 + i * 2, (i === sel ? "▸ " : "  ") + m, i === sel ? "indigo" : "ink", i === sel ? 1 : 0.75); });
      var X = 22;
      if (sel === 2) {   /* kanban: a card walks across */
        var colsT = pt ? ["A FAZER", "FAZENDO", "FEITO"] : ["TO DO", "DOING", "DONE"];
        colsT.forEach(function (c, i) { G.text(X + i * 29, 4, c, "muted"); });
        var cards = pt ? ["Protocolo ICU v2", "Calibração do fluxo", "Ata da reunião", "Edital FAPEMIG", "Relatório semanal"]
          : ["ICU protocol v2", "Flow calibration", "Meeting minutes", "Grant call", "Weekly report"];
        cards.forEach(function (c, i) {
          var col = i % 3, row = Math.floor(i / 3);
          if (i === 1) { var p = ease(clamp((vt - 1) / 1.6, 0, 1)); col = 1 + p; }
          var cx = X + Math.round(col * 29), cy = 6 + row * 5;
          G.box(cx, cy, 26, 4, i === 1 ? "lime" : "ink", i === 1 ? 1 : 0.6);
          G.text(cx + 2, cy + 1, c, "ink"); G.text(cx + 2, cy + 2, "NRO-" + (100 + i * 7) + " · " + ["MM", "SF", "PC", "GM", "AC"][i], "muted");
        });
      } else if (sel === 8) {   /* LABBIO presence kiosk */
        var qr = ["█▀▀▀█ ▄▀ █▀▀▀█", "█ ▀ █ ▀█ █ ▀ █", "▀▀▀▀▀ █▄ ▀▀▀▀▀", "▄▀▄█▀▄▄▀▀▄▀▄█▄", "█▀▀▀█ ▄█▄▀ ▀▄▀", "█ ▀ █ ▀▄█▄▀▄▀█", "▀▀▀▀▀ ▀ ▀▀ ▀ ▀"];
        G.art(X + 2, 5, qr, "ink", 0.9);
        G.text(X + 2, 15, pt ? "check-in LABBIO" : "LABBIO check-in", "muted"); G.text(X + 2, 16, pt ? "cerca de 150 m" : "150 m geofence", "muted");
        var names = ["Sarah F.", "Pedro C.", "Melyssa N.", "Gabriel M.", "Ana Clara S.", "Matheus M."];
        var n = Math.min(names.length, Math.floor(vt * 2.2));
        for (var i2 = 0; i2 < n; i2++) G.text(X + 22, 5 + i2 * 2, "✓ " + names[i2] + "   " + String(8 + i2).padStart(2, "0") + ":" + String((i2 * 13) % 60).padStart(2, "0"), i2 === n - 1 ? "limeInk" : "ink", 0.9);
        G.text(X + 58, 5, pt ? "sequência" : "streak", "muted");
        for (var s = 0; s < 7; s++) G.set(X + 58 + s * 2, 7, s < 5 ? "■" : "□", s < 5 ? "lime" : "muted");
      } else if (sel === 5) {   /* document control */
        var docs = [["NRO-PES-012", "rev.03", pt ? "Termo de confidencialidade" : "Confidentiality agreement"], ["NRO-PRO-031", "rev.01", pt ? "Plano de verificação" : "Verification plan"], ["NRO-CLI-007", "rev.02", pt ? "Protocolo clínico" : "Clinical protocol"], ["NRO-DIR-004", "rev.05", pt ? "Ata de reunião" : "Meeting minutes"]];
        docs.forEach(function (d, i) {
          var ok = vt > 0.8 + i * 0.7;
          G.text(X, 5 + i * 3, d[0], "indigo"); G.text(X + 13, 5 + i * 3, d[1], "muted"); G.text(X + 21, 5 + i * 3, d[2], "ink", 0.9);
          G.text(X + 58, 5 + i * 3, ok ? (pt ? "✓ aprovado" : "✓ approved") : (pt ? "… revisão" : "… in review"), ok ? "limeInk" : "violet");
          if (ok) G.text(X + 21, 6 + i * 3, "sha256 " + (Math.floor(hash(i + 3) * 1e8)).toString(16) + "…  QR ▣", "muted", 0.8);
        });
      } else {   /* home: weekly hours + KPIs */
        G.text(X, 4, pt ? "Horas apontadas · semana" : "Hours logged · week", "muted");
        var h = [5, 7, 6, 9, 8, 4, 2];
        h.forEach(function (v, i) {
          var hh = Math.round(v * clamp(vt / 1.2, 0, 1));
          for (var yy = 0; yy < hh; yy++) G.text(X + 2 + i * 6, 15 - yy, "███", "indigo", 0.85);
          G.text(X + 3 + i * 6, 16, (pt ? "STQQSSD" : "MTWTFSS")[i], "muted");
        });
        G.text(X + 48, 4, "OKR Q4", "muted");
        [["O1", 0.72, "lime"], ["O2", 0.45, "indigo"], ["O3", 0.6, "violet"]].forEach(function (o, i) {
          G.text(X + 48, 6 + i * 2, o[0], "ink");
          var n2 = Math.round(o[1] * 24 * clamp(vt / 1.4, 0, 1));
          for (var k = 0; k < 24; k++) G.set(X + 52 + k, 6 + i * 2, k < n2 ? "▰" : "▱", k < n2 ? o[2] : "muted", k < n2 ? 1 : 0.5);
        });
        G.text(X + 48, 13, "v2.19.2 · 31 " + (pt ? "módulos" : "modules"), "muted");
      }
      /* deploy log at the bottom */
      var logs = ["migrate v21_rol … ok", "rls policies 140/140 ✓", "tests 4,180 assertions ✓", "carimbar.mjs → cache-bust ok", "push → GitHub Pages ✓"];
      var li = Math.floor(t / 1.6) % logs.length;
      for (var x7 = 20; x7 < 108; x7++) G.set(x7, 24, "─", "muted", 0.4);
      for (var l = 0; l < 3; l++) G.text(22, 25 + l, "$ " + logs[(li + l) % logs.length], l === 2 ? "limeInk" : "muted", l === 2 ? 1 : 0.8);
      if (Math.sin(t * 6) > 0) G.set(22 + 2 + logs[(li + 2) % logs.length].length + 1, 27, "▌", "lime");
    },
    still: 2
  });

  /* ---------- software andon on existing hardware · Abbott ---------- */
  A.scene("andon", {
    cols: 110, rows: 30, thumb: { x: 0, y: 0, cols: 110, rows: 28 }, interval: 50,
    tags: [
      { title: { en: "Call from the station", pt: "Chamado no posto" }, at: [2, 12], to: [41, 14] },
      { title: { en: "Live board", pt: "Painel ao vivo" }, at: [2, 3], to: [26, 4] },
      { title: { en: "Bottleneck heatmap", pt: "Mapa de calor de gargalos" }, at: [109, 12], to: [70, 9], align: "right" },
      { title: { en: "Zero new hardware", pt: "Zero hardware novo" }, at: [109, 29], to: [100, 25], align: "right" }
    ],
    draw: function (G, t) {
      var N = 6, pt = A.lang() === "pt";
      var cyc = 9, k = Math.floor(t / cyc), u = t % cyc;
      var caller = [2, 4, 2, 1, 2, 5][k % 6];
      var calling = u > 1 && u < 6.2, walking = u > 3.2 && u < 6.2;
      ground(G, 27, 0, 109, 0, 0);
      /* the board */
      G.box(26, 1, 58, 9, "ink", 0.85);
      label(G, 28, 1, " ANDON · " + (pt ? "ao vivo " : "live "), "ink");
      for (var i = 0; i < N; i++) {
        var y = 2 + i, hot = i === caller && calling;
        G.text(28, y, "ST" + (i + 1), hot ? "violet" : "ink", hot ? 1 : 0.8);
        for (var h = 0; h < 16; h++) {
          var base = hash(i * 17 + h) * (i === 2 ? 1 : 0.55) + (i === 2 && h > 6 && h < 12 ? 0.4 : 0);
          var grow = clamp(base + Math.floor(t / cyc) * 0.02 * (i === 2 ? 1 : 0.3), 0, 1);
          var lvl = " ·░▒▓█"[Math.min(5, Math.floor(grow * 5.99))];
          G.set(32 + h * 2, y, lvl, grow > 0.75 ? "violet" : grow > 0.45 ? "indigo" : "blue", 0.35 + grow * 0.6);
          G.set(33 + h * 2, y, lvl, grow > 0.75 ? "violet" : grow > 0.45 ? "indigo" : "blue", 0.35 + grow * 0.6);
        }
        if (hot) { var s = Math.floor((u - 1) * 23); G.text(66, y, "! " + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"), Math.sin(t * 8) > 0 ? "violet" : "ink"); }
        else G.text(66, y, "· ok", "limeInk", 0.8);
      }
      G.text(28, 8, pt ? "chamados × hora →" : "calls × hour →", "muted"); G.text(72, 8, "MTTR 2:41", "muted");
      /* stations, lights, conveyor */
      for (var j = 0; j < N; j++) {
        var x = 6 + j * 17, on = j === caller && calling;
        G.set(x + 3, 13, on ? (Math.sin(t * 9) > 0 ? "▮" : "▯") : "▮", on ? "violet" : "lime", on ? 1 : 0.8);
        G.set(x + 3, 14, "┃", "ink", 0.7);
        G.box(x, 15, 8, 4, on ? "violet" : "ink", on ? 1 : 0.75);
        G.text(x + 2, 16, "ST" + (j + 1), "ink"); G.text(x + 2, 17, "▭▭", "muted");
        if (on) wire(G, [[x + 3, 12], [x + 3, 10.5], [Math.min(80, Math.max(30, x + 3)), 10]], "violet", 0.6, u * 0.8, "violet");
      }
      for (var c = 2; c < 108; c++) G.set(c, 20, "═", "ink", 0.7);
      for (var c2 = 3; c2 < 108; c2 += 4) G.set(c2, 21, "◦", "muted", 0.7);
      for (var p = 0; p < 7; p++) { var px = (p * 16 + t * 6) % 106 + 2; G.set(px, 19, "▣", "indigo", 0.9); }
      /* support walks straight to the caller, no hunting around */
      var desk = 100, target = 6 + caller * 17 + 3;
      var wx = walking ? desk + (target - desk) * ease(clamp((u - 3.2) / 1.6, 0, 1)) : desk;
      G.text(96, 24, "[▭]", "ink", 0.7);
      G.set(wx, 25, "@", "ink");
      G.text(91, 26, pt ? "suporte" : "support", "muted", 0.8);
    },
    still: 3
  });

  /* ---------- tiered daily management · visual management & BI ---------- */
  A.scene("tiers", {
    cols: 110, rows: 30, tight: { x: 26, y: 5, cols: 58, rows: 17 }, thumb: { x: 0, y: 0, cols: 110, rows: 30 }, interval: 60,
    draw: function (G, t) {
      var pt = A.lang() === "pt";
      var tiers = [
        [3, 20, "T1 · " + (pt ? "linha" : "line"), "08:00"], [29, 14, "T2 · " + (pt ? "área" : "area"), "08:30"],
        [55, 8, "T3 · " + (pt ? "site" : "site"), "09:00"], [81, 2, "T4 · " + (pt ? "liderança" : "leadership"), "09:30"]];
      var clock = Math.floor(t * 2) % 4;
      tiers.forEach(function (b, i) {
        var live = i === clock;
        G.box(b[0], b[1], 26, 7, live ? "indigo" : "ink", live ? 1 : 0.6);
        label(G, b[0] + 2, b[1], " " + b[2] + " ", live ? "indigo" : "ink");
        label(G, b[0] + 18, b[1] + 6, " " + b[3] + " ", "muted");
        "SQDCP".split("").forEach(function (L, j) {
          var bad = hash(i * 9 + j + Math.floor(t / 3)) > 0.78;
          G.text(b[0] + 2 + j * 5, b[1] + 2, L, "ink", 0.9);
          G.set(b[0] + 3 + j * 5, b[1] + 2, "●", bad ? "violet" : "lime");
          for (var s = 0; s < 3; s++) G.set(b[0] + 2 + j * 5 + s, b[1] + 4, "▁▂▃▄▅▆"[Math.floor(hash(i * 31 + j * 7 + s + Math.floor(t)) * 6)], bad ? "violet" : "blue", 0.7);
        });
        if (i < 3) {
          var a = [b[0] + 26, b[1] + 3], z = [tiers[i + 1][0], tiers[i + 1][1] + 3];
          wire(G, [a, [a[0] + 2, a[1]], [z[0] - 2, z[1] + 1], z], "muted", 0.45, (t * 0.5 + i * 0.3) % 1, "violet");
        }
      });
      G.text(3, 2, pt ? "▲ problemas sobem · ▼ ajuda desce" : "▲ issues escalate · ▼ support flows down", "muted");
      G.text(3, 4, "S Q D C P = " + (pt ? "segurança · qualidade · entrega · custo · pessoas" : "safety · quality · delivery · cost · people"), "muted", 0.8);
    },
    still: 2
  });

  /* ---------- team network growing · founding NeuroDynamics ---------- */
  A.scene("network", {
    cols: 110, rows: 30, tight: { x: 16, y: 0, cols: 78, rows: 30 }, thumb: { x: 8, y: 0, cols: 94, rows: 30 }, interval: 50,
    draw: function (G, t) {
      var pt = A.lang() === "pt", cx = 55, cy = 14.5;
      var hubs = [["PES", pt ? "Pessoal" : "People"], ["P&D", pt ? "P&D" : "R&D"], ["CLI", pt ? "Clínico" : "Clinical"], ["REL", pt ? "Relações" : "Relations"], ["MKT", "Marketing"]];
      var loopT = t % 16, grow = clamp(loopT / 11, 0, 1), members = Math.round(grow * 40);
      var month = A.months("2024-11", "2025-05"), mi = Math.min(month - 1, Math.floor(grow * (month - 0.01)));
      var ym = ["11/2024", "12/2024", "01/2025", "02/2025", "03/2025", "04/2025", "05/2025"][mi];
      G.text(2, 1, ym, "indigo"); G.text(2, 2, (pt ? "membros " : "members ") + members, "ink");
      hubs.forEach(function (h, i) {
        var a = -Math.PI / 2 + i * Math.PI * 2 / 5, hx = cx + Math.cos(a) * 34, hy = cy + Math.sin(a) * 8.6;
        var show = grow > i * 0.12;
        if (!show) return;
        wire(G, [[cx, cy], [hx, hy]], "muted", 0.45, (t * 0.4 + i * 0.2) % 1, "indigo");
        for (var m = 0; m < 8; m++) {
          var idx = i * 8 + m, on = idx < members;
          var ang = a + (m - 3.5) * 0.36, r = 6 + (m % 2) * 3;
          var mx = hx + Math.cos(ang) * r, my = hy + Math.sin(ang) * r / G.aspect;
          if (on) { G.line(hx, hy, mx, my, "muted", 0.25, "·"); G.set(mx, my, idx === members - 1 ? "●" : "o", ["indigo", "blue", "violet", "lime", "indigo"][i], 0.9); }
        }
        G.ctext(hx, hy, "[" + h[0] + "]", "ink"); G.ctext(hx, hy + 1, h[1], "muted");
      });
      G.ctext(cx, cy, "◉ NRO", "indigo"); G.ctext(cx, cy + 1, pt ? "diretoria" : "board", "muted");
      var partners = ["ETH Zürich", "InCor · HCFMUSP", "IMREA · HCFMUSP", "Visuri", "H. Paulo de Tarso", "LABBIO · LEB"];
      partners.forEach(function (p, i) {
        if (grow < 0.45 + i * 0.08) return;
        var px = i % 2 ? 108 - p.length : 2, py = 22 + Math.floor(i / 2) * 2;
        G.text(px, py, p, "muted", 0.9); G.set(i % 2 ? px - 2 : px + p.length + 1, py, "◇", "violet");
      });
    },
    still: 14
  });

  /* ---------- portfolio radar · directing NeuroDynamics ---------- */
  A.scene("radar", {
    cols: 110, rows: 30, thumb: { x: 14, y: 0, cols: 82, rows: 30 }, interval: 50,
    draw: function (G, t) {
      var pt = A.lang() === "pt", cx = 55, cy = 15;
      [8, 16, 24].forEach(function (r) { G.circle(cx, cy, r * 1.6, "muted", 0.3, "·"); });
      G.line(cx - 40, cy, cx + 40, cy, "muted", 0.25, "·"); G.line(cx, 1, cx, 29, "muted", 0.25, "·");
      var sweep = (t * 0.9) % (Math.PI * 2);
      for (var k = 0; k < 6; k++) {
        var a = sweep - k * 0.06;
        G.line(cx, cy, cx + Math.cos(a) * 38, cy + Math.sin(a) * 38 / G.aspect, "lime", 0.55 - k * 0.08, k ? "·" : "•");
      }
      var P = [
        ["Calima", 0.4, 18, "lime", pt ? "em andamento" : "ongoing"], ["Órion", 1.3, 34, "indigo", pt ? "finalizado" : "finished"],
        ["Opalina", 2.2, 14, "lime", pt ? "em andamento" : "ongoing"], ["Nebula", 2.9, 22, "lime", pt ? "em andamento" : "ongoing"],
        ["Gaia", 3.7, 26, "lime", pt ? "em andamento" : "ongoing"], ["Deriva", 4.3, 30, "violet", pt ? "em espera" : "on hold"],
        ["Équio", 4.9, 20, "blue", pt ? "pronto p/ iniciar" : "ready to start"], ["Zéfiro", 5.5, 36, "muted", pt ? "não iniciado" : "not started"],
        ["Arabella", 6.0, 33, "muted", pt ? "não iniciado" : "not started"]];
      P.forEach(function (p) {
        var x = cx + Math.cos(p[1]) * p[2], y = cy + Math.sin(p[1]) * p[2] / G.aspect;
        var d = ((sweep - p[1]) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2), glow = Math.max(0, 1 - d / 2.2);
        G.set(x, y, glow > 0.7 ? "◉" : "●", p[3], 0.45 + glow * 0.55);
        G.text(x + 2, y, p[0], "ink", 0.5 + glow * 0.5);
        if (glow > 0.3) G.text(x + 2, y + 1, p[4], p[3] === "lime" ? "limeInk" : p[3], glow);
      });
      G.ctext(cx, cy, "◎", "ink");
    },
    still: 2
  });

  /* ---------- gait with a transtibial prosthesis · CEFET TCC ---------- */
  function bump(x, c, w) { var d = x - c; d = d - Math.round(d); return Math.exp(-(d / w) * (d / w)); }
  function ankleCurve(ph, kind) {
    if (kind === "sach") return 4 * bump(ph, 0.35, 0.16) - 6 * bump(ph, 0.62, 0.07) - 3 * bump(ph, 0.02, 0.05);
    if (kind === "esar") return 9 * bump(ph, 0.4, 0.13) - 14 * bump(ph, 0.62, 0.06) - 4 * bump(ph, 0.03, 0.05);
    return 10 * bump(ph, 0.42, 0.12) - 18 * bump(ph, 0.63, 0.06) - 5 * bump(ph, 0.03, 0.05) + 2 * bump(ph, 0.85, 0.08);
  }
  A.scene("gait", {
    cols: 110, rows: 30, thumb: { x: 4, y: 0, cols: 104, rows: 28 },
    tags: [
      { title: { en: "Socket", pt: "Encaixe" }, at: [2, 6], to: [27, 17] },
      { title: { en: "Pylon", pt: "Pilão" }, at: [2, 21], to: [28, 21] },
      { title: { en: "Energy-storing foot", pt: "Pé de restituição de energia" }, at: [2, 29], to: [31, 25] },
      { title: { en: "Ankle angle · gait cycle", pt: "Ângulo do tornozelo · ciclo" }, at: [58, 1], to: [70, 6] }
    ],
    draw: function (G, t) {
      var pt = A.lang() === "pt", period = 1.6, ph = (t / period) % 1;
      ground(G, 26, 2, 52, t, 14);
      function legAngles(p) {
        var hip = 22 * Math.cos(2 * Math.PI * p) * 0.9;
        var knee = 12 * bump(p, 0.15, 0.08) + 58 * bump(p, 0.72, 0.11);
        return [hip, knee];
      }
      var hip = [28, 14 - 0.4 * Math.abs(Math.sin(2 * Math.PI * ph))], L = 11.6;
      function drawLeg(p, prosthetic) {
        var an = legAngles(p), h = an[0] * Math.PI / 180, k = an[1] * Math.PI / 180;
        var knee = [hip[0] + Math.sin(h) * L, hip[1] + Math.cos(h) * L / G.aspect];
        var s = h - k, foot = [knee[0] + Math.sin(s) * L, knee[1] + Math.cos(s) * L / G.aspect];
        seg(G, hip, knee, prosthetic ? "ink" : "muted", prosthetic ? 1 : 0.55);
        if (prosthetic) {
          G.text(knee[0] - 1, knee[1], "▄█▄", "indigo");
          seg(G, [knee[0], knee[1] + 1], foot, "indigo", 1, "‖");
          G.text(foot[0] - 1, foot[1], "(_", "violet"); G.text(foot[0] + 1, foot[1] + 0.6, "__⌐", "violet");
        } else {
          seg(G, knee, foot, "muted", 0.55); G.text(foot[0], foot[1], "_▶", "muted", 0.55);
        }
      }
      drawLeg((ph + 0.5) % 1, false);
      /* torso, arms, head */
      var sh = [hip[0] - 1, hip[1] - 7];
      seg(G, sh, hip, "ink", 0.95);
      var arm = 25 * Math.cos(2 * Math.PI * ph) * Math.PI / 180;
      seg(G, [sh[0], sh[1] + 1], [sh[0] - Math.sin(arm) * 11, sh[1] + 1 + Math.cos(arm) * 11 / G.aspect], "ink", 0.8);
      G.art(sh[0] - 2, sh[1] - 3, [" .-.", "(  o)", " `-'"], "ink", 0.95);
      drawLeg(ph, true);
      /* the ankle curve, with a cursor in step with the walker */
      var X = 58, W = 50, Y = 3, H = 16;
      G.text(X, Y - 1, pt ? "tornozelo (°) × ciclo da marcha (%)" : "ankle (°) × gait cycle (%)", "muted");
      for (var y = 0; y < H; y++) G.set(X, Y + y, "│", "muted", 0.6);
      for (var x = 0; x <= W; x++) G.set(X + x, Y + H, x % 10 === 0 ? "┴" : "─", "muted", 0.6);
      [0, 20, 40, 60, 80, 100].forEach(function (v, i) { G.ctext(X + i * 10, Y + H + 1, String(v), "muted"); });
      var series = [["intact", "ink", 0.45, pt ? "membro intacto" : "intact limb"], ["esar", "lime", 1, "ESAR"], ["sach", "violet", 0.9, "SACH"]];
      series.forEach(function (s, si) {
        var ys = [];
        for (var x2 = 0; x2 <= W; x2++) ys.push(Y + (1 - (ankleCurve(x2 / W, s[0]) + 20) / 32) * (H - 1));
        G.plot(X + 1, ys, s[1], s[2]);
        G.text(X + si * 17, Y + H + 3, "▬ " + s[3], s[1], 0.95);
      });
      var cx = X + Math.round(ph * W);
      for (var y2 = 0; y2 < H; y2++) if (!G.get(cx, Y + y2)) G.set(cx, Y + y2, "┊", "blue", 0.6);
      G.text(X, Y + H + 5, "▕" + "█".repeat(30) + "░".repeat(20) + "▏", "indigo", 0.6);
      G.text(X + 1, Y + H + 6, pt ? "apoio 60%" : "stance 60%", "muted"); G.text(X + 33, Y + H + 6, pt ? "balanço 40%" : "swing 40%", "muted");
      G.set(X + 1 + Math.round(ph * 50), Y + H + 5, "▲", "lime");
    },
    still: 0.4
  });

  /* ---------- plotter blueprint → work packages · FINEP prosthesis ---------- */
  A.scene("blueprint", {
    cols: 110, rows: 30, tight: { x: 8, y: 1, cols: 76, rows: 27 }, thumb: { x: 0, y: 0, cols: 110, rows: 30 }, interval: 50,
    draw: function (G, t) {
      var pt = A.lang() === "pt", loopT = t % 14;
      var path = [[16, 3], [28, 3], [26, 9], [18, 9], [16, 3]];
      var parts = [
        { pts: path, c: "indigo" },
        { pts: [[22, 10], [22, 11]], c: "ink" },
        { pts: [[21, 13], [21, 22]], c: "indigo" }, { pts: [[23, 13], [23, 22]], c: "indigo" },
        { pts: [[22, 23], [14, 24], [30, 24], [30, 23], [24, 22]], c: "violet" }];
      var budget = loopT * 22, pen = null;
      parts.forEach(function (p) {
        for (var i = 0; i < p.pts.length - 1; i++) {
          var a = p.pts[i], b = p.pts[i + 1], n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]), 1);
          var m = Math.min(n, Math.floor(budget)); budget -= n;
          if (m <= 0) return;
          var e = [a[0] + (b[0] - a[0]) * m / n, a[1] + (b[1] - a[1]) * m / n];
          G.line(a[0], a[1], e[0], e[1], p.c, 0.9); pen = e;
        }
      });
      if (budget > -4) G.circle(22, 12, 2, "ink", 0.8);
      if (pen && budget < 0) G.set(pen[0], pen[1], "+", "lime");
      if (loopT > 3.5) {
        G.text(32, 3, "┬", "muted"); G.text(32, 24, "┴", "muted");
        for (var y = 4; y < 24; y++) G.set(32, y, "│", "muted", 0.6);
        G.text(34, 13, "~480 mm", "muted");
        G.text(14, 26, "├" + "─".repeat(6) + " 260 mm " + "─".repeat(1) + "┤", "muted");
      }
      var wbs = pt
        ? ["FINEP · prótese de membro inferior", "├─ mecânica e materiais", "├─ eletrônica e sensores", "├─ protocolo clínico", "├─ regulatório (ANVISA)", "└─ gestão do projeto"]
        : ["FINEP · lower-limb prosthesis", "├─ mechanics & materials", "├─ electronics & sensors", "├─ clinical protocol", "├─ regulatory (ANVISA)", "└─ project management"];
      var shown = clamp(Math.floor((loopT - 4) * 1.6), 0, wbs.length);
      for (var i = 0; i < shown; i++) G.text(48, 4 + i * 2, wbs[i], i ? "ink" : "indigo", i ? 0.85 : 1);
      if (loopT > 8.5) {
        for (var y2 = 6; y2 <= 14; y2++) G.set(80, y2, y2 === 10 ? "┤" : "│", "muted", 0.8);
        G.text(80, 5, "╮", "muted"); G.text(80, 15, "╯", "muted");
        var p2 = clamp((loopT - 9) / 1.2, 0, 1);
        wire(G, [[81, 10], [81 + Math.round(p2 * 6), 10]], "muted", 0.8, null);
        if (p2 >= 1) {
          G.box(88, 8, 20, 5, "lime", 1);
          G.text(90, 9, "NeuroDynamics", "ink"); G.text(90, 10, pt ? "nasce aqui" : "starts here", "limeInk"); G.text(90, 11, "11/2024", "muted");
        }
        G.text(48, 17, pt ? "trabalho demais para um laboratório só" : "more work than one lab could carry", "muted", clamp(loopT - 9, 0, 1));
      }
    },
    still: 12
  });
})();
