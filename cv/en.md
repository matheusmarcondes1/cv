# Matheus Marcondes de Oliveira (Matheus Marcondes)

Control & Automation Engineering student at UFMG building health technology — founder of NeuroDynamics, continuous-improvement intern at Abbott.

- Website: https://marcondes.dev
- Email: matheus@marcondes.dev
- Phone: +55 (31) 98495-0000
- Location: Belo Horizonte, Brazil
- LinkedIn: https://www.linkedin.com/in/matheus-marcondes/
- GitHub: https://github.com/matheusmarcondes1
- ORCID: https://orcid.org/0009-0004-8475-1406
- Lattes: http://lattes.cnpq.br/9754941348911900

## About

I'm an undergraduate in Control and Automation Engineering at UFMG, and since 2019 I've kept circling one question: how does a piece of technology actually reach the person who needs it? That thread runs through the work I care about most — prosthetics and orthoses, neuromodulation, functional electrical stimulation, and brain–computer interfaces — and it's taught me to value verification, risk, and regulatory rigor as much as the idea itself. I started NeuroDynamics, a student healthtech R&D group now around 40 people, because I wanted engineering and healthcare in the same room; lately I've been learning what operational excellence looks like up close as a continuous-improvement intern at Abbott. I'm early in all of this, and I try to stay honest about what I know and what I'm still figuring out — but I show up, I follow through, and I care more about building something genuinely useful than something merely impressive.

## Experience

### NeuroDynamics — Founder & Head

UFMG School of Engineering · 2024-11 → present · https://neurodynamics.dev/

A multidisciplinary student healthtech R&D initiative I founded and structured under a corporate-style model, with agile methods and a focus on user-centered, clinically applicable solutions.

- Built it from the ground up — statute, org chart, brand, and governance — creating a space where engineering, healthcare, and applied research work side by side on assistive health technologies.
- Lead a team of ~40 across six active projects and five departments, working with external academic and clinical research groups (including ETH Zürich, InCor-USP, and IMREA-USP).
- Set up ISO 9001-aligned documentation, KPIs, and an R&D quality framework mapped to ISO 13485, ISO 14971, IEC 62304, and ANVISA RDC 751/2022 — DHF templates, a risk-management matrix, and test reports.
- Introduced project tracking in GitHub Projects with bi-weekly sprints, cutting feature delivery from months to weeks.
- Supported projects spanning brain–computer interfaces, FES, and wearables — including Órion (FES-cycling) and Arabella (AI-assisted diagnostics) — and coordinated our participation in Cybathlon 2024 (Switzerland).

#### Opalina (Project manager; 2026-03 → present)

Breathing is muscle work too: diaphragm stimulation synchronized with the ventilator, to keep critically ill patients able to breathe on their own.

- Project manager since March 2026: planning, sprint cadence, scope control and reporting for a team that mixes engineering and clinical people.
- Turned the nine specific objectives into a phased plan — flow sensing, ReCARE® integration, control logic, BLE embedded system, operator interface with fail-safe, therapeutic protocol, bench calibration and pre-clinical feasibility.
- Coordinate the partners: Visuri (ReCARE® platform and resources) and InCor – HCFMUSP (clinical structure and tests).
- Own the risk analysis for a device that acts on sedated patients: fail-safe and emergency-stop requirements, stimulation limits and the hazards of the ventilator interface.
- Supported the project's public communication, including the explanatory animation this page's scene is based on.

Numbers: 9 specific objectives in the plan; 3 partners · Visuri, InCor, NeuroDynamics; 2 validation stages · bench → pre-clinical; 0 stimuli outside inspiration (design rule)
Tools: Flow sensing, Bluetooth LE, Embedded (ESP32 / Arduino), FES stimulators (ReCARE®, Connect®), ISO 14971 risk management, FMEA, Gantt · WBS, GitHub · Projects
Skills: Project management, Clinical stakeholder management, Risk management (ISO 14971), Safety requirements · fail-safe, Planning & scheduling, Technical communication
Page: https://marcondes.dev/neurodynamics/opalina/

#### SOMA (Product owner & developer; 2025-06 → present)

The team's operating system: an ERP/MES-style platform that runs NeuroDynamics day to day — people, projects, documents and the lab.

