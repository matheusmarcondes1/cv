// Renders cv/en.html and cv/pt.html to PDF with Chromium (via Playwright),
// then stamps document metadata with src/pdfmeta.py.
//   node src/build.mjs && node src/pdf.mjs
// The PDFs are tagged (structure tree for screen readers and parsers), carry a
// bookmark outline from the headings, and keep a single reading column with
// real text, so both people and language models read them in order.

import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = createRequire("/opt/node22/lib/node_modules/")("playwright")); }

const META = {
  en: { title: "Matheus Marcondes de Oliveira — Résumé", subject: "Résumé and project portfolio: medical-device R&D, FES, brain–computer interfaces, operational excellence.", lang: "en" },
  pt: { title: "Matheus Marcondes de Oliveira — Currículo", subject: "Currículo e portfólio de projetos: P&D de dispositivos médicos, FES, interfaces cérebro–computador, excelência operacional.", lang: "pt-BR" }
};
const KEYWORDS = "Matheus Marcondes; NeuroDynamics; UFMG; Abbott; medical devices; FES; functional electrical stimulation; brain-computer interface; BCI; EEG; ISO 13485; ISO 14971; project management; Lean Six Sigma; Power BI; Supabase; PostgreSQL";

const browser = await chromium.launch();
for (const l of ["en", "pt"]) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(join(ROOT, "cv", `${l}.html`)).href, { waitUntil: "load" });
  const out = join(ROOT, "cv", `matheus-marcondes-cv-${l}.pdf`);
  await page.pdf({ path: out, format: "A4", printBackground: false, tagged: true, outline: true, preferCSSPageSize: true });
  execFileSync("python3", ["-I", join(ROOT, "src", "pdfmeta.py"), out, META[l].title, META[l].subject, KEYWORDS, META[l].lang], { stdio: "inherit" });
  console.log("pdf:", out);
  await page.close();
}
await browser.close();
