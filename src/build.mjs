// Static site generator for marcondes.dev — no dependencies.
//   node src/build.mjs          → writes the pages at the repo root
// Content lives in src/content; every string is { en, pt } and both languages
// are written into the page, the inactive one hidden by CSS (instant toggle,
// readable without JS). Assets in /assets are hand-written, not generated.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { person, resume, ui, tools, NOW } from "./content/site.mjs";
import { experiences } from "./content/experiences.mjs";
import { projects } from "./content/projects.mjs";
import { tour } from "./content/tour.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LANGS = ["en", "pt"];
const HTML_LANG = { en: "en", pt: "pt-BR" };

/* ---------- helpers ---------- */
const isL = (v) => v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "pt" in v);
const pick = (v, l) => (isL(v) ? (v[l] ?? v.en) : v);
const strip = (s) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const attr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* inline bilingual text */
function t(v) {
  if (!isL(v)) return v ?? "";
  if (v.en === v.pt) return v.en;
  return `<span lang="en">${v.en}</span><span lang="pt-BR">${v.pt}</span>`;
}
/* block-level bilingual element */
function tb(tag, v, cls = "") {
  const c = cls ? ` class="${cls}"` : "";
  if (!isL(v) || v.en === v.pt) return `<${tag}${c}>${pick(v, "en")}</${tag}>`;
  return `<${tag}${c} lang="en">${v.en}</${tag}><${tag}${c} lang="pt-BR">${v.pt}</${tag}>`;
}
/* bilingual list of paragraphs or list items */
function paras(v) { return LANGS.map((l) => `<div lang="${HTML_LANG[l]}">${(v[l] || []).map((p) => `<p>${p}</p>`).join("")}</div>`).join(""); }
function list(v, cls = "") { return LANGS.map((l) => `<ul class="${cls}" lang="${HTML_LANG[l]}">${(v[l] || []).map((p) => `<li>${p}</li>`).join("")}</ul>`).join(""); }
/* widget config: canvas labels are plain text, so entities and tags go */
const plain = (o) => typeof o === "string" ? strip(o) : Array.isArray(o) ? o.map(plain) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, plain(v)])) : o;
const cfg = (o) => attr(JSON.stringify(plain(o)));
const nameOf = (p) => (isL(p.name) ? p.name : { en: p.name, pt: p.name });
const shortOf = (p) => p.short || nameOf(p);

function monthLabel(ym, l) {
  if (!ym) return l === "pt" ? "atual" : "present";
  const [y, m] = ym.split("-").map(Number);
  return `${ui.months[l][m - 1]} ${y}`;
}
function period(from, to) {
  return { en: `${monthLabel(from, "en")} – ${monthLabel(to, "en")}`, pt: `${monthLabel(from, "pt")} – ${monthLabel(to, "pt")}` };
}
function months(a, b) {
  const [ay, am] = a.split("-").map(Number), [by, bm] = (b || NOW).split("-").map(Number);
  return (by - ay) * 12 + (bm - am) + 1;
}
function duration(from, to) {
  const n = months(from, to), y = Math.floor(n / 12), m = n % 12;
  const en = y ? `${y} yr${y > 1 ? "s" : ""}${m ? ` ${m} mo` : ""}` : `${n} mo`;
  const pt = y ? `${y} ano${y > 1 ? "s" : ""}${m ? ` e ${m} ${m > 1 ? "meses" : "mês"}` : ""}` : `${n} ${n > 1 ? "meses" : "mês"}`;
  return { en, pt };
}
function write(rel, html) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}
const expBy = Object.fromEntries(experiences.map((e) => [e.slug, e]));
const projectOrder = experiences.flatMap((e) => e.projects.map((slug) => ({ slug, exp: e.slug })));

/* ---------- shared chrome ---------- */
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='6' fill='%2322c55e'/%3E%3C/svg%3E";
const LANG_BOOT = `(function(){var r=document.documentElement,l=null;try{l=new URLSearchParams(location.search).get("lang")||localStorage.getItem("lang")}catch(e){}if(l!=="en"&&l!=="pt")l=(navigator.language||"").toLowerCase().indexOf("pt")===0?"pt":"en";r.setAttribute("data-lang",l);r.lang=l==="pt"?"pt-BR":"en";})();`;

