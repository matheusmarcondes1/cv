// Person, résumé blocks, interface strings and the tool icon set.
// Every user-facing string is { en, pt } and may carry inline HTML.

export const NOW = "2026-10";

export const person = {
  name: "Matheus Marcondes",
  fullName: "Matheus Marcondes de Oliveira",
  site: "https://marcondes.dev",
  siteLabel: "marcondes.dev",
  email: "matheus@marcondes.dev",
  phone: "+55 (31) 98495-0000",
  tel: "+5531984950000",
  location: { en: "Belo Horizonte, Brazil", pt: "Belo Horizonte, Brasil" },
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/matheus-marcondes/" },
    { label: "GitHub", href: "https://github.com/matheusmarcondes1" },
    { label: "ORCID", href: "https://orcid.org/0009-0004-8475-1406" },
    { label: "Lattes", href: "http://lattes.cnpq.br/9754941348911900" }
  ],
  headline: {
    en: "Control & Automation Engineering student at UFMG building health technology — founder of NeuroDynamics, continuous-improvement intern at Abbott.",
    pt: "Estudante de Engenharia de Controle e Automação na UFMG construindo tecnologia em saúde — fundador da NeuroDynamics, estagiário de melhoria contínua na Abbott."
  },
  description: {
    en: "Matheus Marcondes — Control & Automation Engineering student at UFMG, working in HealthTech and medical-device R&D. Founder of NeuroDynamics; Continuous Improvement Intern at Abbott.",
    pt: "Matheus Marcondes — estudante de Engenharia de Controle e Automação na UFMG, atuando em HealthTech e P&D de dispositivos médicos. Fundador da NeuroDynamics; estagiário de Melhoria Contínua na Abbott."
  },
  question: {
    en: "how does a piece of technology actually reach the person who needs it?",
    pt: "como uma tecnologia realmente chega à pessoa que precisa dela?"
  },
  about: {
    en: `I'm an undergraduate in Control and Automation Engineering at UFMG, and since 2019 I've kept
        circling one question: <span class="q">how does a piece of technology actually reach the person who needs it?</span>
        That thread runs through the work I care about most — prosthetics and orthoses, neuromodulation,
        functional electrical stimulation, and brain–computer interfaces — and it's taught me to value
        verification, risk, and regulatory rigor as much as the idea itself. I started NeuroDynamics, a
        student healthtech R&amp;D group now around 40 people, because I wanted engineering and healthcare
        in the same room; lately I've been learning what operational excellence looks like up close as a
        continuous-improvement intern at Abbott. I'm early in all of this, and I try to stay honest about
        what I know and what I'm still figuring out — but I show up, I follow through, and I care more
        about building something genuinely useful than something merely impressive.`,
    pt: `Sou graduando em Engenharia de Controle e Automação na UFMG e, desde 2019, venho rodeando uma
        pergunta: <span class="q">como uma tecnologia realmente chega à pessoa que precisa dela?</span>
        Esse fio atravessa o trabalho de que mais gosto — próteses e órteses, neuromodulação,
        estimulação elétrica funcional e interfaces cérebro–computador — e me ensinou a valorizar
        verificação, risco e rigor regulatório tanto quanto a ideia em si. Criei a NeuroDynamics, um grupo
        estudantil de P&amp;D em healthtech que hoje reúne cerca de 40 pessoas, porque queria engenharia e
        saúde na mesma sala; nos últimos tempos tenho aprendido de perto como é a excelência operacional,
        como estagiário de melhoria contínua na Abbott. Estou no começo de tudo isso e tento ser honesto
        sobre o que sei e o que ainda estou descobrindo — mas eu apareço, levo as coisas até o fim e me
        importo mais em construir algo realmente útil do que algo apenas impressionante.`
  }
};

