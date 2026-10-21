// The tour: a short personal pitch. Each step names an ASCII shape (drawn in
// assets/tour.js) that the particles morph into, and a year for the ruler.

export const tour = {
  ui: {
    close: { en: "Close tour", pt: "Fechar tour" },
    next: { en: "Next", pt: "Próximo" },
    prev: { en: "Previous", pt: "Anterior" },
    pause: { en: "Pause", pt: "Pausar" },
    play: { en: "Play", pt: "Reproduzir" },
    hint: { en: "← → to move · space to pause · esc to leave", pt: "← → para navegar · espaço pausa · esc para sair" }
  },
  steps: [
    {
      shape: "dot", year: 2026,
      kicker: { en: "A two-minute pitch", pt: "Um pitch de dois minutos" },
      title: { en: "Hi, I'm Matheus.", pt: "Oi, eu sou o Matheus." },
      body: { en: "Control & Automation Engineering student at UFMG. I build health technology — and the teams that make it reach people.", pt: "Estudante de Engenharia de Controle e Automação na UFMG. Construo tecnologia em saúde — e as equipes que fazem ela chegar às pessoas." }
    },
    {
      shape: "question", year: 2019,
      kicker: { en: "The question", pt: "A pergunta" },
      title: { en: "How does technology actually reach the person who needs it?", pt: "Como a tecnologia realmente chega a quem precisa dela?" },
      body: { en: "I've been circling it since 2019 — through prosthetics, neuromodulation, FES and brain–computer interfaces.", pt: "Venho rodeando essa pergunta desde 2019 — passando por próteses, neuromodulação, FES e interfaces cérebro–computador." }
    },
    {
      shape: "leg", year: 2022, href: "cefet/tcc/",
      kicker: { en: "2019 – 2022 · CEFET-MG", pt: "2019 – 2022 · CEFET-MG" },
      title: { en: "It started with a foot.", pt: "Começou com um pé." },
      body: { en: "My final project compared prosthetic feet — SACH, single-axis, energy-storing — with a PubMed review and a MATLAB gait model.", pt: "Meu TCC comparou pés protéticos — SACH, eixo simples, com restituição de energia — com revisão no PubMed e um modelo de marcha em MATLAB." }
    },
    {
      shape: "trike", year: 2024, href: "leb-labbio/cybathlon/",
      kicker: { en: "2023 – 2024 · LEB & LABBIO", pt: "2023 – 2024 · LEB e LABBIO" },
      title: { en: "Then a race with no motor.", pt: "Depois, uma corrida sem motor." },
      body: { en: "I built a team, revived a stalled FES trike, raised the funds and took it to Cybathlon 2024 in Zurich — 67 teams, 24 countries.", pt: "Montei uma equipe, reativei um triciclo de FES parado, captei recursos e levei tudo ao Cybathlon 2024 em Zurique — 67 equipes, 24 países." },
      stats: [{ v: "67", l: { en: "teams", pt: "equipes" } }, { v: "24", l: { en: "countries", pt: "países" } }]
    },
    {
      shape: "network", year: 2025, href: "neurodynamics/founding/",
      kicker: { en: "November 2024", pt: "Novembro de 2024" },
      title: { en: "More work than one lab could carry.", pt: "Mais trabalho do que um laboratório conseguia carregar." },
      body: { en: "So I founded NeuroDynamics — a student healthtech R&D group run like a company, with clinical and industry partners.", pt: "Então fundei a NeuroDynamics — um grupo estudantil de P&D em healthtech que funciona como empresa, com parceiros clínicos e da indústria." },
      stats: [{ v: "~40", l: { en: "people", pt: "pessoas" } }, { v: "9", l: { en: "projects", pt: "projetos" } }, { v: "5", l: { en: "departments", pt: "departamentos" } }]
    },
    {
      shape: "brain", year: 2025, href: "neurodynamics/nebula/",
      kicker: { en: "2025 · Nebula", pt: "2025 · Nebula" },
      title: { en: "A moment of focus can move a leg.", pt: "Um instante de concentração pode mover uma perna." },
      body: { en: "I built a brain–computer interface that reads β waves from two EEG channels and switches FES on in under 250 ms.", pt: "Construí uma interface cérebro–computador que lê ondas β em dois canais de EEG e liga a FES em menos de 250 ms." },
      stats: [{ v: "43.3%", l: { en: "windows in motor focus", pt: "janelas em foco motor" } }, { v: "<250ms", l: { en: "trigger", pt: "acionamento" } }]
    },
    {
      shape: "lungs", year: 2026, href: "neurodynamics/opalina/",
      kicker: { en: "2025 – now · Calima, Opalina, SOMA", pt: "2025 – hoje · Calima, Opalina, SOMA" },
      title: { en: "From the bike to the ICU bed.", pt: "Da bicicleta ao leito de UTI." },
      body: { en: "As project manager I took Calima (FES-cycling with an IMU) and now Opalina (diaphragm pacing with the ventilator). And I build SOMA, the system the whole team runs on.", pt: "Como gerente de projeto conduzi o Calima (FES-cycling com IMU) e hoje o Opalina (estimulação do diafragma com o ventilador). E construo o SOMA, o sistema em que toda a equipe trabalha." },
      stats: [{ v: "31", l: { en: "SOMA modules", pt: "módulos no SOMA" } }, { v: "4,180", l: { en: "test assertions", pt: "asserções de teste" } }]
    },
    {
      shape: "andon", year: 2026, href: "abbott/andon/",
      kicker: { en: "2025 – now · Abbott", pt: "2025 – hoje · Abbott" },
      title: { en: "And how great operations work.", pt: "E como funciona uma operação de ponta." },
      body: { en: "A software andon on the line's existing infrastructure: more than US$11k avoided, less walking, fewer particles in the cleanroom.", pt: "Um andon em software sobre a infraestrutura existente da linha: mais de US$11 mil evitados, menos deslocamento, menos partículas na sala limpa." },
      stats: [{ v: "US$11k+", l: { en: "avoided", pt: "evitados" } }, { v: "0", l: { en: "new hardware", pt: "hardware novo" } }]
    },
    {
      shape: "stars", year: 2026,
      kicker: { en: "What I bring", pt: "O que eu trago" },
      title: { en: "Engineering, rigor and follow-through.", pt: "Engenharia, rigor e entrega." },
      body: { en: "Medical-device R&D · ISO 13485 & 14971 · FES and BCI · Lean & BI · product, projects and teams.", pt: "P&D de dispositivos médicos · ISO 13485 e 14971 · FES e BCI · Lean e BI · produto, projetos e equipes." }
    },
    {
      shape: "shark", year: 2026, final: true,
      kicker: { en: "Let's talk", pt: "Vamos conversar" },
      title: { en: "Build something useful together?", pt: "Construir algo útil juntos?" },
      body: { en: "matheus@marcondes.dev", pt: "matheus@marcondes.dev" }
    }
  ]
};