function head({ title, desc, base, path, extra = "" }) {
  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${strip(pick(title, "en"))}</title>
<meta name="description" content="${attr(strip(pick(desc, "en")))}" />
<meta name="author" content="${person.name}" />
<meta name="theme-color" content="#f3f2ef" />
<meta property="og:title" content="${attr(strip(pick(title, "en")))}" />
<meta property="og:description" content="${attr(strip(pick(desc, "en")))}" />
<meta property="og:url" content="${person.site}/${path}" />
<link rel="canonical" href="${person.site}/${path}" />
<link rel="alternate" type="text/markdown" title="Résumé (Markdown, English)" href="${base}cv/en.md" />
<link rel="alternate" type="text/markdown" title="Currículo (Markdown, português)" href="${base}cv/pt.md" />
<link rel="icon" id="favicon" href="${FAVICON}" />
<link rel="stylesheet" href="${base}assets/site.css" />
<script>${LANG_BOOT}</script>
<script id="i18n-title" type="application/json">${JSON.stringify({ en: strip(pick(title, "en")), pt: strip(pick(title, "pt")) })}</script>
<script src="${base}assets/ascii.js" defer></script>
<script src="${base}assets/scenes.js" defer></script>
<script src="${base}assets/site.js" defer></script>
${extra}</head>`;
}

const LINK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>`;

function toolbar({ home = false } = {}) {
  const langSwitch = `<div class="seg" role="group" aria-label="Language / Idioma">
      <button type="button" class="seg-b" data-set-lang="en" aria-pressed="false">EN</button>
      <button type="button" class="seg-b" data-set-lang="pt" aria-pressed="false">PT</button>
    </div>`;
  const extras = home ? `
    <a class="pill" id="pdfLink" href="cv/matheus-marcondes-cv-en.pdf" data-href-en="cv/matheus-marcondes-cv-en.pdf" data-href-pt="cv/matheus-marcondes-cv-pt.pdf" download data-aria-en="${attr(strip(ui.pdfLong.en))}" data-aria-pt="${attr(strip(ui.pdfLong.pt))}" aria-label="${attr(strip(ui.pdfLong.en))}"><span class="pill-ico" aria-hidden="true">↓</span>PDF</a>
    <button type="button" class="pill" id="tourBtn" data-aria-en="${attr(ui.tourLong.en)}" data-aria-pt="${attr(ui.tourLong.pt)}" aria-label="${attr(ui.tourLong.en)}"><span class="pill-ico" aria-hidden="true">▶</span>${t(ui.tour)}</button>` : "";
  return `
  <div class="toolbar" id="toolbar">
    ${langSwitch}${extras}
    <div class="linkmenu" id="linkmenu" data-open="false">
      <button class="linkmenu-btn" id="linkBtn" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="linkPop" data-aria-en="Open links" data-aria-pt="Abrir links" aria-label="Open links">${LINK_SVG}</button>
      <div class="linkmenu-pop" id="linkPop" role="menu" aria-label="Links">
        ${person.links.map((k) => `<a role="menuitem" href="${k.href}" target="_blank" rel="noopener">${k.label} <span class="arrow" aria-hidden="true">↗</span></a>`).join("\n        ")}
      </div>
    </div>
  </div>`;
}

function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map((c, i) => i < items.length - 1
    ? `<a href="${c.href}">${t(c.label)}</a><span class="sep" aria-hidden="true">/</span>`
    : `<span aria-current="page">${t(c.label)}</span>`).join("")}</nav>`;
}

function counters(list, cls = "") {
  return `<section class="metrics ${cls}" aria-label="${attr(strip(ui.numbers.en))}">
    ${list.map((m) => {
      const val = `${m.prefix ? strip(pick(m.prefix, "en")) : ""}${m.value}${m.suffix ? strip(pick(m.suffix, "en")) : ""}`;
      return `<div class="metric">
        <div class="ascii counter" data-ascii="counter" data-cfg="${cfg({ value: m.value, decimals: m.decimals || 0, prefix: m.prefix || "", suffix: m.suffix || "", color: m.color || "indigo" })}" role="img" aria-label="${attr(val)}"><span class="metric-fallback">${val}</span></div>
        ${tb("p", m.label, "metric-label")}
      </div>`;
    }).join("")}
  </section>`;
}

function toolChips(keys) {
  return `<ul class="tools">${keys.map((k) => {
    const tl = tools[k]; if (!tl) throw new Error("unknown tool " + k);
    return `<li class="tool" style="--c:var(--${tl.c})"><pre class="tool-ico" aria-hidden="true" data-g="${attr(tl.g)}">╭─────╮\n│${tl.g.padEnd(5).slice(0, 5).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}│\n╰─────╯</pre><span class="tool-name">${tl.name}</span></li>`;
  }).join("")}</ul>`;
}

function footer(base) {
  return `
  <footer class="foot">
    <p><a href="${base}">${person.name}</a> · <a href="mailto:${person.email}">${person.email}</a> · <a href="${base}cv/en.md" lang="en">résumé.md</a><a href="${base}cv/pt.md" lang="pt-BR">currículo.md</a> · <a href="${base}llms.txt">llms.txt</a></p>
  </footer>`;
}

/* ---------- home: the résumé ---------- */
function home() {
  const base = "";
  const jobs = experiences.filter((e) => !e.education);
  const ld = {
    "@context": "https://schema.org", "@type": "Person", name: person.fullName, alternateName: person.name,
    url: person.site, email: `mailto:${person.email}`, jobTitle: "Founder & Head, NeuroDynamics",
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Universidade Federal de Minas Gerais" }, { "@type": "EducationalOrganization", name: "CEFET-MG" }],
    worksFor: [{ "@type": "Organization", name: "NeuroDynamics", url: "https://neurodynamics.dev/" }, { "@type": "Organization", name: "Abbott Laboratories" }],
    sameAs: person.links.map((l) => l.href),
    knowsAbout: ["Medical device development", "Functional electrical stimulation", "Brain–computer interfaces", "ISO 13485", "ISO 14971", "Lean Six Sigma", "Project management"]
  };
  const job = (e) => {
    const ps = e.projects.map((s) => projects[s]);
    return `
          <article class="job">
            <h3><a class="lnk org go" href="${e.slug}/" data-shark>${e.org}<span class="go-arrow" aria-hidden="true">→</span></a> <span class="role dim">${t(e.role)}</span></h3>
            <p class="meta dim">${t(e.place)} · ${t({ en: `${e.from.slice(0, 4)} – ${e.to ? e.to.slice(0, 4) : "Present"}`, pt: `${e.from.slice(0, 4)} – ${e.to ? e.to.slice(0, 4) : "Atual"}` })}</p>
            ${tb("p", e.summary)}
            ${e.bullets ? list(e.bullets) : ""}
            <p class="job-projects"><span class="dim">${t(ui.projects)}:</span> ${ps.map((p, i) => `<a href="${e.slug}/${e.projects[i]}/">${t(shortOf(p))}</a>`).join(`<span class="dim"> · </span>`)}</p>
          </article>`;
  };
  return `${head({ title: { en: `${person.name} — Résumé`, pt: `${person.name} — Currículo` }, desc: person.description, base, path: "",
    extra: `<script src="assets/tour.js" defer></script>\n<script type="application/ld+json">${JSON.stringify(ld)}</script>\n<script id="tour-data" type="application/json">${JSON.stringify(tour).replace(/</g, "\\u003c")}</script>\n` })}