export const resume = {
  education: [
    {
      degree: { en: "B.Eng. Control &amp; Automation Engineering", pt: "Engenharia de Controle e Automação" },
      school: { en: "Federal University of Minas Gerais (UFMG)", pt: "Universidade Federal de Minas Gerais (UFMG)" },
      href: "https://ufmg.br/",
      when: { en: "Expected 2028", pt: "Previsão 2028" }
    },
    {
      degree: { en: "Technical Diploma in Mechatronics", pt: "Técnico em Mecatrônica" },
      school: { en: "Federal Center for Technological Education (CEFET-MG)", pt: "Centro Federal de Educação Tecnológica (CEFET-MG)" },
      href: "https://www.cefetmg.br/",
      when: { en: "2022 · final project on prosthetic feet", pt: "2022 · TCC sobre pés protéticos" },
      page: "cefet"
    }
  ],
  skills: [
    { cat: { en: "Medical Device Development", pt: "Desenvolvimento de Dispositivos Médicos" }, val: { en: "R&amp;D, design, verification &amp; validation, clinical research, regulatory", pt: "P&amp;D, projeto, verificação e validação, pesquisa clínica, regulatório" } },
    { cat: { en: "Quality &amp; Regulatory", pt: "Qualidade e Regulatório" }, val: { en: "ISO 13485, ISO 14971, IEC 62304, ISO 9001, ANVISA RDC 751/2022", pt: "ISO 13485, ISO 14971, IEC 62304, ISO 9001, ANVISA RDC 751/2022" } },
    { cat: { en: "Operational Excellence", pt: "Excelência Operacional" }, val: { en: "Lean Six Sigma, Shingo Model, 4P assessment, daily &amp; tiered management", pt: "Lean Six Sigma, Modelo Shingo, avaliação 4P, gestão diária e por tiers" } },
    { cat: { en: "Technical Domains", pt: "Domínios Técnicos" }, val: { en: "Neuromodulation, FES, brain–computer interfaces, prosthetics &amp; orthoses, wearables", pt: "Neuromodulação, FES, interfaces cérebro–computador, próteses e órteses, vestíveis" } },
    { cat: { en: "Project &amp; Data", pt: "Projetos e Dados" }, val: { en: "Agile / GitHub Projects, KPIs, Power BI, Excel, data analysis", pt: "Ágil / GitHub Projects, KPIs, Power BI, Excel, análise de dados" } }
  ],
  languages: [
    { name: { en: "Portuguese", pt: "Português" }, level: { en: "native", pt: "nativo" } },
    { name: { en: "English", pt: "Inglês" }, level: { en: "professional (B2)", pt: "profissional (B2)" } }
  ],
  leadership: [
    { role: { en: "Member, Project Council", pt: "Membro, Conselho de Projetos" }, when: { en: "2025 – Present", pt: "2025 – Atual" } },
    { role: { en: "Member, Congregation", pt: "Membro, Congregação" }, when: { en: "2024 – 2025", pt: "2024 – 2025" } }
  ],
  leadershipNote: { en: "UFMG School of Engineering", pt: "Escola de Engenharia da UFMG" },
  courses: [
    { name: "McKinsey Forward", by: "McKinsey &amp; Company" },
    { name: "RTL Digital Design", by: { en: "Cadence (CADEMICS, 2024)", pt: "Cadence (CADEMICS, 2024)" } },
    { name: { en: "Research Methodology", pt: "Metodologia de Pesquisa" }, by: { en: "University of São Paulo (USP)", pt: "Universidade de São Paulo (USP)" } },
    { name: { en: "English B2 (CEFR)", pt: "Inglês B2 (CEFR)" }, by: "Cambridge Assessment" }
  ]
};

export const ui = {
  about: { en: "About", pt: "Sobre" },
  education: { en: "Education", pt: "Formação" },
  skills: { en: "Skills", pt: "Habilidades" },
  languages: { en: "Languages", pt: "Idiomas" },
  leadership: { en: "Leadership &amp; Governance", pt: "Liderança e Governança" },
  experience: { en: "Experience", pt: "Experiência" },
  courses: { en: "Courses &amp; Certifications", pt: "Cursos e Certificações" },
  seeProjects: { en: "projects", pt: "projetos" },
  resume: { en: "Résumé", pt: "Currículo" },
  links: { en: "Links", pt: "Links" },
  openLinks: { en: "Open links", pt: "Abrir links" },
  language: { en: "Language", pt: "Idioma" },
  pdf: { en: "PDF", pt: "PDF" },
  pdfLong: { en: "Download PDF résumé", pt: "Baixar currículo em PDF" },
  tour: { en: "Tour", pt: "Tour" },
  tourLong: { en: "Start the tour", pt: "Iniciar o tour" },
  timeline: { en: "Timeline", pt: "Linha do tempo" },
  projects: { en: "Projects", pt: "Projetos" },
  numbers: { en: "By the numbers", pt: "Em números" },
  how: { en: "How it works", pt: "Como funciona" },
  what: { en: "What it is", pt: "O que é" },
  contribution: { en: "My contribution", pt: "Minha contribuição" },
  why: { en: "Why it matters", pt: "Por que importa" },
  tools: { en: "Skills &amp; tools", pt: "Habilidades e ferramentas" },
  toolsLabel: { en: "Tools", pt: "Ferramentas" },
  skillsLabel: { en: "Skills", pt: "Habilidades" },
  charts: { en: "Data", pt: "Dados" },
  next: { en: "Next project", pt: "Próximo projeto" },
  prev: { en: "Previous project", pt: "Projeto anterior" },
  backTo: { en: "Back to", pt: "Voltar para" },
  illustrative: { en: "illustrative data", pt: "dados ilustrativos" },
  ongoing: { en: "ongoing", pt: "em andamento" },
  present: { en: "present", pt: "atual" },
  visit: { en: "Website", pt: "Site" },
  more: { en: "Other experiences", pt: "Outras experiências" },
  skip: { en: "Skip to content", pt: "Pular para o conteúdo" },
  play: { en: "Play", pt: "Reproduzir" },
  pause: { en: "Pause", pt: "Pausar" },
  open: { en: "Open project", pt: "Abrir projeto" },
  months: { en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] }
};