- Product owner and developer since June 2025: I define the roadmap, write the specifications and ship the releases — up to v2.19.2 today.
- Opened and merged all 54 pull requests of the current repository, working with AI coding agents (Claude Code) and reviewing every change: 233 commits between July and October 2026 alone.
- Designed the data model with the rules in the database (“a regra mora no banco”): ~143 tables, ~140 RLS policies, audit triggers and migrations that can safely run twice.
- Replaced the document-control spreadsheet with codes, revisions and reviewer-group approval, plus verifiable PDFs (QR code + verifier site) and gov.br-signed confidentiality agreements stored with their SHA-256 hash.
- Built the safety net: Playwright tests against a Supabase stub, Deno unit tests and SQL tests — about 4,180 assertions in total.

Numbers: 31 modules loaded on demand; 143 database tables · ~140 RLS policies; 4180 test assertions (browser, Deno, SQL); 54 pull requests shipped
Tools: JavaScript, HTML / CSS, PostgreSQL, Supabase, Deno Edge Functions, Playwright, jsPDF · pdf-lib, PWA · Web Push, Git, GitHub · Projects, Claude Code (AI pair-programming)
Skills: Product ownership, Data modeling, Security · least privilege (RLS), Automated testing, Release management, AI-assisted development
Page: https://marcondes.dev/neurodynamics/soma/

#### Nebula (Developer · PIBITI scholar; 2025-02 → 2025-11)

Can a moment of focus switch on a muscle? A functional electrical stimulation system triggered by a brain–computer interface.

- Developed the FES–BCI integration end to end: EEG acquisition with an OpenBCI Ganglion over BLE, β-band (~21 Hz) feature extraction and the concentration detector that switches the stimulator.
- Built the trigger chain — computer → smart relay → neuromuscular stimulator — keeping detection-to-stimulation under 250 ms.
- Co-designed and ran the intra-subject pilot: 10 min of vigilant rest, 5 min of calibration, then 1–2 min blocks of motor concentration, rest and non-motor concentration in pseudo-random order.
- Screened participants (5 to 8, one with spinal cord injury) with the Mini-Mental State Examination and exclusion criteria for neurological conditions and attention-affecting drugs.
- Analysed the windows and presented the work as a poster at UFMG's Semana do Conhecimento 2025, as a PIBITI technological-initiation scholar.

Numbers: 43.3% of windows in motor concentration; <250ms from detection to stimulation; ~21Hz β-band marker of concentration; 2 EEG channels · prefrontal
Tools: OpenBCI Ganglion, Bluetooth LE, Python, BrainFlow, NumPy / SciPy, Smart relay, FES stimulators (ReCARE®, Connect®)
Skills: EEG signal processing, Band-power feature extraction, Real-time systems, Experimental protocol design, Human-subject research, Scientific communication
Page: https://marcondes.dev/neurodynamics/nebula/

#### Calima (Project manager; 2025-12 → 2026-03)

Not just moving the legs — making the muscles actually work: modular FES-cycling synchronized by a wireless inertial sensor.

- Led the project as project manager from December 2025 to March 2026: scope, work breakdown, schedule and the team's bi-weekly sprints.
- Turned the six specific objectives into deliverables — sensor selection, IMU ↔ Connect® integration, angle-to-channel synchronization, therapeutic protocol, an interface for non-specialists and the feasibility study.
- Kept Visuri, Hospital Paulo de Tarso and the team aligned through requirement reviews, test planning and a decision log.
- Ran the risk register and design documentation following ISO 14971 and the team's quality framework.
- Handed over a structured project — plan, risks and documentation — when I moved on to Opalina.

Numbers: 6 specific objectives, planned and tracked; 3 partners · Visuri, NeuroDynamics, H. Paulo de Tarso; 4mo as project manager; 360° of the stroke mapped to channels
Tools: Gantt · WBS, GitHub · Projects, ISO 14971 risk management, FMEA, IMU · inertial sensing, Bluetooth LE, FES stimulators (ReCARE®, Connect®)
Skills: Project management, Industry–hospital stakeholder management, Requirements engineering, Risk management, Agile / Scrum, Clinical protocol support
Page: https://marcondes.dev/neurodynamics/calima/

#### Directing the portfolio (Director; 2024-11 → present)

Keeping nine projects, five departments and about forty people pointed at the same thing: technology that reaches patients.

- Lead a team of about 40 across the portfolio, setting priorities and allocating people between projects and departments.
- Introduced GitHub Projects with bi-weekly sprints, cutting feature delivery from months to weeks.
- Run governance — weekly leadership report, OKRs, document control and decision records, now all inside SOMA.
- Coordinate external partners: Visuri, InCor and IMREA (HCFMUSP), Hospital São Luiz Jabaquara, Hospital Paulo de Tarso and ETH Zürich.
- Mentor project managers and supervisors — and step in as PM when a project needs it (Calima, then Opalina).

