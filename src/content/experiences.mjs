// Experience pages, in résumé order. `projects` is the gallery order; sizes on
// each project are chosen so the three-column grid packs without holes.

export const experiences = [
  {
    slug: "neurodynamics",
    org: "NeuroDynamics",
    role: { en: "Founder &amp; Head", pt: "Fundador e Diretor" },
    place: { en: "UFMG School of Engineering", pt: "Escola de Engenharia da UFMG" },
    from: "2024-11", to: null,
    url: "https://neurodynamics.dev/",
    color: "indigo",
    summary: {
      en: "A multidisciplinary student healthtech R&amp;D initiative I founded and structured under a corporate-style model, with agile methods and a focus on user-centered, clinically applicable solutions.",
      pt: "Uma iniciativa estudantil multidisciplinar de P&amp;D em healthtech que fundei e estruturei em modelo corporativo, com métodos ágeis e foco em soluções centradas no usuário e aplicáveis na clínica."
    },
    bullets: {
      en: [
        "Built it from the ground up — statute, org chart, brand, and governance — creating a space where engineering, healthcare, and applied research work side by side on assistive health technologies.",
        "Lead a team of ~40 across six active projects and five departments, working with external academic and clinical research groups (including ETH Zürich, InCor-USP, and IMREA-USP).",
        "Set up ISO 9001-aligned documentation, KPIs, and an R&amp;D quality framework mapped to ISO 13485, ISO 14971, IEC 62304, and ANVISA RDC 751/2022 — DHF templates, a risk-management matrix, and test reports.",
        "Introduced project tracking in GitHub Projects with bi-weekly sprints, cutting feature delivery from months to weeks.",
        "Supported projects spanning brain–computer interfaces, FES, and wearables — including Órion (FES-cycling) and Arabella (AI-assisted diagnostics) — and coordinated our participation in Cybathlon 2024 (Switzerland)."
      ],
      pt: [
        "Construí do zero — estatuto, organograma, marca e governança — um espaço onde engenharia, saúde e pesquisa aplicada trabalham lado a lado em tecnologias assistivas.",
        "Lidero uma equipe de ~40 pessoas em seis projetos ativos e cinco departamentos, com grupos acadêmicos e clínicos externos (incluindo ETH Zürich, InCor-USP e IMREA-USP).",
        "Implantei documentação alinhada à ISO 9001, KPIs e um framework de qualidade de P&amp;D mapeado para ISO 13485, ISO 14971, IEC 62304 e ANVISA RDC 751/2022 — templates de DHF, matriz de gestão de riscos e relatórios de teste.",
        "Introduzi o acompanhamento de projetos no GitHub Projects com sprints quinzenais, reduzindo a entrega de funcionalidades de meses para semanas.",
        "Apoiei projetos em interfaces cérebro–computador, FES e vestíveis — incluindo Órion (FES-cycling) e Arabella (diagnóstico assistido por IA) — e coordenei nossa participação no Cybathlon 2024 (Suíça)."
      ]
    },
    intro: {
      en: "I created NeuroDynamics in November 2024 to give a home to more healthtech projects than one lab could carry — and to open them to undergraduates. Since then I've directed it, built its systems, and managed its projects myself when they needed it.",
      pt: "Criei a NeuroDynamics em novembro de 2024 para dar casa a mais projetos de healthtech do que um laboratório conseguia carregar — e abri-los para alunos de graduação. Desde então eu a dirijo, construí seus sistemas e gerenciei pessoalmente os projetos quando foi preciso."
    },
    metrics: [
      { value: 40, prefix: "~", label: { en: "members", pt: "membros" }, color: "indigo" },
      { value: 9, label: { en: "projects in the portfolio", pt: "projetos no portfólio" }, color: "violet" },
      { value: 5, label: { en: "departments", pt: "departamentos" }, color: "blue" },
      { value: 6, label: { en: "partners", pt: "parceiros" }, color: "lime" }
    ],
    timeline: ["direction", "founding", "nebula", "soma", "calima", "opalina"],
    projects: ["opalina", "soma", "nebula", "calima", "direction", "founding"]
  },
  {
    slug: "abbott",
    org: "Abbott Laboratories",
    role: { en: "Continuous Improvement Intern", pt: "Estagiário de Melhoria Contínua" },
    place: { en: "Structural Heart Division, Medical Devices", pt: "Divisão Structural Heart, Dispositivos Médicos" },
    from: "2025-08", to: null,
    url: "https://www.abbott.com/en-us/homepage",
    color: "violet",
    summary: {
      en: "Support process optimization and operational excellence in a highly regulated medical-device manufacturing environment, applying lean methods and data analysis.",
      pt: "Apoio a otimização de processos e a excelência operacional em um ambiente de manufatura de dispositivos médicos altamente regulado, aplicando métodos lean e análise de dados."
    },
    bullets: {
      en: [
        "Assessed core operational-excellence mechanisms — daily management, tiered meetings, 4P assessment, and the Shingo Model — to strengthen continuous-improvement maturity across the site.",
        "Built a software andon on existing infrastructure that avoided more than US$11k in automation hardware, cutting motion and time waste on the floor and lowering particle-generation risk in cleanroom areas.",
        "Created BI and performance tooling for data-informed decisions, including a Power BI Lean Six Sigma skills matrix and an Excel workload-control system for inspection teams."
      ],
      pt: [
        "Avaliei mecanismos centrais de excelência operacional — gestão diária, reuniões por tiers, avaliação 4P e Modelo Shingo — para fortalecer a maturidade de melhoria contínua no site.",
        "Construí um andon em software sobre a infraestrutura existente, evitando mais de US$11 mil em hardware de automação, reduzindo desperdício de movimentação e tempo e o risco de geração de particulado em salas limpas.",
        "Criei ferramentas de BI e desempenho para decisões baseadas em dados, incluindo uma matriz de competências Lean Six Sigma em Power BI e um controle de carga de trabalho em Excel para equipes de inspeção."
      ]
    },
    intro: {
      en: "At Abbott I learn what operational excellence looks like up close — and try to give back tools that make problems visible and cheap to solve.",
      pt: "Na Abbott eu aprendo de perto como é a excelência operacional — e tento devolver ferramentas que tornem os problemas visíveis e baratos de resolver."
    },
    metrics: [
      { value: 11, prefix: "US$", suffix: "k+", label: { en: "soft savings from the andon", pt: "de soft savings com o andon" }, color: "violet" },
      { value: 4, label: { en: "meeting tiers supported", pt: "tiers de reunião apoiados" }, color: "blue" },
      { value: 3, label: { en: "tools built · andon, skills matrix, workload control", pt: "ferramentas · andon, matriz, controle de carga" }, color: "lime" }
    ],
    timeline: ["visual", "andon"],
    projects: ["andon", "visual"]
  },
  {
    slug: "leb-labbio",
    org: "LEB &amp; LABBIO",
    role: { en: "Undergraduate Researcher", pt: "Pesquisador de Graduação" },
    place: { en: "UFMG", pt: "UFMG" },
    from: "2023-03", to: null,
    url: "https://www.labbioufmg.org/",
    color: "lime",
    summary: {
      en: "Contribute to applied research in biomedical and assistive technologies, supporting design, development, and experimental validation. Work has spanned functional electrical stimulation and brain–computer interfaces for motor rehabilitation, and the biomechanics of lower-limb prosthetics and orthoses.",
      pt: "Contribuo com pesquisa aplicada em tecnologias biomédicas e assistivas, apoiando projeto, desenvolvimento e validação experimental. O trabalho passou por estimulação elétrica funcional e interfaces cérebro–computador para reabilitação motora, e pela biomecânica de próteses e órteses de membro inferior."
    },
    intro: {
      en: "The Biomedical Engineering Laboratory (LEB) and the Bioengineering Laboratory (LABBIO) at UFMG are where I started — first taking a team to Cybathlon, then planning the work that grew into NeuroDynamics.",
      pt: "O Laboratório de Engenharia Biomédica (LEB) e o Laboratório de Bioengenharia (LABBIO) da UFMG são onde comecei — primeiro levando uma equipe ao Cybathlon, depois planejando o trabalho que virou a NeuroDynamics."
    },
    metrics: [
      { value: 67, label: { en: "teams we raced against in Zurich", pt: "equipes contra quem corremos em Zurique" }, color: "lime" },
      { value: 24, label: { en: "countries at Cybathlon 2024", pt: "países no Cybathlon 2024" }, color: "indigo" },
      { value: 1, label: { en: "student R&amp;D group spun out", pt: "grupo estudantil de P&amp;D criado" }, color: "violet" }
    ],
    timeline: ["cybathlon", "finep"],
    projects: ["cybathlon", "finep"]
  },
  {
    slug: "cefet",
    org: "CEFET-MG",
    role: { en: "Technical Diploma in Mechatronics", pt: "Técnico em Mecatrônica" },
    place: { en: "Belo Horizonte", pt: "Belo Horizonte" },
    from: "2019-02", to: "2022-12",
    url: "https://www.cefetmg.br/",
    color: "violet",
    education: true,
    summary: {
      en: "Technical high-school diploma in Mechatronics at the Federal Center for Technological Education of Minas Gerais — where the question about technology reaching people started, with a final project on prosthetic feet.",
      pt: "Curso técnico integrado em Mecatrônica no Centro Federal de Educação Tecnológica de Minas Gerais — onde começou a pergunta sobre tecnologia chegando às pessoas, com um TCC sobre pés protéticos."
    },
    intro: {
      en: "Four years of mechatronics — mechanics, electronics, control and programming — closed with a final project on the biomechanics of lower-limb prostheses.",
      pt: "Quatro anos de mecatrônica — mecânica, eletrônica, controle e programação — fechados com um TCC sobre a biomecânica de próteses de membro inferior."
    },
    metrics: [
      { value: 4, suffix: { en: "yr", pt: "anos" }, label: { en: "technical course", pt: "de curso técnico" }, color: "violet" },
      { value: 34, label: { en: "studies reviewed for the TCC", pt: "estudos revisados no TCC" }, color: "indigo" },
      { value: 3, label: { en: "prosthetic-foot designs compared", pt: "projetos de pé protético comparados" }, color: "lime" }
    ],
    timeline: ["tcc"],
    extraRows: [{ id: "course", label: { en: "Mechatronics course", pt: "Curso de Mecatrônica" }, from: "2019-02", to: "2022-12", color: "indigo" }],
    projects: ["tcc"]
  }
];