// Tool chips: a five-character ASCII glyph in a small frame, colored by family
// (languages indigo, hardware lime, data blue, method violet).
export const tools = {
  matlab: { name: "MATLAB", g: "/\\_/\\", c: "indigo" },
  simulink: { name: "Simulink", g: "[]->[", c: "indigo" },
  python: { name: "Python", g: ">>> _", c: "indigo" },
  numpy: { name: "NumPy / SciPy", short: "NumPy", g: "[::] ", c: "indigo" },
  brainflow: { name: "BrainFlow", g: "~^v~^", c: "indigo" },
  js: { name: "JavaScript", g: "{ js}", c: "indigo" },
  ts: { name: "TypeScript", g: "<ts> ", c: "indigo" },
  html: { name: "HTML / CSS", g: " </> ", c: "indigo" },
  sql: { name: "PostgreSQL", g: "[pg] ", c: "blue" },
  supabase: { name: "Supabase", g: " |>/ ", c: "blue" },
  deno: { name: "Deno Edge Functions", short: "Deno", g: " (d) ", c: "blue" },
  playwright: { name: "Playwright", g: ">_ ok", c: "blue" },
  git: { name: "Git", g: "o-o-<", c: "violet" },
  github: { name: "GitHub · Projects", short: "GitHub", g: "[|||]", c: "violet" },
  claude: { name: "Claude Code (AI pair-programming)", short: "Claude Code", g: " *AI*", c: "violet" },
  pdf: { name: "jsPDF · pdf-lib", short: "jsPDF", g: "[pdf]", c: "blue" },
  pwa: { name: "PWA · Web Push", short: "PWA", g: "((o))", c: "blue" },
  powerbi: { name: "Power BI", g: "_.:|#", c: "blue" },
  excel: { name: "Excel", g: "#|#|#", c: "blue" },
  powerapps: { name: "Power Apps", g: "[_|_]", c: "blue" },
  powerautomate: { name: "Power Automate", g: ">>-o>", c: "blue" },
  sharepoint: { name: "SharePoint", g: "(S)=:", c: "blue" },
  pubmed: { name: "PubMed", g: "PMID>", c: "violet" },
  zotero: { name: "Zotero", g: "[ref]", c: "violet" },
  latex: { name: "LaTeX", g: "\\TeX ", c: "violet" },
  openbci: { name: "OpenBCI Ganglion", short: "OpenBCI", g: "~/\\/~", c: "lime" },
  ble: { name: "Bluetooth LE", short: "BLE", g: " ))) ", c: "lime" },
  fes: { name: "FES stimulators (ReCARE®, Connect®)", short: "FES", g: "_/\\/\\", c: "lime" },
  imu: { name: "IMU · inertial sensing", short: "IMU", g: "x,y,z", c: "lime" },
  esp32: { name: "Embedded (ESP32 / Arduino)", short: "ESP32", g: "[::]=", c: "lime" },
  relay: { name: "Smart relay", short: "Relay", g: "-/ o-", c: "lime" },
  flow: { name: "Flow sensing", short: "Flow sensing", g: "~>~>~", c: "lime" },
  cad: { name: "CAD (SolidWorks)", short: "CAD", g: "/_\\|_", c: "lime" },
  fmea: { name: "FMEA", g: "SxOxD", c: "violet" },
  iso14971: { name: "ISO 14971 risk management", short: "ISO 14971", g: " /!\\ ", c: "violet" },
  iso13485: { name: "ISO 13485 · ISO 9001", short: "ISO 13485", g: "[ISO]", c: "violet" },
  gantt: { name: "Gantt · WBS", short: "Gantt · WBS", g: "== = ", c: "violet" },
  lean: { name: "Lean · A3 · PDCA", short: "Lean", g: "PDCA>", c: "violet" },
  notion: { name: "Notion", g: "[N] ", c: "violet" },
  canva: { name: "Canva · Figma", short: "Canva", g: "(o)/ ", c: "violet" }
};