<body class="home">
  <a class="skip" href="#main">${t(ui.skip)}</a>
  <div class="vignette" aria-hidden="true"></div>
  ${toolbar({ home: true })}

  <main class="page" id="main">
    <header class="grid masthead">
      <div class="side">
        <h1 class="name">${person.name}</h1>
      </div>
      <div class="contact">
        <a href="${person.site}" target="_blank" rel="noopener">${person.siteLabel}</a>
        <a href="mailto:${person.email}">${person.email}</a>
        <a href="tel:${person.tel}">${person.phone}</a>
      </div>
    </header>

    <section class="about">
      <h2 class="h">${t(ui.about)}</h2>
      ${tb("p", person.about, "about-p")}
    </section>

    <section class="grid body">
      <aside class="side aside">
        <div class="blk">
          <h2 class="h">${t(ui.education)}</h2>
          ${resume.education.map((ed) => `
          <div class="item">
            <div class="d">${ed.page ? `<a class="lnk go" href="${ed.page}/" data-shark>${t(ed.degree)}<span class="go-arrow" aria-hidden="true">→</span></a>` : t(ed.degree)}</div>
            <div class="s"><a class="lnk" href="${ed.href}" target="_blank" rel="noopener">${t(ed.school)}<span class="arrow" aria-hidden="true">↗</span></a></div>
            <div class="m dim">${t(ed.when)}</div>
          </div>`).join("")}
        </div>

        <div class="blk">
          <h2 class="h">${t(ui.skills)}</h2>
          ${resume.skills.map((s) => `<div class="sk"><div class="cat dim">${t(s.cat)}</div><div class="val">${t(s.val)}</div></div>`).join("\n          ")}
        </div>

        <div class="blk">
          <h2 class="h">${t(ui.languages)}</h2>
          ${resume.languages.map((l) => `<div class="item"><div class="d reg">${t(l.name)} <span class="dim">— ${t(l.level)}</span></div></div>`).join("\n          ")}
        </div>

        <div class="blk">
          <h2 class="h">${t(ui.leadership)}</h2>
          ${resume.leadership.map((l) => `<div class="item"><div class="d reg">${t(l.role)}</div><div class="m dim">${t(l.when)}</div></div>`).join("\n          ")}
          <p class="note dim">${t(resume.leadershipNote)}</p>
        </div>
      </aside>

      <div class="main">
        <div class="blk">
          <h2 class="h">${t(ui.experience)}</h2>
          ${jobs.map(job).join("\n")}
        </div>

        <div class="blk">
          <h2 class="h">${t(ui.courses)}</h2>
          <ul class="courses">
            ${resume.courses.map((c) => `<li>${t(c.name)} <span class="dim">— ${t(c.by)}</span></li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>
  </main>
  ${footer(base)}
</body>
</html>
`;
}

/* ---------- experience page ---------- */
function timelineCfg(e) {
  const rows = (e.extraRows || []).map((r) => ({ id: r.id, label: r.label, from: r.from, to: r.to, color: r.color }));
  e.timeline.forEach((slug) => {
    const p = projects[slug];
    rows.push({ id: slug, label: shortOf(p), from: p.from, to: p.to, color: p.color, href: `${slug}/` });
  });
  const starts = rows.map((r) => r.from).sort();
  return { from: starts[0], now: e.to || NOW, to: e.to || NOW, showNow: !e.to, rows };
}

function card(e, slug) {
  const p = projects[slug];
  return `
      <a class="card size-${p.size}" href="${slug}/" data-shark data-id="${slug}" style="--c:var(--${p.color})">
        <div class="thumb ascii" data-ascii="scene" data-cfg="${cfg({ scene: p.scene, mode: "thumb" })}" aria-hidden="true"></div>
        <div class="card-body">
          <p class="card-meta">${t(p.role)} · ${t(period(p.from, p.to))}</p>
          <h3 class="card-title">${t(nameOf(p))}<span class="go-arrow" aria-hidden="true">→</span></h3>
          ${tb("p", p.card, "card-text")}
          <p class="card-tools" aria-hidden="true">${p.tools.slice(0, 4).map((k) => `<span>${tools[k].short || tools[k].name}</span>`).join("")}</p>
        </div>
      </a>`;
}

function experiencePage(e) {
  const base = "../";
  const tl = timelineCfg(e);
  const others = experiences.filter((x) => x !== e);
  return `${head({ title: { en: `${e.org.replace("&amp;", "&")} — ${person.name}`, pt: `${e.org.replace("&amp;", "&")} — ${person.name}` }, desc: e.summary, base, path: `${e.slug}/` })}
<body class="exp" style="--c:var(--${e.color})">
  <a class="skip" href="#main">${t(ui.skip)}</a>
  <div class="vignette" aria-hidden="true"></div>
  ${crumbs([{ label: person.name, href: base }, { label: e.org }])}
  ${toolbar()}

  <main class="page wide" id="main">
    <header class="xhead">
      <p class="kicker">${t(e.education ? ui.education : ui.experience)} · ${t(period(e.from, e.to))} · ${t(duration(e.from, e.to))}</p>
      <h1 class="xtitle">${e.org}</h1>
      <p class="xrole">${t(e.role)} <span class="dim">· ${t(e.place)}</span></p>
      ${tb("p", e.intro, "lede")}
      <p class="xlink"><a class="lnk" href="${e.url}" target="_blank" rel="noopener">${e.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")}<span class="arrow" aria-hidden="true">↗</span></a></p>
    </header>

    <section class="tl" aria-labelledby="tl-h">
      <h2 class="h center" id="tl-h">${t(ui.timeline)}</h2>
      <div class="ascii timeline" data-ascii="timeline" data-cfg="${cfg(tl)}"></div>
      <ol class="sr-only">
        ${tl.rows.map((r) => `<li>${t(r.label)}: ${t(period(r.from, r.to))} (${t(duration(r.from, r.to))})</li>`).join("\n        ")}
      </ol>
    </section>

    ${counters(e.metrics)}

    <section class="gallery-wrap" aria-labelledby="gal-h">
      <h2 class="h center" id="gal-h">${t(ui.projects)}</h2>
      <div class="gallery">${e.projects.map((s) => card(e, s)).join("")}
      </div>
    </section>

    <nav class="xnav" aria-label="${attr(strip(ui.more.en))}">
      <p class="dim">${t(ui.more)}</p>
      <ul>${others.map((o) => `<li><a class="lnk go" href="${base}${o.slug}/" data-shark>${o.org}<span class="go-arrow" aria-hidden="true">→</span></a> <span class="dim">${t(o.role)}</span></li>`).join("")}</ul>
    </nav>
  </main>
  ${footer(base)}
</body>
</html>
`;
}

/* ---------- project one-page ---------- */
function chart(c) {
  const id = c.type;
  return `
          <figure class="chart">
            <figcaption><span class="chart-title">${t(c.title)}</span>${c.illustrative ? ` <span class="badge">${t(ui.illustrative)}</span>` : ""}${c.note ? `<span class="chart-note dim">${t(c.note)}</span>` : ""}</figcaption>
            <div class="ascii ${id}" data-ascii="${id}" data-cfg="${cfg(c.cfg)}" role="img" aria-label="${attr(strip(pick(c.title, "en")))}"></div>
          </figure>`;
}

function projectPage(slug, idx) {
  const p = projects[slug], e = expBy[p.exp], base = "../../";
  const prev = projectOrder[(idx - 1 + projectOrder.length) % projectOrder.length];
  const next = projectOrder[(idx + 1) % projectOrder.length];
  const rel = (o) => (o.exp === p.exp ? `../${o.slug}/` : `../../${o.exp}/${o.slug}/`);
  const name = nameOf(p);
  return `${head({ title: { en: `${strip(name.en)} — ${e.org.replace("&amp;", "&")} — ${person.name}`, pt: `${strip(name.pt)} — ${e.org.replace("&amp;", "&")} — ${person.name}` }, desc: p.tagline, base, path: `${p.exp}/${slug}/` })}
<body class="proj" style="--c:var(--${p.color})">
  <a class="skip" href="#main">${t(ui.skip)}</a>
  <div class="vignette" aria-hidden="true"></div>
  ${crumbs([{ label: person.name, href: base }, { label: e.org, href: "../" }, { label: name }])}
  ${toolbar()}

  <main class="page" id="main">
    <header class="grid phead">
      <div class="side">
        <p class="kicker"><a href="../">${e.org}</a></p>
        <p class="pmeta">${t(p.role)}</p>
        <p class="pmeta dim">${t(period(p.from, p.to))}</p>
        <p class="pmeta dim">${t(duration(p.from, p.to))}</p>
      </div>
      <div>
        <h1 class="ptitle">${t(name)}</h1>
        ${tb("p", p.tagline, "tagline")}
        <p class="status"><span class="dot" aria-hidden="true"></span>${t(p.status)}</p>
      </div>
    </header>

    <section class="stage-wrap" aria-label="${attr(strip(ui.how.en))}">
      ${p.how ? `<div class="grid how-head"><h2 class="h side">${t(ui.how)}</h2><div>${tb("p", p.how.title, "how-title")}${tb("p", p.how.lede, "how-lede")}</div></div>` : ""}
      <div class="stage ascii" data-ascii="scene" data-cfg="${cfg({ scene: p.scene })}" role="img" aria-label="${attr(strip(pick(p.tagline, "en")))}"></div>
      ${p.how ? `<ol class="legend">${p.how.items.map((it, i) => `<li><b><i>${String(i + 1).padStart(2, "0")}</i>${t(it.t)}</b>${tb("p", it.d)}</li>`).join("")}</ol>` : ""}
    </section>

    ${counters(p.metrics)}

    <section class="grid sec">
      <h2 class="h side">${t(ui.what)}</h2>
      <div class="prose">${paras(p.what)}</div>
    </section>

    <section class="grid sec">
      <h2 class="h side">${t(ui.contribution)}</h2>
      <div class="prose">${list(p.contribution, "dash")}</div>
    </section>

    <section class="grid sec">
      <h2 class="h side">${t(ui.why)}</h2>
      <div class="prose">${paras(p.why)}</div>
    </section>

    ${p.charts.length ? `<section class="grid sec">
      <h2 class="h side">${t(ui.charts)}</h2>
      <div class="charts">${p.charts.map(chart).join("")}
      </div>
    </section>` : ""}

    <section class="grid sec">
      <h2 class="h side">${t(ui.tools)}</h2>
      <div>
        <p class="sub dim">${t(ui.toolsLabel)}</p>
        ${toolChips(p.tools)}
        <p class="sub dim">${t(ui.skillsLabel)}</p>
        ${LANGS.map((l) => `<ul class="skills" lang="${HTML_LANG[l]}">${p.skills[l].map((s) => `<li>${s}</li>`).join("")}</ul>`).join("")}
        ${(p.links || []).filter((k) => k.href).map((k) => `<p class="plink"><a class="lnk" href="${k.href}" target="_blank" rel="noopener">${t(k.label)}<span class="arrow" aria-hidden="true">↗</span></a></p>`).join("")}
      </div>
    </section>

    <nav class="pager" aria-label="${attr(strip(ui.projects.en))}">
      <a class="pg prev" href="${rel(prev)}" data-shark><span class="dim">← ${t(ui.prev)}</span><b>${t(nameOf(projects[prev.slug]))}</b></a>
      <a class="pg up" href="../" data-shark><span class="dim">${t(ui.backTo)}</span><b>${e.org}</b></a>
      <a class="pg next" href="${rel(next)}" data-shark><span class="dim">${t(ui.next)} →</span><b>${t(nameOf(projects[next.slug]))}</b></a>
    </nav>
  </main>
  ${footer(base)}
</body>
</html>
`;
}

/* ---------- plain-text résumé for people and machines ---------- */
function md(l) {
  const L = (v) => strip(pick(v, l));
  const out = [];
  const pt = l === "pt";
  out.push(`# ${person.fullName} (${person.name})`, "");
  out.push(L(person.headline), "");
  out.push(`- ${pt ? "Site" : "Website"}: ${person.site}`, `- Email: ${person.email}`, `- ${pt ? "Telefone" : "Phone"}: ${person.phone}`, `- ${pt ? "Local" : "Location"}: ${L(person.location)}`);
  person.links.forEach((k) => out.push(`- ${k.label}: ${k.href}`));
  out.push("", `## ${L(ui.about)}`, "", L(person.about), "");
  out.push(`## ${L(ui.experience)}`, "");
  experiences.forEach((e) => {
    out.push(`### ${strip(e.org)} — ${L(e.role)}`, "", `${L(e.place)} · ${e.from} → ${e.to || (pt ? "atual" : "present")} · ${e.url}`, "", L(e.summary), "");
    if (e.bullets) e.bullets[l].forEach((b) => out.push(`- ${strip(b)}`));
    if (e.bullets) out.push("");
    e.projects.forEach((slug) => {
      const p = projects[slug];
      out.push(`#### ${L(nameOf(p))} (${L(p.role)}; ${p.from} → ${p.to || (pt ? "atual" : "present")})`, "");
      out.push(L(p.tagline), "");
      p.contribution[l].forEach((b) => out.push(`- ${strip(b)}`));
      out.push("", `${pt ? "Números" : "Numbers"}: ${p.metrics.map((m) => `${strip(pick(m.prefix || "", l))}${m.value}${strip(pick(m.suffix || "", l))} ${L(m.label)}`).join("; ")}`);
      out.push(`${pt ? "Ferramentas" : "Tools"}: ${p.tools.map((k) => tools[k].name).join(", ")}`);
      out.push(`${pt ? "Habilidades" : "Skills"}: ${p.skills[l].join(", ")}`);
      out.push(`${pt ? "Página" : "Page"}: ${person.site}/${p.exp}/${slug}/`, "");
    });
  });
  out.push(`## ${L(ui.education)}`, "");
  resume.education.forEach((ed) => out.push(`- ${L(ed.degree)} — ${L(ed.school)} (${L(ed.when)})`));
  out.push("", `## ${L(ui.skills)}`, "");
  resume.skills.forEach((s) => out.push(`- ${L(s.cat)}: ${L(s.val)}`));
  out.push("", `## ${L(ui.languages)}`, "");
  resume.languages.forEach((x) => out.push(`- ${L(x.name)} — ${L(x.level)}`));
  out.push("", `## ${L(ui.leadership)}`, "");
  resume.leadership.forEach((x) => out.push(`- ${L(x.role)} (${L(x.when)}) — ${L(resume.leadershipNote)}`));
  out.push("", `## ${L(ui.courses)}`, "");
  resume.courses.forEach((c) => out.push(`- ${L(c.name)} — ${L(c.by)}`));
  out.push("");
  return out.join("\n");
}

/* ---------- print résumé (source of the PDF): one column, linear, text-first ---------- */
function printPage(l) {
  const L = (v) => pick(v, l);
  const pt = l === "pt";
  const S = (v) => strip(L(v));
  const exp = experiences.map((e) => `
  <section class="x">
    <h3>${e.org} — ${L(e.role)}</h3>
    <p class="m">${L(e.place)} | ${e.from} – ${e.to || (pt ? "atual" : "present")} | ${e.url}</p>
    <p>${L(e.summary)}</p>
    ${e.projects.map((slug) => {
      const p = projects[slug];
      return `
    <div class="p">
      <h4>${L(nameOf(p))} <span class="m">— ${L(p.role)} | ${p.from} – ${p.to || (pt ? "atual" : "present")}</span></h4>
      <p>${L(p.tagline)}</p>
      <ul>${p.contribution[l].map((b) => `<li>${b}</li>`).join("")}</ul>
      <p class="kv"><b>${pt ? "Resultados e números" : "Results and numbers"}:</b> ${p.metrics.map((m) => `${strip(L(m.prefix || ""))}${m.value}${strip(L(m.suffix || ""))} ${S(m.label)}`).join("; ")}.</p>
      <p class="kv"><b>${pt ? "Ferramentas" : "Tools"}:</b> ${p.tools.map((k) => tools[k].name).join(", ")}. <b>${pt ? "Habilidades" : "Skills"}:</b> ${p.skills[l].join(", ")}.</p>
      <p class="kv"><b>${pt ? "Página do projeto" : "Project page"}:</b> ${person.site}/${p.exp}/${slug}/</p>
    </div>`;
    }).join("")}
  </section>`).join("");
  return `<!DOCTYPE html>
<html lang="${HTML_LANG[l]}">
<head>
<meta charset="utf-8" />
<title>${person.fullName} — ${pt ? "Currículo" : "Résumé"}</title>
<meta name="author" content="${person.fullName}" />
<meta name="description" content="${attr(strip(L(person.description)))}" />
<style>
  @page { size: A4; margin: 14mm 15mm 14mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif; font-size: 9.2pt; line-height: 1.36; color: #111; margin: 0; font-variant-ligatures: none; }
  h1 { font-size: 17pt; margin: 0 0 2pt; font-weight: 600; }
  h2 { font-size: 11pt; margin: 13pt 0 5pt; padding-bottom: 2pt; border-bottom: 0.6pt solid #999; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
  h3 { font-size: 10.4pt; margin: 9pt 0 1pt; font-weight: 600; }
  h4 { font-size: 9.8pt; margin: 7pt 0 1pt; font-weight: 600; }
  p { margin: 2pt 0; }
  ul { margin: 2pt 0 2pt 0; padding-left: 13pt; }
  li { margin: 0 0 1.5pt; }
  .m { color: #444; font-weight: 400; }
  .kv { color: #222; }
  .p { margin-left: 8pt; padding-left: 7pt; border-left: 0.6pt solid #bbb; }
  h3, h4 { break-after: avoid; }
  li, .kv { break-inside: avoid; }
  .x > h3 { break-after: avoid; }
  a { color: #111; text-decoration: none; }
  .q { font-style: italic; }
  .contact { margin: 2pt 0 0; }
</style>
</head>
<body>
  <header>
    <h1>${person.fullName}</h1>
    <p>${L(person.headline)}</p>
    <p class="contact">${pt ? "Site" : "Website"}: ${person.site} | Email: ${person.email} | ${pt ? "Telefone" : "Phone"}: ${person.phone} | ${L(person.location)}</p>
    <p class="contact">${person.links.map((k) => `${k.label}: ${k.href}`).join(" | ")}</p>
  </header>

  <h2>${pt ? "Resumo" : "Summary"}</h2>
  <p>${L(person.about)}</p>

  <h2>${pt ? "Destaques" : "Highlights"}</h2>
  <ul>
    <li>${pt ? "Fundador e diretor da NeuroDynamics (UFMG): ~40 membros, 5 departamentos, 9 projetos de healthtech com parceiros clínicos e da indústria." : "Founder and director of NeuroDynamics (UFMG): ~40 members, 5 departments, 9 healthtech projects with clinical and industry partners."}</li>
    <li>${pt ? "Gerente de projeto de sistemas de eletroestimulação para UTI e reabilitação (Opalina, Calima), com Visuri, InCor – HCFMUSP e Hospital Paulo de Tarso." : "Project manager of electrical-stimulation systems for the ICU and rehabilitation (Opalina, Calima), with Visuri, InCor – HCFMUSP and Hospital Paulo de Tarso."}</li>
    <li>${pt ? "Desenvolveu um sistema de FES acionado por interface cérebro–computador (Nebula): 2 canais de EEG, banda β ~21 Hz, acionamento < 250 ms, 43,3% das janelas em concentração motora." : "Developed a brain–computer-interface-triggered FES system (Nebula): 2 EEG channels, ~21 Hz β band, < 250 ms trigger, 43.3% of windows in motor concentration."}</li>
    <li>${pt ? "Product owner e desenvolvedor do SOMA, sistema de gestão da equipe: 31 módulos, ~143 tabelas PostgreSQL com RLS, ~4.180 asserções de teste, 54 PRs." : "Product owner and developer of SOMA, the team's management system: 31 modules, ~143 PostgreSQL tables with RLS, ~4,180 test assertions, 54 PRs."}</li>
    <li>${pt ? "Abbott (Structural Heart): andon em software sobre infraestrutura existente, mais de US$11 mil evitados em instalação; matriz de competências Lean Six Sigma em Power BI." : "Abbott (Structural Heart): software andon on existing infrastructure, more than US$11k in installation avoided; Lean Six Sigma skills matrix in Power BI."}</li>
    <li>${pt ? "Team manager da equipe de FES Bike da UFMG no Cybathlon 2024 em Zurique (67 equipes, 24 países): equipe, recursos, logística, FMEA." : "Team manager of UFMG's FES Bike team at Cybathlon 2024 in Zurich (67 teams, 24 countries): team, funding, logistics, FMEA."}</li>
  </ul>

  <h2>${pt ? "Experiência e projetos" : "Experience and projects"}</h2>
  ${exp}

  <h2>${L(ui.education)}</h2>
  <ul>${resume.education.map((ed) => `<li><b>${L(ed.degree)}</b> — ${L(ed.school)} (${L(ed.when)})</li>`).join("")}</ul>

  <h2>${L(ui.skills)}</h2>
  <ul>${resume.skills.map((s) => `<li><b>${L(s.cat)}:</b> ${L(s.val)}</li>`).join("")}</ul>

  <h2>${L(ui.languages)}</h2>
  <ul>${resume.languages.map((x) => `<li>${L(x.name)} — ${L(x.level)}</li>`).join("")}</ul>

  <h2>${L(ui.leadership)}</h2>
  <ul>${resume.leadership.map((x) => `<li>${L(x.role)}, ${L(resume.leadershipNote)} (${L(x.when)})</li>`).join("")}</ul>

  <h2>${L(ui.courses)}</h2>
  <ul>${resume.courses.map((c) => `<li>${L(c.name)} — ${L(c.by)}</li>`).join("")}</ul>
</body>
</html>
`;
}

function llms() {
  return `# ${person.fullName} (${person.name})

> ${strip(person.headline.en)}

This site is a résumé plus portfolio. Machine-readable versions:

- [Résumé in Markdown (English)](${person.site}/cv/en.md)
- [Currículo em Markdown (português)](${person.site}/cv/pt.md)
- [Résumé PDF (English)](${person.site}/cv/matheus-marcondes-cv-en.pdf)
- [Currículo PDF (português)](${person.site}/cv/matheus-marcondes-cv-pt.pdf)

## Experience pages

${experiences.map((e) => `- [${strip(e.org)}](${person.site}/${e.slug}/): ${strip(e.role.en)}`).join("\n")}

## Project pages

${projectOrder.map((o) => `- [${strip(nameOf(projects[o.slug]).en)}](${person.site}/${o.exp}/${o.slug}/): ${strip(projects[o.slug].card.en)}`).join("\n")}

## Contact

- Email: ${person.email}
${person.links.map((k) => `- ${k.label}: ${k.href}`).join("\n")}
`;
}

function sitemap() {
  const urls = ["", ...experiences.map((e) => `${e.slug}/`), ...projectOrder.map((o) => `${o.exp}/${o.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${person.site}/${u}</loc></url>`).join("\n")}
</urlset>
`;
}

function review() {
  const lines = ["# O que revisar", "", "Tudo o que eu supus, inventei ou não consegui confirmar está listado aqui, por página. O conteúdo fica em `src/content/` — edite lá e rode `node src/build.mjs` (e `node src/pdf.mjs` para os PDFs).", ""];
  lines.push("## Geral", "",
    "- Datas aproximadas em várias experiências (veja abaixo). A data de hoje usada nas linhas do tempo é " + NOW + " (`NOW` em `src/content/site.mjs`).",
    "- Os gráficos marcados como \"dados ilustrativos\" na página não são dados reais — substitua quando tiver os números.",
    "- O texto do currículo na página inicial foi mantido; só a linha da Abbott sobre o andon foi atualizada com os US$11 mil.",
    "- Não consegui abrir o ascii-magic.com daqui (o domínio não resolveu na rede deste ambiente). As animações seguem a linguagem ASCII clássica: rampas de densidade, arte de linha `_.-'`, caracteres de bloco.",
    "- Os PDFs (`cv/*.pdf`) saem de `cv/en.html` e `cv/pt.html` com `node src/pdf.mjs` (Playwright + Chromium + pypdf). Rode depois de mudar o conteúdo.",
    "");
  experiences.forEach((e) => {
    lines.push(`## ${strip(e.org)}`, "");
    if (e.slug === "abbott") lines.push("- Início do estágio: coloquei ago/2025.");
    if (e.slug === "leb-labbio") lines.push("- Início: mar/2023 (entrada na UFMG).");
    if (e.slug === "cefet") lines.push("- Curso: fev/2019 → dez/2022.");
    e.projects.forEach((slug) => (projects[slug].review || []).forEach((r) => lines.push(`- ${r}`)));
    lines.push("");
  });
  return lines.join("\n");
}

/* ---------- write everything ---------- */
write("index.html", home());
experiences.forEach((e) => write(`${e.slug}/index.html`, experiencePage(e)));
projectOrder.forEach((o, i) => write(`${o.exp}/${o.slug}/index.html`, projectPage(o.slug, i)));
LANGS.forEach((l) => { write(`cv/${l}.md`, md(l)); write(`cv/${l}.html`, printPage(l)); });
write("llms.txt", llms());
write("sitemap.xml", sitemap());
write("REVIEW.md", review());
if (!existsSync(join(ROOT, ".nojekyll"))) write(".nojekyll", "");
console.log(`built: 1 résumé, ${experiences.length} experiences, ${projectOrder.length} projects`);
