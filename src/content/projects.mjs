// Project one-pages. Dates are "YYYY-MM"; `to: null` means ongoing.
// `review` lists what Matheus still has to confirm (collected into REVIEW.md).

export const projects = {

  /* ------------------------------------------------------------------ NeuroDynamics */
  opalina: {
    exp: "neurodynamics", name: "Opalina", color: "violet", scene: "breath", size: "big",
    role: { en: "Project manager", pt: "Gerente de projeto" },
    from: "2026-03", to: null,
    status: { en: "In research · bench validation", pt: "Em pesquisa · validação em bancada" },
    tagline: {
      en: "Breathing is muscle work too: diaphragm stimulation synchronized with the ventilator, to keep critically ill patients able to breathe on their own.",
      pt: "Respirar também é músculo: estimulação do diafragma sincronizada com o ventilador, para que pacientes críticos continuem capazes de respirar sozinhos."
    },
    card: {
      en: "Phrenic-nerve stimulation timed to the ventilator's breath, to fight diaphragm atrophy and ease weaning.",
      pt: "Estimulação do nervo frênico no ritmo do ventilador, contra a atrofia do diafragma e para facilitar o desmame."
    },
    how: {
      title: { en: "Breathing is muscle work too.", pt: "Respirar também é músculo." },
      lede: {
        en: "When someone spends a long time on a ventilator, the diaphragm — the main breathing muscle — weakens, and breathing unaided again gets harder. Opalina activates that muscle with electrical stimuli at the right moment, following the ventilator's rhythm. The aim is not to replace the ventilator, but to help the body keep its natural function.",
        pt: "Quando uma pessoa passa muito tempo ligada a um ventilador, o diafragma — principal músculo da respiração — enfraquece, e voltar a respirar sozinho fica mais difícil. O Opalina ativa esse músculo com estímulos elétricos no momento certo, acompanhando o ritmo do ventilador. O objetivo não é substituir o ventilador, mas ajudar o corpo a manter sua função natural."
      },
      items: [
        { t: { en: "Flow sensor", pt: "Sensor de fluxo" }, d: { en: "Sits in the air circuit between the ventilator and the patient and detects when air is flowing in.", pt: "Fica no circuito de ar entre o ventilador e o paciente e percebe quando o ar está entrando." } },
        { t: { en: "ReCARE®", pt: "ReCARE®" }, d: { en: "Visuri's electrostimulator. Receives the sensor reading over BLE and only releases the stimulus while air flows in.", pt: "Eletroestimulador da Visuri. Recebe a leitura do sensor via BLE e só libera o estímulo enquanto o ar entra." } },
        { t: { en: "Neck electrodes", pt: "Eletrodos no pescoço" }, d: { en: "Placed over the path of the phrenic nerve, the nerve that controls the diaphragm.", pt: "Colados sobre o caminho do nervo frênico, o nervo que comanda o diafragma." } },
        { t: { en: "Diaphragm", pt: "Diafragma" }, d: { en: "Contracts with the ventilator's breath instead of staying idle.", pt: "Contrai junto com o ar do ventilador, em vez de ficar parado." } }
      ]
    },
    what: {
      en: [
        "Opalina is a diaphragm-stimulation system for critically ill, sedated patients on mechanical ventilation. Flow sensors in the breathing circuit identify inspiration and expiration in real time; the control logic switches stimulation of the phrenic nerve on while flow is positive and off during expiration, producing coordinated, physiologically meaningful contractions.",
        "The system combines embedded sensing, wireless communication (BLE), a real-time monitoring interface and fail-safe mechanisms, integrated with Visuri's ReCARE® stimulator. It is being validated on the bench first — flow and volume calibration, synchronization reliability — and then in a pre-clinical context, with InCor – HCFMUSP providing the clinical structure."
      ],
      pt: [
        "O Opalina é um sistema de eletroestimulação diafragmática para pacientes críticos, sedados e em ventilação mecânica. Sensores de fluxo no circuito respiratório identificam inspiração e expiração em tempo real; a lógica de controle liga a estimulação do nervo frênico enquanto o fluxo é positivo e a interrompe na expiração, produzindo contrações coordenadas e fisiologicamente relevantes.",
        "O sistema integra sensoriamento embarcado, comunicação sem fio (BLE), interface de monitoramento em tempo real e mecanismos de segurança (fail-safe), conectado ao eletroestimulador ReCARE® da Visuri. A validação começa em bancada — calibração de fluxo e volume, confiabilidade da sincronização — e segue para o contexto pré-clínico, com estrutura clínica do InCor – HCFMUSP."
      ]
    },
    contribution: {
      en: [
        "Project manager since March 2026: planning, sprint cadence, scope control and reporting for a team that mixes engineering and clinical people.",
        "Turned the nine specific objectives into a phased plan — flow sensing, ReCARE® integration, control logic, BLE embedded system, operator interface with fail-safe, therapeutic protocol, bench calibration and pre-clinical feasibility.",
        "Coordinate the partners: Visuri (ReCARE® platform and resources) and InCor – HCFMUSP (clinical structure and tests).",
        "Own the risk analysis for a device that acts on sedated patients: fail-safe and emergency-stop requirements, stimulation limits and the hazards of the ventilator interface.",
        "Supported the project's public communication, including the explanatory animation this page's scene is based on."
      ],
      pt: [
        "Gerente de projeto desde março de 2026: planejamento, cadência de sprints, controle de escopo e reporte para uma equipe que mistura engenharia e área clínica.",
        "Transformei os nove objetivos específicos em um plano por fases — sensoriamento de fluxo, integração com o ReCARE®, lógica de controle, sistema embarcado BLE, interface de operação com fail-safe, protocolo terapêutico, calibração em bancada e viabilidade pré-clínica.",
        "Coordeno os parceiros: Visuri (plataforma ReCARE® e recursos) e InCor – HCFMUSP (estrutura e testes clínicos).",
        "Sou responsável pela análise de risco de um dispositivo que atua em pacientes sedados: requisitos de fail-safe e parada de emergência, limites de estimulação e perigos da interface com o ventilador.",
        "Apoiei a comunicação pública do projeto, incluindo a animação explicativa em que a cena desta página se baseia."
      ]
    },
    why: {
      en: [
        "Prolonged passive ventilation lets the diaphragm waste away, which makes weaning long and extremely uncomfortable. Keeping the muscle active during ventilatory support preserves strength and neuromuscular coordination.",
        "If it works, Opalina can shorten time on mechanical ventilation, improve prognosis and reduce the complications of respiratory immobility — in the patients who can least help themselves."
      ],
      pt: [
        "A ventilação passiva prolongada deixa o diafragma atrofiar, o que torna o desmame longo e extremamente desconfortável. Manter o músculo ativo durante o suporte ventilatório preserva força e coordenação neuromuscular.",
        "Se funcionar, o Opalina pode reduzir o tempo de ventilação mecânica, melhorar o prognóstico e diminuir as complicações do imobilismo respiratório — justamente nos pacientes que menos conseguem se ajudar."
      ]
    },
    metrics: [
      { value: 9, label: { en: "specific objectives in the plan", pt: "objetivos específicos no plano" }, color: "violet" },
      { value: 3, label: { en: "partners · Visuri, InCor, NeuroDynamics", pt: "parceiros · Visuri, InCor, NeuroDynamics" }, color: "indigo" },
      { value: 2, label: { en: "validation stages · bench → pre-clinical", pt: "etapas de validação · bancada → pré-clínica" }, color: "blue" },
      { value: 0, label: { en: "stimuli outside inspiration (design rule)", pt: "estímulos fora da inspiração (regra de projeto)" }, color: "lime" }
    ],
    charts: [
      {
        type: "signal", title: { en: "Ventilator flow and the stimulation window", pt: "Fluxo do ventilador e a janela de estimulação" }, illustrative: true,
        cfg: { kind: "flow", height: 9, dt: 0.035, color: "indigo", onColor: "lime", legend: { en: "flow (L/min) · inspiration ↑ expiration ↓", pt: "fluxo (L/min) · inspiração ↑ expiração ↓" }, onLabel: { en: "stimulus on", pt: "estímulo ligado" } }
      },
      {
        type: "tree", title: { en: "Plan by phase", pt: "Plano por fase" },
        cfg: { lines: [
          { text: { en: "Opalina", pt: "Opalina" }, color: "violet" },
          { pre: "├─ ", text: { en: "Sense", pt: "Sensoriar" }, note: { en: "flow phases in real time", pt: "fases do fluxo em tempo real" } },
          { pre: "│  └─ ", text: { en: "bench calibration · flow & volume", pt: "calibração em bancada · fluxo e volume" } },
          { pre: "├─ ", text: { en: "Integrate", pt: "Integrar" }, note: { en: "sensor ↔ ReCARE® over BLE", pt: "sensor ↔ ReCARE® via BLE" } },
          { pre: "├─ ", text: { en: "Control", pt: "Controlar" }, note: { en: "on with positive flow, off on expiration", pt: "liga com fluxo positivo, desliga na expiração" } },
          { pre: "├─ ", text: { en: "Protect", pt: "Proteger" }, note: { en: "fail-safe · emergency stop · limits", pt: "fail-safe · parada de emergência · limites" } },
          { pre: "├─ ", text: { en: "Operate", pt: "Operar" }, note: { en: "interface for the clinical team", pt: "interface para a equipe clínica" } },
          { pre: "└─ ", text: { en: "Validate", pt: "Validar" }, note: { en: "pre-clinical feasibility · InCor", pt: "viabilidade pré-clínica · InCor" } }
        ] }
      }
    ],
    tools: ["flow", "ble", "esp32", "fes", "iso14971", "fmea", "gantt", "github"],
    skills: {
      en: ["Project management", "Clinical stakeholder management", "Risk management (ISO 14971)", "Safety requirements · fail-safe", "Planning & scheduling", "Technical communication"],
      pt: ["Gestão de projetos", "Gestão de stakeholders clínicos", "Gestão de risco (ISO 14971)", "Requisitos de segurança · fail-safe", "Planejamento e cronograma", "Comunicação técnica"]
    },
    review: [
      "Opalina: confirmar o que exatamente coordeno com Visuri e InCor e a fase atual (bancada / pré-clínica).",
      "Opalina: confirmar a frase sobre a animação explicativa (quem produziu).",
      "Opalina: as métricas são do plano (9 objetivos, 3 parceiros, 2 etapas); '0 estímulos fora da inspiração' é regra de projeto, não resultado medido."
    ]
  },

  soma: {
    exp: "neurodynamics", name: "SOMA", color: "blue", scene: "soma", size: "tall",
    role: { en: "Product owner & developer", pt: "Product owner e desenvolvedor" },
    from: "2025-06", to: null,
    status: { en: "In production · v2.19.2", pt: "Em produção · v2.19.2" },
    tagline: {
      en: "The team's operating system: an ERP/MES-style platform that runs NeuroDynamics day to day — people, projects, documents and the lab.",
      pt: "O sistema operacional da equipe: uma plataforma no estilo ERP/MES que roda a NeuroDynamics no dia a dia — pessoas, projetos, documentos e laboratório."
    },
    card: {
      en: "31 modules on Supabase: time logs, kanban, OKRs, document control, training, lab check-in.",
      pt: "31 módulos sobre Supabase: apontamento, kanban, OKRs, controle de documentos, treinamentos, presença no laboratório."
    },
    what: {
      en: [
        "SOMA is NeuroDynamics' management system — where about 40 members log their hours, check in at LABBIO, run kanban boards and OKRs, issue and approve controlled documents, take trainings, sign confidentiality agreements, book rooms and manage institutional relations and grant calls. Version 2.0 merged the HR app (SOMA · Gestão) and the Member Portal into a single PWA.",
        "It is built without a framework: a vanilla-JavaScript single-page shell that loads 31 modules on demand, on top of Supabase — PostgreSQL with row-level security, about 570 SQL functions, Realtime, Storage, Vault, pg_cron and Deno edge functions — with Web Push, a guided tour and its own design system."
      ],
      pt: [
        "O SOMA é o sistema de gestão da NeuroDynamics — onde cerca de 40 membros apontam horas, fazem check-in no LABBIO, tocam quadros kanban e OKRs, emitem e aprovam documentos controlados, fazem treinamentos, assinam termos de confidencialidade, reservam salas e gerenciam relações institucionais e editais. A versão 2.0 uniu o app do Depto. de Pessoal (SOMA · Gestão) e o Portal do Membro em um único PWA.",
        "Ele é feito sem framework: uma casca single-page em JavaScript puro que carrega 31 módulos sob demanda, sobre o Supabase — PostgreSQL com row-level security, cerca de 570 funções SQL, Realtime, Storage, Vault, pg_cron e edge functions em Deno — com Web Push, tour guiado e design system próprio."
      ]
    },
    contribution: {
      en: [
        "Product owner and developer since June 2025: I define the roadmap, write the specifications and ship the releases — up to v2.19.2 today.",
        "Opened and merged all 54 pull requests of the current repository, working with AI coding agents (Claude Code) and reviewing every change: 233 commits between July and October 2026 alone.",
        "Designed the data model with the rules in the database (“a regra mora no banco”): ~143 tables, ~140 RLS policies, audit triggers and migrations that can safely run twice.",
        "Replaced the document-control spreadsheet with codes, revisions and reviewer-group approval, plus verifiable PDFs (QR code + verifier site) and gov.br-signed confidentiality agreements stored with their SHA-256 hash.",
        "Built the safety net: Playwright tests against a Supabase stub, Deno unit tests and SQL tests — about 4,180 assertions in total."
      ],
      pt: [
        "Product owner e desenvolvedor desde junho de 2025: defino o roadmap, escrevo as especificações e publico as versões — hoje na v2.19.2.",
        "Abri e integrei todos os 54 pull requests do repositório atual, trabalhando com agentes de IA (Claude Code) e revisando cada mudança: 233 commits só entre julho e outubro de 2026.",
        "Modelei os dados com as regras no banco (“a regra mora no banco”): ~143 tabelas, ~140 políticas de RLS, gatilhos de auditoria e migrações que podem rodar duas vezes com segurança.",
        "Substituí a planilha de controle de documentos por códigos, revisões e aprovação por grupo revisor, com PDFs verificáveis (QR code + site de verificação) e termos de confidencialidade assinados via gov.br, guardados com hash SHA-256.",
        "Montei a rede de segurança: testes Playwright contra um stub do Supabase, testes unitários em Deno e testes SQL — cerca de 4.180 asserções no total."
      ]
    },
    why: {
      en: [
        "A student team that wants to run like a company needs the tools of one. SOMA turned scattered spreadsheets, forms and chats into one auditable system, so leadership sees the same numbers members do.",
        "It is also what makes ISO 9001-style document control and traceability realistic for a group that wants to build medical devices — the records exist because the daily workflow creates them."
      ],
      pt: [
        "Uma equipe estudantil que quer funcionar como empresa precisa das ferramentas de uma. O SOMA transformou planilhas, formulários e conversas espalhados em um sistema auditável, em que a liderança vê os mesmos números que os membros.",
        "É também o que torna realista o controle de documentos e a rastreabilidade no estilo ISO 9001 para um grupo que quer construir dispositivos médicos — os registros existem porque o fluxo do dia a dia os cria."
      ]
    },
    metrics: [
      { value: 31, label: { en: "modules loaded on demand", pt: "módulos carregados sob demanda" }, color: "blue" },
      { value: 143, label: { en: "database tables · ~140 RLS policies", pt: "tabelas no banco · ~140 políticas RLS" }, color: "indigo" },
      { value: 4180, label: { en: "test assertions (browser, Deno, SQL)", pt: "asserções de teste (navegador, Deno, SQL)" }, color: "violet" },
      { value: 54, label: { en: "pull requests shipped", pt: "pull requests entregues" }, color: "lime" }
    ],
    charts: [
      {
        type: "columns", title: { en: "Commits per month · membro repository (2026)", pt: "Commits por mês · repositório membro (2026)" },
        cfg: { height: 9, color: "blue", items: [
          { label: { en: "Jul", pt: "jul" }, value: 12 }, { label: { en: "Aug", pt: "ago" }, value: 7 },
          { label: { en: "Sep", pt: "set" }, value: 69, color: "indigo" }, { label: { en: "Oct", pt: "out" }, value: 145, color: "violet" }
        ] }
      },
      {
        type: "bars", title: { en: "Lines of code by language", pt: "Linhas de código por linguagem" },
        note: { en: "≈ 98.6k lines, excluding vendored libraries and lockfiles", pt: "≈ 98,6 mil linhas, sem bibliotecas externas e lockfiles" },
        cfg: { unit: "k", decimals: 1, items: [
          { label: "SQL", value: 40.5, color: "blue" }, { label: "JavaScript", value: 31.2, color: "indigo" },
          { label: { en: "JS modules (tests, scripts)", pt: "módulos JS (testes, scripts)" }, value: 9.5, color: "indigo" },
          { label: "HTML", value: 8.0, color: "violet" }, { label: "CSS", value: 5.8, color: "violet" }, { label: "TypeScript", value: 3.6, color: "lime" }
        ] }
      },
      {
        type: "bars", title: { en: "Test assertions by suite", pt: "Asserções de teste por suíte" },
        cfg: { items: [
          { label: { en: "SQL tests", pt: "testes SQL" }, value: 2000, color: "blue" },
          { label: "Playwright", value: 1930, color: "indigo" },
          { label: "Deno", value: 250, color: "lime" }
        ] }
      }
    ],
    tools: ["js", "html", "sql", "supabase", "deno", "playwright", "pdf", "pwa", "git", "github", "claude"],
    skills: {
      en: ["Product ownership", "Data modeling", "Security · least privilege (RLS)", "Automated testing", "Release management", "AI-assisted development"],
      pt: ["Product ownership", "Modelagem de dados", "Segurança · menor privilégio (RLS)", "Testes automatizados", "Gestão de versões", "Desenvolvimento assistido por IA"]
    },
    links: [{ label: { en: "soma · membro.neurodynamics.dev", pt: "soma · membro.neurodynamics.dev" }, href: "https://membro.neurodynamics.dev/" }],
    review: [
      "SOMA: o repositório `membro` só tem histórico a partir de 2026-07 (versões 1.x–13.0 ficavam no repo `nro-pessoal`). Mantive o início em junho de 2025, como você disse — confirme.",
      "SOMA: o repo não usa os termos ERP/MES; descrevi como 'plataforma no estilo ERP/MES'. Ajuste se preferir outro rótulo.",
      "SOMA: mencionei explicitamente o trabalho com agentes de IA (Claude Code), já que 172 dos 233 commits são do agente. Remova se não quiser expor isso."
    ]
  },

  nebula: {
    exp: "neurodynamics", name: "Nebula", color: "indigo", scene: "bci", size: "wide",
    role: { en: "Developer · PIBITI scholar", pt: "Desenvolvedor · bolsista PIBITI" },
    from: "2025-02", to: "2025-11",
    status: { en: "Poster · Semana do Conhecimento UFMG 2025", pt: "Pôster · Semana do Conhecimento UFMG 2025" },
    tagline: {
      en: "Can a moment of focus switch on a muscle? A functional electrical stimulation system triggered by a brain–computer interface.",
      pt: "Um instante de concentração pode acionar um músculo? Um sistema de estimulação elétrica funcional acionado por interface cérebro–computador."
    },
    card: {
      en: "Frontal β-band concentration detected from 2 EEG channels switches FES on in under 250 ms.",
      pt: "A concentração na banda β, lida em 2 canais de EEG frontais, liga a FES em menos de 250 ms."
    },
    how: {
      title: { en: "From focus to contraction.", pt: "Da concentração à contração." },
      lede: {
        en: "EEG captured over the frontal lobe is processed to detect concentration (β band, ~21 Hz). When it appears, a smart relay switches a neuromuscular electrical stimulation system that contracts the lower-limb muscles — putting the stimulation under the user's voluntary control.",
        pt: "O EEG captado no lobo frontal é processado para detectar concentração (banda β, ~21 Hz). Quando ela aparece, um relé inteligente aciona um sistema de estimulação elétrica neuromuscular que contrai os músculos dos membros inferiores — colocando a estimulação sob controle voluntário do usuário."
      },
      items: [
        { t: { en: "EEG · 2 prefrontal channels", pt: "EEG · 2 canais pré-frontais" }, d: { en: "Electrodes over the frontal lobe capture the EEG associated with the user's state of concentration.", pt: "Eletrodos sobre o lobo frontal captam o EEG associado ao estado de concentração do usuário." } },
        { t: { en: "Ganglion → BLE", pt: "Ganglion → BLE" }, d: { en: "An OpenBCI Ganglion board acquires and pre-processes the signals and streams them to a computer over Bluetooth LE.", pt: "Uma placa OpenBCI Ganglion capta e pré-processa os sinais e os transmite a um computador via Bluetooth LE." } },
        { t: { en: "β-band detector", pt: "Detector da banda β" }, d: { en: "Software splits the signal into frequency bands and uses β power (~21 Hz) as the marker of concentration.", pt: "O software separa o sinal em faixas de frequência e usa a potência da banda β (~21 Hz) como marcador de concentração." } },
        { t: { en: "Smart relay < 250 ms", pt: "Relé inteligente < 250 ms" }, d: { en: "When concentration is detected, a smart relay connected to the computer fires in under 250 ms.", pt: "Quando a concentração é identificada, um relé inteligente conectado ao computador é acionado em menos de 250 ms." } },
        { t: { en: "FES → contraction", pt: "FES → contração" }, d: { en: "The relay switches the neuromuscular stimulator, which contracts the muscles in sync with the detected brain activity.", pt: "O relé aciona o eletroestimulador neuromuscular, que contrai os músculos em sincronia com a atividade cerebral detectada." } }
      ]
    },
    what: {
      en: [
        "Spinal cord injury is one of the leading causes of motor disability in the world, and functional recovery depends on neuroplasticity. Functional electrical stimulation (FES) is usually applied passively; driven by a brain–computer interface (BCI), it can be triggered by the user's own brain signals, pairing the intention to move with the muscle activation.",
        "Nebula asks a direct question: <em>can an FES system be switched on by the intention of movement, detected as concentration in β waves?</em> Using frontal β activity instead of motor imagery makes the detector simpler and faster — and lets us train the user to “think” the movement and look for neuroplasticity gains."
      ],
      pt: [
        "A lesão medular é uma das principais causas de incapacidade motora no mundo, e a recuperação funcional depende da neuroplasticidade. A estimulação elétrica funcional (FES) costuma ser aplicada de forma passiva; acionada por uma interface cérebro–computador (BCI), ela pode ser disparada pelos sinais cerebrais do próprio usuário, unindo a intenção de movimento à ativação muscular.",
        "O Nebula faz uma pergunta direta: <em>é possível ativar um sistema de FES a partir da intenção de movimento, detectada como concentração (ondas β)?</em> Usar a atividade β frontal em vez da imagética motora torna o detector mais simples e rápido — e permite treinar o usuário a “pensar” o movimento e buscar ganhos de neuroplasticidade."
      ]
    },
    contribution: {
      en: [
        "Developed the FES–BCI integration end to end: EEG acquisition with an OpenBCI Ganglion over BLE, β-band (~21 Hz) feature extraction and the concentration detector that switches the stimulator.",
        "Built the trigger chain — computer → smart relay → neuromuscular stimulator — keeping detection-to-stimulation under 250 ms.",
        "Co-designed and ran the intra-subject pilot: 10 min of vigilant rest, 5 min of calibration, then 1–2 min blocks of motor concentration, rest and non-motor concentration in pseudo-random order.",
        "Screened participants (5 to 8, one with spinal cord injury) with the Mini-Mental State Examination and exclusion criteria for neurological conditions and attention-affecting drugs.",
        "Analysed the windows and presented the work as a poster at UFMG's Semana do Conhecimento 2025, as a PIBITI technological-initiation scholar."
      ],
      pt: [
        "Desenvolvi a integração FES–BCI de ponta a ponta: aquisição de EEG com OpenBCI Ganglion via BLE, extração da banda β (~21 Hz) e o detector de concentração que aciona o estimulador.",
        "Montei a cadeia de acionamento — computador → relé inteligente → eletroestimulador neuromuscular — com menos de 250 ms entre detecção e estimulação.",
        "Co-desenhei e conduzi o piloto intra-sujeitos: 10 min de repouso vigilante, 5 min de calibração e blocos de 1–2 min de concentração motora, repouso e concentração não motora em ordem pseudo-aleatória.",
        "Fiz a triagem dos participantes (de 5 a 8, um com lesão medular) com o Mini-Mental e critérios de exclusão para condições neurológicas e fármacos que comprometem a atenção.",
        "Analisei as janelas e apresentei o trabalho em pôster na Semana do Conhecimento UFMG 2025, como bolsista PIBITI."
      ]
    },
    why: {
      en: [
        "Every participant reached the motor-concentration state at some point, and the share of windows in that state grew with the protocol iterations, reaching about <strong>43.3%</strong> of the windows analysed — evidence that intentional motor concentration is a trainable skill, and that it can drive FES.",
        "Non-invasive frontal detection is faster to process than motor imagery, opening a quicker path to study BCI-FES effects on neuroplasticity. Next: deep-learning detectors (autoencoders, transformers) for a more robust, more specific trigger."
      ],
      pt: [
        "Todos os participantes atingiram o estado de concentração motora em algum momento, e a proporção de janelas nesse estado cresceu com as iterações do protocolo, chegando a cerca de <strong>43,3%</strong> das janelas analisadas — indício de que a concentração motora intencional é uma habilidade treinável e de que ela pode acionar a FES.",
        "A detecção frontal não invasiva é mais rápida de processar do que a imagética motora, abrindo um caminho mais ágil para estudar os efeitos do BCI-FES na neuroplasticidade. Próximo passo: detectores com aprendizado profundo (autoencoders, transformers) para um gatilho mais robusto e específico."
      ]
    },
    metrics: [
      { value: 43.3, decimals: 1, suffix: "%", label: { en: "of windows in motor concentration", pt: "das janelas em concentração motora" }, color: "indigo" },
      { value: 250, prefix: "<", suffix: "ms", label: { en: "from detection to stimulation", pt: "da detecção à estimulação" }, color: "lime" },
      { value: 21, prefix: "~", suffix: "Hz", label: { en: "β-band marker of concentration", pt: "marcador β de concentração" }, color: "violet" },
      { value: 2, label: { en: "EEG channels · prefrontal", pt: "canais de EEG · pré-frontais" }, color: "blue" }
    ],
    charts: [
      {
        type: "signal", title: { en: "Prefrontal EEG, with β-dominant windows marked", pt: "EEG pré-frontal, com janelas de predomínio β marcadas" }, illustrative: true,
        cfg: { kind: "eeg", height: 8, dt: 0.012, color: "indigo", onColor: "lime", legend: { en: "µV · 2 s window", pt: "µV · janela de 2 s" }, onLabel: { en: "β window → FES on", pt: "janela β → FES ligada" } }
      },
      {
        type: "gauge", title: { en: "Windows in the motor-concentration state", pt: "Janelas em estado de concentração motora" },
        cfg: { value: 43.3, max: 100, decimals: 1, unit: "%", color: "indigo", limit: 50, limitLabel: { en: "half of all windows", pt: "metade das janelas" } }
      },
      {
        type: "bars", title: { en: "Pilot protocol, in minutes", pt: "Protocolo do piloto, em minutos" },
        cfg: { unit: " min", items: [
          { label: { en: "Ambientation · vigilant rest", pt: "Ambientação · repouso vigilante" }, value: 10, color: "blue" },
          { label: { en: "Calibration · minimal attention", pt: "Calibração · atenção mínima" }, value: 5, color: "indigo" },
          { label: { en: "Each task block", pt: "Cada bloco de tarefa" }, value: 2, color: "violet", note: { en: "1–2 min · motor, rest or non-motor concentration, pseudo-random order", pt: "1–2 min · concentração motora, repouso ou não motora, ordem pseudo-aleatória" } }
        ] }
      }
    ],
    tools: ["openbci", "ble", "python", "brainflow", "numpy", "relay", "fes"],
    skills: {
      en: ["EEG signal processing", "Band-power feature extraction", "Real-time systems", "Experimental protocol design", "Human-subject research", "Scientific communication"],
      pt: ["Processamento de sinais EEG", "Extração de potência por banda", "Sistemas em tempo real", "Desenho de protocolo experimental", "Pesquisa com seres humanos", "Comunicação científica"]
    },
    links: [{ label: { en: "Poster · Semana do Conhecimento UFMG 2025", pt: "Pôster · Semana do Conhecimento UFMG 2025" }, href: "" }],
    review: [
      "Nebula: confirmar as bibliotecas (Python, BrainFlow, NumPy/SciPy) e o modelo do relé inteligente.",
      "Nebula: o gráfico de EEG é ilustrativo; se tiver os dados reais (proporção por iteração), dá para trocar por um gráfico real.",
      "Nebula: adicionar o link do pôster (PDF) se quiser — deixei o campo vazio."
    ]
  },

  calima: {
    exp: "neurodynamics", name: "Calima", color: "lime", scene: "ergometer", size: "one",
    role: { en: "Project manager", pt: "Gerente de projeto" },
    from: "2025-12", to: "2026-03",
    status: { en: "Ongoing · handed over in Mar 2026", pt: "Em andamento · passado adiante em mar/2026" },
    tagline: {
      en: "Not just moving the legs — making the muscles actually work: modular FES-cycling synchronized by a wireless inertial sensor.",
      pt: "Não basta mover as pernas — é preciso fazer os músculos trabalharem de verdade: FES-cycling modular sincronizado por um sensor inercial sem fio."
    },
    card: {
      en: "IMU-synchronized FES-cycling for post-stroke rehab, with Visuri and Hospital Paulo de Tarso.",
      pt: "FES-cycling sincronizado por IMU para reabilitação pós-AVC, com Visuri e Hospital Paulo de Tarso."
    },
    how: {
      title: { en: "Every muscle at the right angle.", pt: "Cada músculo no ângulo certo." },
      lede: {
        en: "A wireless IMU tracks the pedal in real time; the control logic maps each angle of the stroke to the stimulation channels of a Connect® stimulator, so quadriceps, hamstrings and glutes contract in sequence and do real work.",
        pt: "Um IMU sem fio acompanha o pedal em tempo real; a lógica de controle associa cada ângulo da pedalada aos canais de estimulação de um eletroestimulador Connect®, para que quadríceps, isquiotibiais e glúteos contraiam em sequência e façam trabalho de verdade."
      },
      items: [
        { t: { en: "Track · IMU", pt: "Acompanhar · IMU" }, d: { en: "An inertial sensor reads the pedal angle and streams it over Bluetooth.", pt: "Um sensor inercial lê o ângulo do pedal e o transmite via Bluetooth." } },
        { t: { en: "Coordinate · Connect®", pt: "Coordenar · Connect®" }, d: { en: "The control synchronizes the stimulator's channels with the phases of the stroke.", pt: "O controle sincroniza os canais do estimulador com as fases da pedalada." } },
        { t: { en: "Contract", pt: "Contrair" }, d: { en: "Muscles contract hard enough to matter: circulation, muscle mass, neuromuscular plasticity.", pt: "Os músculos contraem com força suficiente para fazer diferença: circulação, massa muscular, plasticidade neuromuscular." } },
        { t: { en: "Any cycle ergometer", pt: "Qualquer cicloergômetro" }, d: { en: "The modular, portable design fits different cycle ergometers — in the clinic or at home.", pt: "O desenho modular e portátil se adapta a diferentes cicloergômetros — na clínica ou em casa." } }
      ]
    },
    what: {
      en: [
        "Calima develops and validates an integrated FES-cycling system: Visuri's Connect® high-power stimulator paired with a Bluetooth IMU that acquires the pedal kinematics in real time. Algorithms synchronize the stimulation with the angular phases of the stroke, activating muscle groups selectively and in coordination.",
        "Unlike passive or motor-assisted approaches, it is designed to recruit muscles strongly enough to trigger physiological responses — higher metabolic activity, better perfusion, less atrophy and neuromuscular plasticity — for people after stroke, spinal cord injury and other neuromotor conditions."
      ],
      pt: [
        "O Calima desenvolve e valida um sistema integrado de FES-cycling: o eletroestimulador de alta potência Connect®, da Visuri, junto a um IMU com Bluetooth que adquire a cinemática da pedalada em tempo real. Algoritmos sincronizam a estimulação com as fases angulares da pedalada, ativando grupos musculares de forma coordenada e seletiva.",
        "Diferente de abordagens passivas ou assistidas mecanicamente, ele é projetado para recrutar os músculos com força suficiente para desencadear respostas fisiológicas — mais atividade metabólica, melhor perfusão, menos atrofia e plasticidade neuromuscular — em pessoas pós-AVC, com lesão medular e outras disfunções neuromotoras."
      ]
    },
    contribution: {
      en: [
        "Led the project as project manager from December 2025 to March 2026: scope, work breakdown, schedule and the team's bi-weekly sprints.",
        "Turned the six specific objectives into deliverables — sensor selection, IMU ↔ Connect® integration, angle-to-channel synchronization, therapeutic protocol, an interface for non-specialists and the feasibility study.",
        "Kept Visuri, Hospital Paulo de Tarso and the team aligned through requirement reviews, test planning and a decision log.",
        "Ran the risk register and design documentation following ISO 14971 and the team's quality framework.",
        "Handed over a structured project — plan, risks and documentation — when I moved on to Opalina."
      ],
      pt: [
        "Conduzi o projeto como gerente de dezembro de 2025 a março de 2026: escopo, estrutura analítica, cronograma e sprints quinzenais da equipe.",
        "Transformei os seis objetivos específicos em entregas — seleção do sensor, integração IMU ↔ Connect®, sincronização ângulo→canal, protocolo terapêutico, interface para não especialistas e estudo de viabilidade.",
        "Mantive Visuri, Hospital Paulo de Tarso e equipe alinhados com revisões de requisitos, planejamento de testes e registro de decisões.",
        "Toquei o registro de riscos e a documentação de projeto seguindo a ISO 14971 e o framework de qualidade da equipe.",
        "Entreguei um projeto estruturado — plano, riscos e documentação — ao passar para o Opalina."
      ]
    },
    why: {
      en: [
        "FES-assisted cycling produces stronger contractions than conventional passive interventions; in some clinical contexts it is the only approach that produces measurable physiological change.",
        "A modular system that fits existing ergometers widens access to the therapy — in hospitals and at home — for people after stroke and spinal cord injury."
      ],
      pt: [
        "O FES-cycling produz contrações mais intensas do que as intervenções passivas convencionais; em alguns contextos clínicos, é a única abordagem capaz de gerar alterações fisiológicas mensuráveis.",
        "Um sistema modular que se adapta a cicloergômetros existentes amplia o acesso à terapia — no hospital e em casa — para pessoas pós-AVC e com lesão medular."
      ]
    },
    metrics: [
      { value: 6, label: { en: "specific objectives, planned and tracked", pt: "objetivos específicos, planejados e acompanhados" }, color: "lime" },
      { value: 3, label: { en: "partners · Visuri, NeuroDynamics, H. Paulo de Tarso", pt: "parceiros · Visuri, NeuroDynamics, H. Paulo de Tarso" }, color: "indigo" },
      { value: 4, suffix: { en: "mo", pt: "meses" }, label: { en: "as project manager", pt: "como gerente de projeto" }, color: "blue" },
      { value: 360, suffix: "°", label: { en: "of the stroke mapped to channels", pt: "da pedalada mapeados em canais" }, color: "violet" }
    ],
    charts: [
      {
        type: "polar", title: { en: "Which muscle fires where in the stroke", pt: "Qual músculo dispara em cada ponto da pedalada" }, illustrative: true,
        cfg: { period: 3.2, channels: [
          { label: { en: "Quadriceps", pt: "Quadríceps" }, from: 300, to: 60, color: "lime" },
          { label: { en: "Glutes", pt: "Glúteos" }, from: 0, to: 100, color: "indigo" },
          { label: { en: "Hamstrings", pt: "Isquiotibiais" }, from: 110, to: 220, color: "violet" }
        ] }
      },
      {
        type: "tree", title: { en: "Objectives → deliverables", pt: "Objetivos → entregas" },
        cfg: { lines: [
          { text: "Calima", color: "lime" },
          { pre: "├─ ", text: { en: "Sensor", pt: "Sensor" }, note: { en: "pick an IMU that estimates pedal angle in real time", pt: "escolher um IMU que estime o ângulo do pedal em tempo real" } },
          { pre: "├─ ", text: { en: "Integration", pt: "Integração" }, note: { en: "IMU ↔ Connect® over reliable protocols", pt: "IMU ↔ Connect® com protocolos confiáveis" } },
          { pre: "├─ ", text: { en: "Synchronization", pt: "Sincronização" }, note: { en: "angle → channel activation", pt: "ângulo → ativação dos canais" } },
          { pre: "├─ ", text: { en: "Protocol", pt: "Protocolo" }, note: { en: "safety, load progression, patient profile", pt: "segurança, progressão de carga, perfil do paciente" } },
          { pre: "├─ ", text: { en: "Interface", pt: "Interface" }, note: { en: "usable by clinicians and caregivers", pt: "utilizável por profissionais e cuidadores" } },
          { pre: "└─ ", text: { en: "Feasibility", pt: "Viabilidade" }, note: { en: "post-stroke · Hospital Paulo de Tarso", pt: "pós-AVC · Hospital Paulo de Tarso" } }
        ] }
      }
    ],
    tools: ["gantt", "github", "iso14971", "fmea", "imu", "ble", "fes"],
    skills: {
      en: ["Project management", "Industry–hospital stakeholder management", "Requirements engineering", "Risk management", "Agile / Scrum", "Clinical protocol support"],
      pt: ["Gestão de projetos", "Gestão de stakeholders indústria–hospital", "Engenharia de requisitos", "Gestão de riscos", "Ágil / Scrum", "Apoio a protocolo clínico"]
    },
    review: [
      "Calima: os ângulos de ativação por músculo no gráfico polar são ilustrativos (típicos de FES-cycling), não do projeto.",
      "Calima: confirmar a frase de passagem do projeto em março de 2026 e os entregáveis que você de fato conduziu."
    ]
  },

  direction: {
    exp: "neurodynamics", name: { en: "Directing the portfolio", pt: "Direção do portfólio" }, short: { en: "Direction", pt: "Direção" },
    color: "violet", scene: "radar", size: "wide",
    role: { en: "Director", pt: "Diretor" },
    from: "2024-11", to: null,
    status: { en: "Since the first day", pt: "Desde o primeiro dia" },
    tagline: {
      en: "Keeping nine projects, five departments and about forty people pointed at the same thing: technology that reaches patients.",
      pt: "Manter nove projetos, cinco departamentos e cerca de quarenta pessoas apontando para o mesmo lugar: tecnologia que chega ao paciente."
    },
    card: {
      en: "Portfolio, people and partners: from clinical FES systems to BCIs and AI-assisted diagnostics.",
      pt: "Portfólio, pessoas e parceiros: de sistemas clínicos de FES a BCIs e diagnóstico assistido por IA."
    },
    what: {
      en: [
        "As director I run NeuroDynamics' project portfolio — clinical FES systems for the ICU and rehabilitation, brain–computer interfaces, diaphragm pacing and AI-assisted diagnostics — and the operating rhythm that lets a student team deliver like a professional R&amp;D group.",
        "The portfolio today: Calima, Opalina, Nebula and Gaia in progress; Órion finished; Équio ready to start; Deriva on hold; Zéfiro and Arabella waiting their turn."
      ],
      pt: [
        "Como diretor, conduzo o portfólio de projetos da NeuroDynamics — sistemas clínicos de FES para UTI e reabilitação, interfaces cérebro–computador, estimulação diafragmática e diagnóstico assistido por IA — e o ritmo de operação que permite a uma equipe estudantil entregar como um grupo profissional de P&amp;D.",
        "O portfólio hoje: Calima, Opalina, Nebula e Gaia em andamento; Órion finalizado; Équio pronto para iniciar; Deriva em espera; Zéfiro e Arabella aguardando a vez."
      ]
    },
    contribution: {
      en: [
        "Lead a team of about 40 across the portfolio, setting priorities and allocating people between projects and departments.",
        "Introduced GitHub Projects with bi-weekly sprints, cutting feature delivery from months to weeks.",
        "Run governance — weekly leadership report, OKRs, document control and decision records, now all inside SOMA.",
        "Coordinate external partners: Visuri, InCor and IMREA (HCFMUSP), Hospital São Luiz Jabaquara, Hospital Paulo de Tarso and ETH Zürich.",
        "Mentor project managers and supervisors — and step in as PM when a project needs it (Calima, then Opalina)."
      ],
      pt: [
        "Lidero uma equipe de cerca de 40 pessoas no portfólio, definindo prioridades e alocando pessoas entre projetos e departamentos.",
        "Implantei o GitHub Projects com sprints quinzenais, reduzindo a entrega de funcionalidades de meses para semanas.",
        "Conduzo a governança — relatório semanal da liderança, OKRs, controle de documentos e registro de decisões, hoje tudo dentro do SOMA.",
        "Coordeno parceiros externos: Visuri, InCor e IMREA (HCFMUSP), Hospital São Luiz Jabaquara, Hospital Paulo de Tarso e ETH Zürich.",
        "Oriento gerentes de projeto e supervisores — e assumo a gerência quando um projeto precisa (Calima, depois Opalina)."
      ]
    },
    why: {
      en: [
        "Undergraduate projects usually die when their founders graduate. A portfolio with governance, documentation and partners outlives any single student — and keeps clinical collaborations alive long enough to reach patients."
      ],
      pt: [
        "Projetos de graduação costumam morrer quando seus fundadores se formam. Um portfólio com governança, documentação e parceiros sobrevive a qualquer aluno — e mantém as colaborações clínicas vivas por tempo suficiente para chegar ao paciente."
      ]
    },
    metrics: [
      { value: 9, label: { en: "projects in the portfolio", pt: "projetos no portfólio" }, color: "violet" },
      { value: 40, prefix: "~", label: { en: "people across 5 departments", pt: "pessoas em 5 departamentos" }, color: "indigo" },
      { value: 6, label: { en: "industry, clinical and academic partners", pt: "parceiros da indústria, clínicos e acadêmicos" }, color: "blue" },
      { value: 2, suffix: { en: "wk", pt: "sem" }, label: { en: "sprint cadence", pt: "cadência de sprint" }, color: "lime" }
    ],
    charts: [
      {
        type: "board", title: { en: "Portfolio status", pt: "Status do portfólio" },
        note: { en: "the bar shows the stage, not percent complete", pt: "a barra indica a fase, não o percentual concluído" },
        cfg: { items: [
          { label: "Calima", status: { en: "ongoing", pt: "em andamento" }, progress: 0.6, color: "lime", live: true },
          { label: "Opalina", status: { en: "ongoing", pt: "em andamento" }, progress: 0.45, color: "lime", live: true },
          { label: "Nebula", status: { en: "ongoing", pt: "em andamento" }, progress: 0.55, color: "lime", live: true },
          { label: "Gaia", status: { en: "ongoing", pt: "em andamento" }, progress: 0.4, color: "lime", live: true },
          { label: "Órion", status: { en: "finished", pt: "finalizado" }, progress: 1, color: "indigo" },
          { label: "Équio", status: { en: "ready to start", pt: "pronto p/ iniciar" }, progress: 0.15, color: "blue" },
          { label: "Deriva", status: { en: "on hold", pt: "em espera" }, progress: 0.3, color: "violet" },
          { label: "Zéfiro", status: { en: "not started", pt: "não iniciado" }, progress: 0.04, color: "muted" },
          { label: "Arabella", status: { en: "not started", pt: "não iniciado" }, progress: 0.04, color: "muted" }
        ] }
      },
      {
        type: "bars", title: { en: "Feature lead time, before and after sprints", pt: "Prazo de entrega, antes e depois dos sprints" }, illustrative: true,
        cfg: { unit: { en: " wk", pt: " sem" }, items: [
          { label: { en: "Before · ad-hoc tasks", pt: "Antes · tarefas avulsas" }, value: 12, color: "violet" },
          { label: { en: "After · bi-weekly sprints", pt: "Depois · sprints quinzenais" }, value: 3, color: "lime" }
        ] }
      }
    ],
    tools: ["github", "gantt", "iso13485", "iso14971", "lean", "notion"],
    skills: {
      en: ["Leadership", "Portfolio management", "OKRs & governance", "Agile at team scale", "Partnerships", "Mentoring"],
      pt: ["Liderança", "Gestão de portfólio", "OKRs e governança", "Ágil em escala de equipe", "Parcerias", "Mentoria"]
    },
    review: [
      "Direção: a barra do quadro de status é a fase estimada de cada projeto (não %). Confirme os status (vieram da planilha).",
      "Direção: o gráfico 'antes/depois dos sprints' (12 → 3 semanas) é ilustrativo — ajuste com os números reais, se tiver.",
      "Direção: confirmar a lista de parceiros (incluí ETH Zürich, que já estava no currículo)."
    ]
  },

  founding: {
    exp: "neurodynamics", name: { en: "Founding NeuroDynamics", pt: "Criação da NeuroDynamics" }, short: { en: "Team building", pt: "Criação da equipe" },
    color: "indigo", scene: "network", size: "one",
    role: { en: "Founder", pt: "Fundador" },
    from: "2024-11", to: "2025-05",
    status: { en: "Done · team in operation", pt: "Concluído · equipe em operação" },
    tagline: {
      en: "Turning a pile of opportunities into a team: statute, structure, brand, quality backbone and the first forty people.",
      pt: "Transformar uma pilha de oportunidades em uma equipe: estatuto, estrutura, marca, base de qualidade e as primeiras quarenta pessoas."
    },
    card: {
      en: "Statute, org chart, brand and quality system — from a founding group to ~40 members in seven months.",
      pt: "Estatuto, organograma, marca e sistema de qualidade — de um grupo fundador a ~40 membros em sete meses."
    },
    what: {
      en: [
        "Back from Cybathlon in November 2024, the lab had more promising projects than people to carry them. NeuroDynamics was the answer: a multidisciplinary student healthtech R&amp;D initiative, structured under a corporate-style model, that opens the door for undergraduates to work on projects with real clinical impact.",
        "It lives at LABBIO, in UFMG's School of Engineering, and works side by side with clinical and industry partners on assistive and rehabilitation technology."
      ],
      pt: [
        "Na volta do Cybathlon, em novembro de 2024, o laboratório tinha mais projetos promissores do que gente para tocá-los. A NeuroDynamics foi a resposta: uma iniciativa estudantil multidisciplinar de P&amp;D em healthtech, estruturada em modelo corporativo, que abre as portas para alunos de graduação trabalharem em projetos com impacto clínico real.",
        "Ela funciona no LABBIO, na Escola de Engenharia da UFMG, lado a lado com parceiros clínicos e da indústria em tecnologia assistiva e de reabilitação."
      ]
    },
    contribution: {
      en: [
        "Wrote the statute and governance model and designed the org chart: a board plus five departments — People, R&amp;D, Clinical, Institutional Relations and Marketing.",
        "Built the brand and the visual identity used across projects, documents and social media.",
        "Ran the first selection processes and onboarding, growing from the founding group to about 40 members by May 2025.",
        "Set up the quality backbone from day one: ISO 9001-aligned document control and KPIs, and an R&amp;D framework mapped to ISO 13485, ISO 14971, IEC 62304 and ANVISA RDC 751/2022 — DHF templates, risk matrix and test reports.",
        "Opened the first partnerships with industry and clinical institutions."
      ],
      pt: [
        "Escrevi o estatuto e o modelo de governança e desenhei o organograma: uma diretoria e cinco departamentos — Pessoal, P&amp;D, Clínico, Relações Institucionais e Marketing.",
        "Construí a marca e a identidade visual usadas em projetos, documentos e redes sociais.",
        "Conduzi os primeiros processos seletivos e o onboarding, crescendo do grupo fundador para cerca de 40 membros até maio de 2025.",
        "Montei a base de qualidade desde o primeiro dia: controle de documentos e KPIs alinhados à ISO 9001 e um framework de P&amp;D mapeado para ISO 13485, ISO 14971, IEC 62304 e ANVISA RDC 751/2022 — templates de DHF, matriz de risco e relatórios de teste.",
        "Abri as primeiras parcerias com a indústria e com instituições clínicas."
      ]
    },
    why: {
      en: [
        "It created a pipeline where undergraduates work alongside clinicians and industry on devices that could reach patients — and gave the lab the capacity to say yes to projects it would otherwise have turned down."
      ],
      pt: [
        "Criou um caminho em que alunos de graduação trabalham ao lado de clínicos e da indústria em dispositivos que podem chegar ao paciente — e deu ao laboratório capacidade de dizer sim a projetos que, de outra forma, teria recusado."
      ]
    },
    metrics: [
      { value: 40, prefix: "~", label: { en: "members by May 2025", pt: "membros até maio de 2025" }, color: "indigo" },
      { value: 5, label: { en: "departments + board", pt: "departamentos + diretoria" }, color: "blue" },
      { value: 7, suffix: { en: "mo", pt: "meses" }, label: { en: "from idea to operating team", pt: "da ideia à equipe em operação" }, color: "violet" },
      { value: 4, label: { en: "standards in the R&amp;D framework", pt: "normas no framework de P&amp;D" }, color: "lime" }
    ],
    charts: [
      {
        type: "lines", title: { en: "Members over the founding months", pt: "Membros ao longo da criação" }, illustrative: true,
        cfg: { height: 10, x: { min: 0, max: 6, ticks: [{ at: 0, label: { en: "Nov", pt: "nov" } }, { at: 2, label: { en: "Jan", pt: "jan" } }, { at: 4, label: { en: "Mar", pt: "mar" } }, { at: 6, label: { en: "May", pt: "mai" } }] },
          y: { min: 0, max: 40, ticks: [0, 20, 40] },
          series: [{ color: "indigo", marks: true, label: { en: "members", pt: "membros" }, points: [[0, 4], [1, 6], [2, 9], [3, 18], [4, 26], [5, 33], [6, 40]] }] }
      },
      {
        type: "tree", title: { en: "Org chart", pt: "Organograma" },
        cfg: { lines: [
          { text: { en: "NeuroDynamics · board", pt: "NeuroDynamics · diretoria" }, color: "indigo", note: "DIR" },
          { pre: "├─ ", text: { en: "People", pt: "Pessoal" }, note: "PES" },
          { pre: "├─ ", text: { en: "Research &amp; Development", pt: "Pesquisa e Desenvolvimento" }, note: "PRO" },
          { pre: "├─ ", text: { en: "Clinical", pt: "Clínico" }, note: "CLI" },
          { pre: "├─ ", text: { en: "Institutional Relations", pt: "Relações Institucionais" }, note: "REL" },
          { pre: "└─ ", text: "Marketing", note: "MKT" }
        ] }
      }
    ],
    tools: ["iso13485", "iso14971", "github", "canva", "notion", "gantt"],
    skills: {
      en: ["Entrepreneurship", "Organizational design", "Governance & statute", "Recruiting & onboarding", "Brand building", "Quality systems"],
      pt: ["Empreendedorismo", "Desenho organizacional", "Governança e estatuto", "Recrutamento e onboarding", "Construção de marca", "Sistemas da qualidade"]
    },
    review: [
      "Criação: a curva de membros (4 → 40 entre nov/24 e mai/25) é ilustrativa — confirme os números de cada processo seletivo.",
      "Criação: confirmar ferramentas (Notion, Canva/Figma) e quem fez a marca."
    ]
  },

  /* ------------------------------------------------------------------ LEB & LABBIO */
  cybathlon: {
    exp: "leb-labbio", name: "Cybathlon 2024", color: "lime", scene: "trike", size: "big",
    role: { en: "Team manager", pt: "Team manager" },
    from: "2023-08", to: "2024-10",
    status: { en: "Raced in Zurich · Oct 2024", pt: "Competimos em Zurique · out/2024" },
    tagline: {
      en: "From a stalled prototype to the start line in Zurich: taking UFMG's FES-cycling team to the 'cyborg Olympics'.",
      pt: "De um protótipo parado à largada em Zurique: levando a equipe de FES-cycling da UFMG às 'Olimpíadas ciborgues'."
    },
    card: {
      en: "Built the team, revived the FES trike, raised the funds and managed the campaign to race the FES Bike in Zurich.",
      pt: "Montei a equipe, reativei o triciclo de FES, captei recursos e gerenciei a campanha para correr o FES Bike em Zurique."
    },
    how: {
      title: { en: "There is no motor.", pt: "Não tem motor." },
      lede: {
        en: "The pedals are turned by the leg muscles themselves. A spinal cord injury cuts the command coming from the brain, but the muscle can still contract. The system stands in for that command: it reads every stroke and fires gentle electrical pulses at the right moment.",
        pt: "Quem gira o pedal são os músculos das próprias pernas. A lesão na medula corta o comando que vem do cérebro, mas o músculo continua capaz de se contrair. O sistema faz o papel desse comando: lê cada pedalada e dispara pulsos elétricos leves na hora certa."
      },
      items: [
        { t: { en: "Muscle stimulation", pt: "Estimulação muscular" }, d: { en: "Electrodes deliver coordinated pulses to the muscles that drive the stroke — quadriceps forward, hamstrings back.", pt: "Eletrodos aplicam pulsos coordenados nos músculos que movem a pedalada — quadríceps na extensão, isquiotibiais na flexão." } },
        { t: { en: "Crank angle", pt: "Ângulo do pedal" }, d: { en: "Sensors track the pedal position to time each channel throughout the cycle.", pt: "Sensores acompanham a posição do pedal para sincronizar cada canal ao longo do ciclo." } },
        { t: { en: "Stimulator + control", pt: "Estimulador + controle" }, d: { en: "Decides which muscle fires, when and how hard.", pt: "Decide qual músculo dispara, quando e com que intensidade." } },
        { t: { en: "No motor", pt: "Sem motor" }, d: { en: "The pilot, with a complete spinal cord injury, races on the power of their own muscles.", pt: "O piloto, com lesão medular completa, corre com a força dos próprios músculos." } }
      ]
    },
    what: {
      en: [
        "Cybathlon, organized by ETH Zürich, is an international competition where people with disabilities complete everyday-life tasks and races using assistive technology. In the FES Bike Race, pilots with spinal cord injury pedal a tricycle powered only by their own electrically stimulated muscles.",
        "The 2024 edition (25–27 October, SWISS Arena, Kloten) brought together 67 teams from 24 countries in eight disciplines, with about 6,000 spectators on site and 15,500 following online."
      ],
      pt: [
        "O Cybathlon, organizado pela ETH Zürich, é uma competição internacional em que pessoas com deficiência realizam tarefas do dia a dia e corridas usando tecnologia assistiva. Na FES Bike Race, pilotos com lesão medular pedalam um triciclo movido apenas pelos próprios músculos, estimulados eletricamente.",
        "A edição de 2024 (25 a 27 de outubro, SWISS Arena, Kloten) reuniu 67 equipes de 24 países em oito modalidades, com cerca de 6.000 espectadores no local e 15.500 acompanhando online."
      ]
    },
    contribution: {
      en: [
        "Started the project when I joined UFMG: assembled the team and served as its team manager.",
        "Brought the lab's FES-cycling technology, which had been idle, back to life and organized the work to make it race-ready.",
        "Planned the whole campaign — schedule, budget, travel and equipment logistics — to compete in person in Zurich, and raised the funding to get there.",
        "Was the team's point of contact with the Cybathlon organization and partner institutions.",
        "Owned the FMEA and risk-management documentation for the system and for race operations."
      ],
      pt: [
        "Iniciei o projeto ao entrar na UFMG: montei a equipe e fui o seu team manager.",
        "Recuperei a tecnologia de FES-cycling do laboratório, que estava parada, e organizei o trabalho para deixá-la pronta para competir.",
        "Planejei toda a campanha — cronograma, orçamento, viagem e logística de equipamentos — para competir presencialmente em Zurique, e consegui a verba para chegar lá.",
        "Fui o ponto de contato da equipe com a organização do Cybathlon e com as instituições parceiras.",
        "Fui responsável pela documentação de FMEA e de gerenciamento de riscos do sistema e da operação de prova."
      ]
    },
    why: {
      en: [
        "We made it to the start line. Beyond the race, the event put UFMG's work in front of the world's leading assistive-technology groups and opened partnerships that later fed NeuroDynamics' projects — and the stalled FES technology became a platform again."
      ],
      pt: [
        "Chegamos à largada. Além da prova, o evento colocou o trabalho da UFMG diante dos principais grupos de tecnologia assistiva do mundo e abriu parcerias que depois alimentaram os projetos da NeuroDynamics — e a tecnologia de FES parada voltou a ser uma plataforma."
      ]
    },
    metrics: [
      { value: 67, label: { en: "teams at Cybathlon 2024", pt: "equipes no Cybathlon 2024" }, color: "lime" },
      { value: 24, label: { en: "countries", pt: "países" }, color: "indigo" },
      { value: 6000, prefix: "~", label: { en: "spectators on site · +15,500 online", pt: "espectadores no local · +15.500 online" }, color: "blue" },
      { value: 1960, suffix: "m", label: { en: "FES Bike Race distance", pt: "distância da FES Bike Race" }, color: "violet" }
    ],
    charts: [
      {
        type: "matrix", title: { en: "FMEA: risks before and after mitigation", pt: "FMEA: riscos antes e depois da mitigação" }, illustrative: true,
        cfg: {
          before: { en: "before mitigation", pt: "antes da mitigação" }, after: { en: "after mitigation", pt: "depois da mitigação" },
          risks: [{ s: [5, 4], o: [3, 1] }, { s: [4, 4], o: [4, 2] }, { s: [5, 3], o: [2, 1] }, { s: [3, 2], o: [4, 2] }, { s: [4, 3], o: [3, 1] }, { s: [2, 2], o: [5, 3] }]
        }
      },
      {
        type: "tree", title: { en: "The campaign, as work packages", pt: "A campanha, em pacotes de trabalho" },
        cfg: { lines: [
          { text: { en: "Cybathlon 2024 · FES Bike Race", pt: "Cybathlon 2024 · FES Bike Race" }, color: "lime" },
          { pre: "├─ ", text: { en: "Team", pt: "Equipe" }, note: { en: "recruiting, roles, pilot", pt: "recrutamento, papéis, piloto" } },
          { pre: "├─ ", text: { en: "Technology", pt: "Tecnologia" }, note: { en: "revive the FES trike, tune stimulation", pt: "reativar o triciclo de FES, ajustar a estimulação" } },
          { pre: "├─ ", text: { en: "Risk", pt: "Risco" }, note: { en: "FMEA, safety of the pilot and the system", pt: "FMEA, segurança do piloto e do sistema" } },
          { pre: "├─ ", text: { en: "Funding", pt: "Recursos" }, note: { en: "budget and sponsors", pt: "orçamento e patrocinadores" } },
          { pre: "├─ ", text: { en: "Logistics", pt: "Logística" }, note: { en: "travel, equipment shipping to Switzerland", pt: "viagem, envio de equipamentos à Suíça" } },
          { pre: "└─ ", text: { en: "Relations", pt: "Relações" }, note: { en: "Cybathlon organization, partners", pt: "organização do Cybathlon, parceiros" } }
        ] }
      },
      {
        type: "bars", title: { en: "Cybathlon 2024 audience", pt: "Público do Cybathlon 2024" },
        cfg: { items: [
          { label: { en: "Followed online / in hubs", pt: "Online / em hubs" }, value: 15500, color: "indigo" },
          { label: { en: "On site in Kloten", pt: "No local, em Kloten" }, value: 6000, color: "lime" }
        ] }
      }
    ],
    tools: ["fmea", "iso14971", "gantt", "fes", "excel", "esp32"],
    skills: {
      en: ["Team building", "Fundraising", "International logistics", "Risk management · FMEA", "Stakeholder management", "Systems integration"],
      pt: ["Formação de equipe", "Captação de recursos", "Logística internacional", "Gestão de riscos · FMEA", "Gestão de stakeholders", "Integração de sistemas"]
    },
    links: [{ label: { en: "cybathlon.com", pt: "cybathlon.com" }, href: "https://cybathlon.com/" }],
    review: [
      "Cybathlon: confirmar datas do projeto (coloquei ago/2023 → out/2024), nome da equipe, piloto e quanto foi captado.",
      "Cybathlon: números do evento vêm de fontes públicas (67 equipes, 24 países, ~6.000 no local, 15.500 online, prova de 1.960 m). A matriz de FMEA é ilustrativa.",
      "Cybathlon: citar nominalmente as parcerias que saíram do evento, se quiser (ex.: ETH Zürich)."
    ]
  },

  finep: {
    exp: "leb-labbio", name: { en: "Lower-limb prosthesis · FINEP", pt: "Prótese de membro inferior · FINEP" }, short: { en: "FINEP prosthesis", pt: "Prótese FINEP" },
    color: "blue", scene: "blueprint", size: "tall",
    role: { en: "Project planning", pt: "Planejamento do projeto" },
    from: "2024-11", to: "2025-01",
    status: { en: "Became NeuroDynamics", pt: "Virou a NeuroDynamics" },
    tagline: {
      en: "The project that showed there was more work than one lab could carry — and became the reason NeuroDynamics exists.",
      pt: "O projeto que mostrou que havia mais trabalho do que um laboratório conseguia carregar — e virou o motivo de a NeuroDynamics existir."
    },
    card: {
      en: "Planning a FINEP-funded prosthesis made the scale obvious — so I built an organization to carry it.",
      pt: "Planejar uma prótese financiada pela FINEP deixou a escala evidente — então criei uma organização para carregá-la."
    },
    what: {
      en: [
        "Back from Zurich in November 2024, I joined a FINEP-funded project at LEB/LABBIO to develop a lower-limb prosthesis. At the same time, other opportunities kept arriving — ICU rehabilitation with Visuri, BCI research, clinical partners asking for help."
      ],
      pt: [
        "De volta de Zurique, em novembro de 2024, entrei em um projeto financiado pela FINEP no LEB/LABBIO para desenvolver uma prótese de membro inferior. Ao mesmo tempo, outras oportunidades não paravam de chegar — reabilitação em UTI com a Visuri, pesquisa em BCI, parceiros clínicos pedindo ajuda."
      ]
    },
    contribution: {
      en: [
        "Helped plan the prosthesis work: requirements and the work packages — mechanics &amp; materials, electronics &amp; sensors, clinical protocol, regulatory (ANVISA) and project management.",
        "Mapped the people and skills each package needed, alongside the other projects reaching the lab.",
        "Proposed a structure that could absorb all of it and open the door to undergraduates — and founded NeuroDynamics to be that structure."
      ],
      pt: [
        "Ajudei a planejar o trabalho da prótese: requisitos e os pacotes de trabalho — mecânica e materiais, eletrônica e sensores, protocolo clínico, regulatório (ANVISA) e gestão do projeto.",
        "Mapeei as pessoas e competências que cada pacote exigia, junto com os outros projetos que chegavam ao laboratório.",
        "Propus uma estrutura capaz de absorver tudo isso e abrir as portas para a graduação — e fundei a NeuroDynamics para ser essa estrutura."
      ]
    },
    why: {
      en: [
        "Seeing the whole pipeline at once — not just one device — is what turned a research assistantship into an organization. The prosthesis line of work continues inside that structure."
      ],
      pt: [
        "Enxergar todo o fluxo de uma vez — e não só um dispositivo — foi o que transformou uma atuação em pesquisa em uma organização. A linha de próteses continua dentro dessa estrutura."
      ]
    },
    metrics: [
      { value: 5, label: { en: "work packages mapped", pt: "pacotes de trabalho mapeados" }, color: "blue" },
      { value: 3, suffix: { en: "mo", pt: "meses" }, label: { en: "from kickoff to a new organization", pt: "do início a uma nova organização" }, color: "indigo" },
      { value: 1, label: { en: "student R&amp;D group founded", pt: "grupo estudantil de P&amp;D fundado" }, color: "lime" }
    ],
    charts: [],
    tools: ["gantt", "cad", "iso13485", "excel"],
    skills: {
      en: ["Project scoping", "Work breakdown structure", "Capacity planning", "Medical-device regulation", "Systems thinking"],
      pt: ["Definição de escopo", "Estrutura analítica de projeto", "Planejamento de capacidade", "Regulação de dispositivos médicos", "Pensamento sistêmico"]
    },
    review: [
      "Prótese FINEP: datas (nov/2024 → jan/2025), seu papel e os pacotes de trabalho são suposições minhas — revise tudo.",
      "Prótese FINEP: as cotas de 480 mm / 260 mm na animação são só ilustrativas."
    ]
  },

  /* ------------------------------------------------------------------ CEFET-MG */
  tcc: {
    exp: "cefet", name: { en: "Prosthetic feet, measured", pt: "Pés protéticos, medidos" }, short: { en: "Final project (TCC)", pt: "TCC" },
    color: "violet", scene: "gait", size: "full",
    role: { en: "Author · technical final project", pt: "Autor · trabalho de conclusão de curso" },
    from: "2022-02", to: "2022-11",
    status: { en: "Defended · 2022", pt: "Defendido · 2022" },
    tagline: {
      en: "How much does the design of a prosthetic foot change the way someone walks? A biomechanics review with a MATLAB gait model.",
      pt: "Quanto o projeto de um pé protético muda o jeito de alguém andar? Uma revisão de biomecânica com um modelo de marcha em MATLAB."
    },
    card: {
      en: "SACH vs single-axis vs energy-storing feet: a PubMed review and a MATLAB gait model compared on performance.",
      pt: "SACH vs eixo simples vs pés com restituição de energia: revisão no PubMed e modelo de marcha em MATLAB comparados por desempenho."
    },
    how: {
      title: { en: "A foot is a spring with a job.", pt: "Um pé é uma mola com uma função." },
      lede: {
        en: "During the stance phase the prosthetic foot stores energy as the body rolls over it, and gives part of it back at push-off. How much it returns — and when — changes walking speed, symmetry and effort.",
        pt: "Na fase de apoio, o pé protético armazena energia enquanto o corpo passa sobre ele e devolve parte dela no impulso. Quanto ele devolve — e quando — muda a velocidade, a simetria e o esforço da marcha."
      },
      items: [
        { t: { en: "Socket", pt: "Encaixe" }, d: { en: "The interface with the residual limb — where comfort and load transfer are won or lost.", pt: "A interface com o coto — onde se ganha ou se perde conforto e transferência de carga." } },
        { t: { en: "Pylon", pt: "Pilão" }, d: { en: "The structural tube that carries the load to the foot.", pt: "O tubo estrutural que leva a carga até o pé." } },
        { t: { en: "Energy-storing foot", pt: "Pé de restituição de energia" }, d: { en: "A carbon-fibre keel that bends in stance and springs back at push-off (ESAR).", pt: "Uma quilha de fibra de carbono que flexiona no apoio e devolve energia no impulso (ESAR)." } },
        { t: { en: "Ankle angle · gait cycle", pt: "Ângulo do tornozelo · ciclo" }, d: { en: "How each design follows — or misses — the intact ankle over one stride.", pt: "Como cada projeto acompanha — ou não — o tornozelo intacto ao longo de uma passada." } }
      ]
    },
    what: {
      en: [
        "My final project for the Mechatronics technical course at CEFET-MG evaluated the biomechanics of lower-limb prostheses and compared prosthetic-foot designs — SACH (solid ankle, cushion heel), single-axis and energy-storing-and-returning (ESAR) feet — on performance during gait.",
        "It combined a structured literature review with a simple MATLAB model of the gait cycle, to put numbers on the trade-offs between designs."
      ],
      pt: [
        "Meu TCC do curso técnico em Mecatrônica no CEFET-MG avaliou a biomecânica de próteses de membro inferior e comparou projetos de pés protéticos — SACH (tornozelo rígido, calcanhar amortecido), de eixo simples e com armazenamento e restituição de energia (ESAR) — pelo desempenho na marcha.",
        "Ele combinou uma revisão bibliográfica estruturada com um modelo simples do ciclo de marcha em MATLAB, para colocar números nas escolhas entre os projetos."
      ]
    },
    contribution: {
      en: [
        "Ran a structured literature review on PubMed: built the search strings, screened the records and extracted gait data from the included studies.",
        "Built a MATLAB model of the gait cycle to compare ankle kinematics and energy return across foot designs.",
        "Compared the designs on energy return, push-off, gait symmetry and fit for different activity levels (K-levels).",
        "Wrote and defended the thesis."
      ],
      pt: [
        "Conduzi uma revisão bibliográfica estruturada no PubMed: montei as strings de busca, fiz a triagem dos registros e extraí dados de marcha dos estudos incluídos.",
        "Construí um modelo do ciclo de marcha em MATLAB para comparar a cinemática do tornozelo e a restituição de energia entre os projetos de pé.",
        "Comparei os projetos por restituição de energia, impulso, simetria da marcha e adequação a diferentes níveis de atividade (K-levels).",
        "Escrevi e defendi o trabalho."
      ]
    },
    why: {
      en: [
        "Choosing a foot is choosing how someone will walk for years. The project showed me the gap between a well-designed component and a device that fits a person's life — the question that has guided my work since."
      ],
      pt: [
        "Escolher um pé é escolher como alguém vai andar por anos. O projeto me mostrou a distância entre um componente bem projetado e um dispositivo que cabe na vida de uma pessoa — a pergunta que guia meu trabalho desde então."
      ]
    },
    metrics: [
      { value: 34, label: { en: "studies included in the review", pt: "estudos incluídos na revisão" }, color: "violet" },
      { value: 3, label: { en: "foot designs compared", pt: "projetos de pé comparados" }, color: "indigo" },
      { value: 100, suffix: "%", label: { en: "of the gait cycle modelled", pt: "do ciclo de marcha modelado" }, color: "blue" },
      { value: 1, label: { en: "MATLAB gait model", pt: "modelo de marcha em MATLAB" }, color: "lime" }
    ],
    charts: [
      {
        type: "funnel", title: { en: "Literature screening (PRISMA-style)", pt: "Triagem da literatura (no estilo PRISMA)" }, illustrative: true,
        cfg: { items: [
          { label: { en: "Records found on PubMed", pt: "Registros encontrados no PubMed" }, value: 412, color: "blue" },
          { label: { en: "Screened by title and abstract", pt: "Triados por título e resumo" }, value: 268, color: "indigo" },
          { label: { en: "Full texts assessed", pt: "Textos completos avaliados" }, value: 61, color: "violet" },
          { label: { en: "Included", pt: "Incluídos" }, value: 34, color: "lime" }
        ] }
      },
      {
        type: "bars", title: { en: "Energy returned at push-off, by design", pt: "Energia devolvida no impulso, por projeto" }, illustrative: true,
        cfg: { unit: "%", items: [
          { label: { en: "SACH", pt: "SACH" }, value: 31, color: "violet" },
          { label: { en: "Single-axis", pt: "Eixo simples" }, value: 42, color: "indigo" },
          { label: { en: "ESAR (carbon keel)", pt: "ESAR (quilha de carbono)" }, value: 68, color: "lime" }
        ] }
      }
    ],
    tools: ["matlab", "pubmed", "zotero", "excel", "latex"],
    skills: {
      en: ["Biomechanics", "Structured literature review", "Modeling & simulation", "Data analysis", "Scientific writing"],
      pt: ["Biomecânica", "Revisão bibliográfica estruturada", "Modelagem e simulação", "Análise de dados", "Escrita científica"]
    },
    review: [
      "TCC: título, datas (fev → nov/2022), números da revisão (412 → 268 → 61 → 34), percentuais de energia e ferramentas (Zotero, LaTeX, Excel) foram inventados para você revisar.",
      "TCC: confirmar quais projetos de pé você comparou de fato e se houve modelo em MATLAB."
    ]
  },

  /* ------------------------------------------------------------------ Abbott */
  andon: {
    exp: "abbott", name: { en: "Software andon", pt: "Andon em software" }, short: { en: "Andon", pt: "Andon" },
    color: "violet", scene: "andon", size: "big",
    role: { en: "Continuous improvement · builder", pt: "Melhoria contínua · desenvolvimento" },
    from: "2025-09", to: "2026-02",
    status: { en: "Deployed on the line", pt: "Implantado na linha" },
    tagline: {
      en: "An andon built on the infrastructure the line already had: more than US$11k avoided, less walking, fewer particles in the cleanroom.",
      pt: "Um andon construído sobre a infraestrutura que a linha já tinha: mais de US$11 mil evitados, menos deslocamento, menos partículas na sala limpa."
    },
    card: {
      en: "A call-and-respond system on existing PCs and screens, with live metrics and a bottleneck heat map.",
      pt: "Um sistema de chamado e resposta nos PCs e telas existentes, com métricas ao vivo e mapa de calor de gargalos."
    },
    how: {
      title: { en: "Call, see, respond.", pt: "Chamar, ver, responder." },
      lede: {
        en: "An operator flags a problem from the station; support sees it on a live board, with who called, why and for how long; the data accumulates into a picture of where the flow really gets stuck.",
        pt: "O operador sinaliza um problema no próprio posto; o suporte vê no painel ao vivo quem chamou, por quê e há quanto tempo; os dados se acumulam em um retrato de onde o fluxo realmente trava."
      },
      items: [
        { t: { en: "Call from the station", pt: "Chamado no posto" }, d: { en: "Operators raise a call on the computer already at their station.", pt: "O operador abre o chamado no computador que já está no posto." } },
        { t: { en: "Live board", pt: "Painel ao vivo" }, d: { en: "Support sees open calls, reason and elapsed time, and walks straight to the right place.", pt: "O suporte vê chamados abertos, motivo e tempo decorrido, e vai direto ao lugar certo." } },
        { t: { en: "Bottleneck heatmap", pt: "Mapa de calor de gargalos" }, d: { en: "Calls by station and hour expose where the flow chokes.", pt: "Chamados por posto e hora mostram onde o fluxo engasga." } },
        { t: { en: "Zero new hardware", pt: "Zero hardware novo" }, d: { en: "Runs on existing PCs, screens and network — no installation project.", pt: "Roda em PCs, telas e rede existentes — sem projeto de instalação." } }
      ]
    },
    what: {
      en: [
        "An andon lets an operator signal a problem the moment it happens, so support can respond before the line stops. Instead of buying and installing a hardware andon system, I built a software andon that runs on the computers, screens and network already on the floor of a medical-device manufacturing site.",
        "Its interface also tracks performance metrics and shows, as a heat map, where along the manufacturing flow the bottlenecks are."
      ],
      pt: [
        "Um andon permite que o operador sinalize um problema no momento em que ele acontece, para que o suporte responda antes de a linha parar. Em vez de comprar e instalar um sistema de andon em hardware, construí um andon em software que roda nos computadores, telas e rede que já existiam no chão de fábrica de uma planta de dispositivos médicos.",
        "A interface também acompanha métricas de desempenho e mostra, em um mapa de calor, onde estão os gargalos ao longo do fluxo de manufatura."
      ]
    },
    contribution: {
      en: [
        "Mapped flow problems and stoppage causes on the line together with production and support.",
        "Designed and built the andon application: station call, live board with call timers, and escalation.",
        "Built the analytics: calls, response and resolution times, and a heat map that exposes bottlenecks along the manufacturing flow.",
        "Deployed it on the existing infrastructure, avoiding more than US$11k in installation (soft savings)."
      ],
      pt: [
        "Mapeei problemas de fluxo e causas de parada na linha junto com produção e suporte.",
        "Projetei e construí a aplicação de andon: chamado no posto, painel ao vivo com cronômetro dos chamados e escalonamento.",
        "Construí a análise: chamados, tempos de resposta e de resolução, e um mapa de calor que expõe gargalos ao longo do fluxo de manufatura.",
        "Implantei sobre a infraestrutura existente, evitando mais de US$11 mil em instalação (soft savings)."
      ]
    },
    why: {
      en: [
        "Less time lost to stoppages and less walking around to find help — and, in a medical-device plant, fewer people moving through cleanroom areas means less particle generation.",
        "Because it reuses what was already there, it went from idea to the floor without a capital project."
      ],
      pt: [
        "Menos tempo perdido com paradas e menos deslocamento para buscar ajuda — e, em uma planta de dispositivos médicos, menos gente circulando nas salas limpas significa menos geração de particulado.",
        "Como reaproveita o que já existia, foi da ideia ao chão de fábrica sem projeto de investimento."
      ]
    },
    metrics: [
      { value: 11, prefix: "US$", suffix: "k+", label: { en: "installation cost avoided (soft savings)", pt: "de instalação evitados (soft savings)" }, color: "violet" },
      { value: 0, label: { en: "new hardware installed", pt: "hardware novo instalado" }, color: "lime" },
      { value: 4, label: { en: "gains · flow, productivity, movement, particles", pt: "ganhos · fluxo, produtividade, movimentação, particulado" }, color: "indigo" }
    ],
    charts: [
      {
        type: "bars", title: { en: "Installation cost", pt: "Custo de instalação" },
        note: { en: "hardware figure is the quoted installation the software replaced", pt: "o valor de hardware é a instalação orçada que o software substituiu" },
        cfg: { prefix: "US$ ", items: [
          { label: { en: "Hardware andon", pt: "Andon em hardware" }, value: 11000, color: "violet", note: { en: "lights, wiring, installation", pt: "torres, cabeamento, instalação" } },
          { label: { en: "Software andon", pt: "Andon em software" }, value: 0, color: "lime", note: { en: "existing PCs, screens, network", pt: "PCs, telas e rede existentes" } }
        ] }
      },
      {
        type: "heatmap", title: { en: "Calls by station and hour", pt: "Chamados por posto e hora" }, illustrative: true,
        cfg: { legend: { en: "fewer → more calls", pt: "menos → mais chamados" },
          rows: ["ST1", "ST2", "ST3", "ST4", "ST5", "ST6"],
          cols: ["06", "08", "10", "12", "14", "16", "18", "20", "22"],
          values: [[1, 2, 1, 0, 1, 2, 1, 0, 1], [2, 1, 2, 1, 1, 1, 2, 1, 0], [3, 5, 7, 8, 6, 7, 5, 4, 3], [1, 1, 2, 1, 2, 1, 1, 2, 1], [0, 1, 1, 2, 1, 3, 2, 1, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0]] }
      }
    ],
    tools: ["powerapps", "sharepoint", "powerautomate", "powerbi", "excel", "lean"],
    skills: {
      en: ["Lean manufacturing", "Process mapping", "Application development", "Data visualization", "Change management", "Cleanroom / GMP awareness"],
      pt: ["Manufatura enxuta", "Mapeamento de processos", "Desenvolvimento de aplicações", "Visualização de dados", "Gestão da mudança", "Sala limpa / BPF"]
    },
    review: [
      "Andon: confirmar a stack (coloquei Power Apps, SharePoint, Power Automate, Power BI) e as datas (set/2025 → fev/2026).",
      "Andon: o mapa de calor é ilustrativo; o custo de hardware usa o seu número (> US$11 mil). Verifique o que pode ser divulgado publicamente sobre a Abbott."
    ]
  },

  visual: {
    exp: "abbott", name: { en: "Visual management &amp; BI", pt: "Gestão à vista e BI" }, short: { en: "Visual mgmt &amp; BI", pt: "Gestão à vista e BI" },
    color: "blue", scene: "tiers", size: "tall",
    role: { en: "Continuous improvement intern", pt: "Estagiário de melhoria contínua" },
    from: "2025-08", to: null,
    status: { en: "Daily routine", pt: "Rotina diária" },
    tagline: {
      en: "The routine side of continuous improvement: boards, tiers and dashboards that make problems visible before they become stoppages.",
      pt: "O lado rotina da melhoria contínua: quadros, tiers e dashboards que tornam os problemas visíveis antes que virem paradas."
    },
    card: {
      en: "Tiered daily management, KPI boards and BI: a Power BI skills matrix and an Excel workload control.",
      pt: "Gestão diária por tiers, quadros de KPI e BI: matriz de competências em Power BI e controle de carga em Excel."
    },
    what: {
      en: [
        "Most of my day-to-day at Abbott's Structural Heart division is routine rather than project: keeping the visual-management system alive and turning data into decisions, in a highly regulated medical-device manufacturing environment."
      ],
      pt: [
        "Boa parte do meu dia a dia na divisão Structural Heart da Abbott é rotina, e não projeto: manter vivo o sistema de gestão à vista e transformar dados em decisão, em um ambiente de manufatura de dispositivos médicos altamente regulado."
      ]
    },
    contribution: {
      en: [
        "Keep visual-management boards and the KPIs reviewed in daily tiered meetings — safety, quality, delivery, cost and people.",
        "Assessed operational-excellence mechanisms — daily management, tiered meetings, 4P assessment and the Shingo Model — to strengthen continuous-improvement maturity across the site.",
        "Built BI tools: a Power BI Lean Six Sigma skills matrix and an Excel workload-control system for inspection teams."
      ],
      pt: [
        "Mantenho os quadros de gestão à vista e os KPIs revisados nas reuniões diárias por tiers — segurança, qualidade, entrega, custo e pessoas.",
        "Avaliei mecanismos de excelência operacional — gestão diária, reuniões por tiers, avaliação 4P e Modelo Shingo — para fortalecer a maturidade de melhoria contínua no site.",
        "Construí ferramentas de BI: uma matriz de competências Lean Six Sigma em Power BI e um sistema de controle de carga de trabalho em Excel para as equipes de inspeção."
      ]
    },
    why: {
      en: [
        "Visual management gives every tier the same picture at the same time: deviations show up early, escalate fast, and the help flows back down the same day."
      ],
      pt: [
        "A gestão à vista dá a todos os tiers o mesmo retrato ao mesmo tempo: desvios aparecem cedo, escalam rápido e a ajuda volta no mesmo dia."
      ]
    },
    metrics: [
      { value: 4, label: { en: "meeting tiers, line to leadership", pt: "tiers de reunião, da linha à liderança" }, color: "blue" },
      { value: 5, label: { en: "KPI families · S Q D C P", pt: "famílias de KPI · S Q D C P" }, color: "indigo" },
      { value: 2, label: { en: "BI tools built", pt: "ferramentas de BI construídas" }, color: "lime" }
    ],
    charts: [
      {
        type: "heatmap", title: { en: "Lean Six Sigma skills matrix", pt: "Matriz de competências Lean Six Sigma" }, illustrative: true,
        cfg: { legend: { en: "none → expert", pt: "nenhum → especialista" }, max: 4, hot: "lime", warm: "indigo", cool: "blue",
          rows: [{ en: "Person A", pt: "Pessoa A" }, { en: "Person B", pt: "Pessoa B" }, { en: "Person C", pt: "Pessoa C" }, { en: "Person D", pt: "Pessoa D" }, { en: "Person E", pt: "Pessoa E" }],
          cols: ["5S", "VSM", "A3", "SPC", "DOE", "FMEA"],
          values: [[4, 3, 3, 2, 1, 2], [3, 2, 4, 1, 0, 3], [2, 4, 2, 3, 2, 1], [4, 1, 2, 0, 0, 2], [1, 2, 3, 4, 3, 4]] }
      },
      {
        type: "tree", title: { en: "Tiered daily management", pt: "Gestão diária por tiers" },
        cfg: { lines: [
          { text: { en: "T4 · leadership", pt: "T4 · liderança" }, color: "blue", note: "09:30" },
          { pre: "└─ ", text: { en: "T3 · site", pt: "T3 · site" }, note: "09:00" },
          { pre: "   └─ ", text: { en: "T2 · area", pt: "T2 · área" }, note: "08:30" },
          { pre: "      └─ ", text: { en: "T1 · line", pt: "T1 · linha" }, note: { en: "08:00 · SQDCP board", pt: "08:00 · quadro SQDCP" } }
        ] }
      }
    ],
    tools: ["powerbi", "excel", "lean", "sharepoint"],
    skills: {
      en: ["Lean Six Sigma", "Daily management", "Shingo Model", "KPI design", "Data analysis", "Facilitation"],
      pt: ["Lean Six Sigma", "Gestão diária", "Modelo Shingo", "Desenho de KPIs", "Análise de dados", "Facilitação"]
    },
    review: [
      "Gestão à vista: horários dos tiers e a matriz de competências são ilustrativos. Confirme a data de início do estágio (coloquei ago/2025)."
    ]
  }
};