Numbers: 9 projects in the portfolio; ~40 people across 5 departments; 6 industry, clinical and academic partners; 2wk sprint cadence
Tools: GitHub · Projects, Gantt · WBS, ISO 13485 · ISO 9001, ISO 14971 risk management, Lean · A3 · PDCA, Notion
Skills: Leadership, Portfolio management, OKRs & governance, Agile at team scale, Partnerships, Mentoring
Page: https://marcondes.dev/neurodynamics/direction/

#### Founding NeuroDynamics (Founder; 2024-11 → 2025-05)

Turning a pile of opportunities into a team: statute, structure, brand, quality backbone and the first forty people.

- Wrote the statute and governance model and designed the org chart: a board plus five departments — People, R&D, Clinical, Institutional Relations and Marketing.
- Built the brand and the visual identity used across projects, documents and social media.
- Ran the first selection processes and onboarding, growing from the founding group to about 40 members by May 2025.
- Set up the quality backbone from day one: ISO 9001-aligned document control and KPIs, and an R&D framework mapped to ISO 13485, ISO 14971, IEC 62304 and ANVISA RDC 751/2022 — DHF templates, risk matrix and test reports.
- Opened the first partnerships with industry and clinical institutions.

Numbers: ~40 members by May 2025; 5 departments + board; 7mo from idea to operating team; 4 standards in the R&D framework
Tools: ISO 13485 · ISO 9001, ISO 14971 risk management, GitHub · Projects, Canva · Figma, Notion, Gantt · WBS
Skills: Entrepreneurship, Organizational design, Governance & statute, Recruiting & onboarding, Brand building, Quality systems
Page: https://marcondes.dev/neurodynamics/founding/

### Abbott Laboratories — Continuous Improvement Intern

Structural Heart Division, Medical Devices · 2025-08 → present · https://www.abbott.com/en-us/homepage

Support process optimization and operational excellence in a highly regulated medical-device manufacturing environment, applying lean methods and data analysis.

- Assessed core operational-excellence mechanisms — daily management, tiered meetings, 4P assessment, and the Shingo Model — to strengthen continuous-improvement maturity across the site.
- Built a software andon on existing infrastructure that avoided more than US$11k in automation hardware, cutting motion and time waste on the floor and lowering particle-generation risk in cleanroom areas.
- Created BI and performance tooling for data-informed decisions, including a Power BI Lean Six Sigma skills matrix and an Excel workload-control system for inspection teams.

#### Software andon (Continuous improvement · builder; 2025-09 → 2026-02)

An andon built on the infrastructure the line already had: more than US$11k avoided, less walking, fewer particles in the cleanroom.

- Mapped flow problems and stoppage causes on the line together with production and support.
- Designed and built the andon application: station call, live board with call timers, and escalation.
- Built the analytics: calls, response and resolution times, and a heat map that exposes bottlenecks along the manufacturing flow.
- Deployed it on the existing infrastructure, avoiding more than US$11k in installation (soft savings).

Numbers: US$11k+ installation cost avoided (soft savings); 0 new hardware installed; 4 gains · flow, productivity, movement, particles
Tools: Power Apps, SharePoint, Power Automate, Power BI, Excel, Lean · A3 · PDCA
Skills: Lean manufacturing, Process mapping, Application development, Data visualization, Change management, Cleanroom / GMP awareness
Page: https://marcondes.dev/abbott/andon/

#### Visual management & BI (Continuous improvement intern; 2025-08 → present)

The routine side of continuous improvement: boards, tiers and dashboards that make problems visible before they become stoppages.

- Keep visual-management boards and the KPIs reviewed in daily tiered meetings — safety, quality, delivery, cost and people.
- Assessed operational-excellence mechanisms — daily management, tiered meetings, 4P assessment and the Shingo Model — to strengthen continuous-improvement maturity across the site.
- Built BI tools: a Power BI Lean Six Sigma skills matrix and an Excel workload-control system for inspection teams.

Numbers: 4 meeting tiers, line to leadership; 5 KPI families · S Q D C P; 2 BI tools built
Tools: Power BI, Excel, Lean · A3 · PDCA, SharePoint
Skills: Lean Six Sigma, Daily management, Shingo Model, KPI design, Data analysis, Facilitation
Page: https://marcondes.dev/abbott/visual/

### LEB & LABBIO — Undergraduate Researcher

UFMG · 2023-03 → present · https://www.labbioufmg.org/

Contribute to applied research in biomedical and assistive technologies, supporting design, development, and experimental validation. Work has spanned functional electrical stimulation and brain–computer interfaces for motor rehabilitation, and the biomechanics of lower-limb prosthetics and orthoses.

#### Cybathlon 2024 (Team manager; 2023-08 → 2024-10)

From a stalled prototype to the start line in Zurich: taking UFMG's FES-cycling team to the 'cyborg Olympics'.

- Started the project when I joined UFMG: assembled the team and served as its team manager.
- Brought the lab's FES-cycling technology, which had been idle, back to life and organized the work to make it race-ready.
- Planned the whole campaign — schedule, budget, travel and equipment logistics — to compete in person in Zurich, and raised the funding to get there.
- Was the team's point of contact with the Cybathlon organization and partner institutions.
- Owned the FMEA and risk-management documentation for the system and for race operations.

Numbers: 67 teams at Cybathlon 2024; 24 countries; ~6000 spectators on site · +15,500 online; 1960m FES Bike Race distance
Tools: FMEA, ISO 14971 risk management, Gantt · WBS, FES stimulators (ReCARE®, Connect®), Excel, Embedded (ESP32 / Arduino)
Skills: Team building, Fundraising, International logistics, Risk management · FMEA, Stakeholder management, Systems integration
Page: https://marcondes.dev/leb-labbio/cybathlon/

#### Lower-limb prosthesis · FINEP (Project planning; 2024-11 → 2025-01)

The project that showed there was more work than one lab could carry — and became the reason NeuroDynamics exists.

- Helped plan the prosthesis work: requirements and the work packages — mechanics & materials, electronics & sensors, clinical protocol, regulatory (ANVISA) and project management.
- Mapped the people and skills each package needed, alongside the other projects reaching the lab.
- Proposed a structure that could absorb all of it and open the door to undergraduates — and founded NeuroDynamics to be that structure.

Numbers: 5 work packages mapped; 3mo from kickoff to a new organization; 1 student R&D group founded
Tools: Gantt · WBS, CAD (SolidWorks), ISO 13485 · ISO 9001, Excel
Skills: Project scoping, Work breakdown structure, Capacity planning, Medical-device regulation, Systems thinking
Page: https://marcondes.dev/leb-labbio/finep/

### CEFET-MG — Technical Diploma in Mechatronics

Belo Horizonte · 2019-02 → 2022-12 · https://www.cefetmg.br/

Technical high-school diploma in Mechatronics at the Federal Center for Technological Education of Minas Gerais — where the question about technology reaching people started, with a final project on prosthetic feet.

#### Prosthetic feet, measured (Author · technical final project; 2022-02 → 2022-11)

How much does the design of a prosthetic foot change the way someone walks? A biomechanics review with a MATLAB gait model.

- Ran a structured literature review on PubMed: built the search strings, screened the records and extracted gait data from the included studies.
- Built a MATLAB model of the gait cycle to compare ankle kinematics and energy return across foot designs.
- Compared the designs on energy return, push-off, gait symmetry and fit for different activity levels (K-levels).
- Wrote and defended the thesis.

Numbers: 34 studies included in the review; 3 foot designs compared; 100% of the gait cycle modelled; 1 MATLAB gait model
Tools: MATLAB, PubMed, Zotero, Excel, LaTeX
Skills: Biomechanics, Structured literature review, Modeling & simulation, Data analysis, Scientific writing
Page: https://marcondes.dev/cefet/tcc/

## Education

- B.Eng. Control & Automation Engineering — Federal University of Minas Gerais (UFMG) (Expected 2028)
- Technical Diploma in Mechatronics — Federal Center for Technological Education (CEFET-MG) (2022 · final project on prosthetic feet)

## Skills

- Medical Device Development: R&D, design, verification & validation, clinical research, regulatory
- Quality & Regulatory: ISO 13485, ISO 14971, IEC 62304, ISO 9001, ANVISA RDC 751/2022
- Operational Excellence: Lean Six Sigma, Shingo Model, 4P assessment, daily & tiered management
- Technical Domains: Neuromodulation, FES, brain–computer interfaces, prosthetics & orthoses, wearables
- Project & Data: Agile / GitHub Projects, KPIs, Power BI, Excel, data analysis

## Languages

- Portuguese — native
- English — professional (B2)

## Leadership & Governance

- Member, Project Council (2025 – Present) — UFMG School of Engineering
- Member, Congregation (2024 – 2025) — UFMG School of Engineering

## Courses & Certifications

- McKinsey Forward — McKinsey & Company
- RTL Digital Design — Cadence (CADEMICS, 2024)
- Research Methodology — University of São Paulo (USP)
- English B2 (CEFR) — Cambridge Assessment
