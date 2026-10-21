# Matheus Marcondes de Oliveira (Matheus Marcondes)

Estudante de Engenharia de Controle e Automação na UFMG construindo tecnologia em saúde — fundador da NeuroDynamics, estagiário de melhoria contínua na Abbott.

- Site: https://marcondes.dev
- Email: matheus@marcondes.dev
- Telefone: +55 (31) 98495-0000
- Local: Belo Horizonte, Brasil
- LinkedIn: https://www.linkedin.com/in/matheus-marcondes/
- GitHub: https://github.com/matheusmarcondes1
- ORCID: https://orcid.org/0009-0004-8475-1406
- Lattes: http://lattes.cnpq.br/9754941348911900

## Sobre

Sou graduando em Engenharia de Controle e Automação na UFMG e, desde 2019, venho rodeando uma pergunta: como uma tecnologia realmente chega à pessoa que precisa dela? Esse fio atravessa o trabalho de que mais gosto — próteses e órteses, neuromodulação, estimulação elétrica funcional e interfaces cérebro–computador — e me ensinou a valorizar verificação, risco e rigor regulatório tanto quanto a ideia em si. Criei a NeuroDynamics, um grupo estudantil de P&D em healthtech que hoje reúne cerca de 40 pessoas, porque queria engenharia e saúde na mesma sala; nos últimos tempos tenho aprendido de perto como é a excelência operacional, como estagiário de melhoria contínua na Abbott. Estou no começo de tudo isso e tento ser honesto sobre o que sei e o que ainda estou descobrindo — mas eu apareço, levo as coisas até o fim e me importo mais em construir algo realmente útil do que algo apenas impressionante.

## Experiência

### NeuroDynamics — Fundador e Diretor

Escola de Engenharia da UFMG · 2024-11 → atual · https://neurodynamics.dev/

Uma iniciativa estudantil multidisciplinar de P&D em healthtech que fundei e estruturei em modelo corporativo, com métodos ágeis e foco em soluções centradas no usuário e aplicáveis na clínica.

- Construí do zero — estatuto, organograma, marca e governança — um espaço onde engenharia, saúde e pesquisa aplicada trabalham lado a lado em tecnologias assistivas.
- Lidero uma equipe de ~40 pessoas em seis projetos ativos e cinco departamentos, com grupos acadêmicos e clínicos externos (incluindo ETH Zürich, InCor-USP e IMREA-USP).
- Implantei documentação alinhada à ISO 9001, KPIs e um framework de qualidade de P&D mapeado para ISO 13485, ISO 14971, IEC 62304 e ANVISA RDC 751/2022 — templates de DHF, matriz de gestão de riscos e relatórios de teste.
- Introduzi o acompanhamento de projetos no GitHub Projects com sprints quinzenais, reduzindo a entrega de funcionalidades de meses para semanas.
- Apoiei projetos em interfaces cérebro–computador, FES e vestíveis — incluindo Órion (FES-cycling) e Arabella (diagnóstico assistido por IA) — e coordenei nossa participação no Cybathlon 2024 (Suíça).

#### Opalina (Gerente de projeto; 2026-03 → atual)

Respirar também é músculo: estimulação do diafragma sincronizada com o ventilador, para que pacientes críticos continuem capazes de respirar sozinhos.

- Gerente de projeto desde março de 2026: planejamento, cadência de sprints, controle de escopo e reporte para uma equipe que mistura engenharia e área clínica.
- Transformei os nove objetivos específicos em um plano por fases — sensoriamento de fluxo, integração com o ReCARE®, lógica de controle, sistema embarcado BLE, interface de operação com fail-safe, protocolo terapêutico, calibração em bancada e viabilidade pré-clínica.
- Coordeno os parceiros: Visuri (plataforma ReCARE® e recursos) e InCor – HCFMUSP (estrutura e testes clínicos).
- Sou responsável pela análise de risco de um dispositivo que atua em pacientes sedados: requisitos de fail-safe e parada de emergência, limites de estimulação e perigos da interface com o ventilador.
- Apoiei a comunicação pública do projeto, incluindo a animação explicativa em que a cena desta página se baseia.

Números: 9 objetivos específicos no plano; 3 parceiros · Visuri, InCor, NeuroDynamics; 2 etapas de validação · bancada → pré-clínica; 0 estímulos fora da inspiração (regra de projeto)
Ferramentas: Flow sensing, Bluetooth LE, Embedded (ESP32 / Arduino), FES stimulators (ReCARE®, Connect®), ISO 14971 risk management, FMEA, Gantt · WBS, GitHub · Projects
Habilidades: Gestão de projetos, Gestão de stakeholders clínicos, Gestão de risco (ISO 14971), Requisitos de segurança · fail-safe, Planejamento e cronograma, Comunicação técnica
Página: https://marcondes.dev/neurodynamics/opalina/

#### SOMA (Product owner e desenvolvedor; 2025-06 → atual)

O sistema operacional da equipe: uma plataforma no estilo ERP/MES que roda a NeuroDynamics no dia a dia — pessoas, projetos, documentos e laboratório.

- Product owner e desenvolvedor desde junho de 2025: defino o roadmap, escrevo as especificações e publico as versões — hoje na v2.19.2.
- Abri e integrei todos os 54 pull requests do repositório atual, trabalhando com agentes de IA (Claude Code) e revisando cada mudança: 233 commits só entre julho e outubro de 2026.
- Modelei os dados com as regras no banco (“a regra mora no banco”): ~143 tabelas, ~140 políticas de RLS, gatilhos de auditoria e migrações que podem rodar duas vezes com segurança.
- Substituí a planilha de controle de documentos por códigos, revisões e aprovação por grupo revisor, com PDFs verificáveis (QR code + site de verificação) e termos de confidencialidade assinados via gov.br, guardados com hash SHA-256.
- Montei a rede de segurança: testes Playwright contra um stub do Supabase, testes unitários em Deno e testes SQL — cerca de 4.180 asserções no total.

Números: 31 módulos carregados sob demanda; 143 tabelas no banco · ~140 políticas RLS; 4180 asserções de teste (navegador, Deno, SQL); 54 pull requests entregues
Ferramentas: JavaScript, HTML / CSS, PostgreSQL, Supabase, Deno Edge Functions, Playwright, jsPDF · pdf-lib, PWA · Web Push, Git, GitHub · Projects, Claude Code (AI pair-programming)
Habilidades: Product ownership, Modelagem de dados, Segurança · menor privilégio (RLS), Testes automatizados, Gestão de versões, Desenvolvimento assistido por IA
Página: https://marcondes.dev/neurodynamics/soma/

#### Nebula (Desenvolvedor · bolsista PIBITI; 2025-02 → 2025-11)

Um instante de concentração pode acionar um músculo? Um sistema de estimulação elétrica funcional acionado por interface cérebro–computador.

- Desenvolvi a integração FES–BCI de ponta a ponta: aquisição de EEG com OpenBCI Ganglion via BLE, extração da banda β (~21 Hz) e o detector de concentração que aciona o estimulador.
- Montei a cadeia de acionamento — computador → relé inteligente → eletroestimulador neuromuscular — com menos de 250 ms entre detecção e estimulação.
- Co-desenhei e conduzi o piloto intra-sujeitos: 10 min de repouso vigilante, 5 min de calibração e blocos de 1–2 min de concentração motora, repouso e concentração não motora em ordem pseudo-aleatória.
- Fiz a triagem dos participantes (de 5 a 8, um com lesão medular) com o Mini-Mental e critérios de exclusão para condições neurológicas e fármacos que comprometem a atenção.
- Analisei as janelas e apresentei o trabalho em pôster na Semana do Conhecimento UFMG 2025, como bolsista PIBITI.

Números: 43.3% das janelas em concentração motora; <250ms da detecção à estimulação; ~21Hz marcador β de concentração; 2 canais de EEG · pré-frontais
Ferramentas: OpenBCI Ganglion, Bluetooth LE, Python, BrainFlow, NumPy / SciPy, Smart relay, FES stimulators (ReCARE®, Connect®)
Habilidades: Processamento de sinais EEG, Extração de potência por banda, Sistemas em tempo real, Desenho de protocolo experimental, Pesquisa com seres humanos, Comunicação científica
Página: https://marcondes.dev/neurodynamics/nebula/

#### Calima (Gerente de projeto; 2025-12 → 2026-03)

Não basta mover as pernas — é preciso fazer os músculos trabalharem de verdade: FES-cycling modular sincronizado por um sensor inercial sem fio.

- Conduzi o projeto como gerente de dezembro de 2025 a março de 2026: escopo, estrutura analítica, cronograma e sprints quinzenais da equipe.
- Transformei os seis objetivos específicos em entregas — seleção do sensor, integração IMU ↔ Connect®, sincronização ângulo→canal, protocolo terapêutico, interface para não especialistas e estudo de viabilidade.
- Mantive Visuri, Hospital Paulo de Tarso e equipe alinhados com revisões de requisitos, planejamento de testes e registro de decisões.
- Toquei o registro de riscos e a documentação de projeto seguindo a ISO 14971 e o framework de qualidade da equipe.
- Entreguei um projeto estruturado — plano, riscos e documentação — ao passar para o Opalina.

Números: 6 objetivos específicos, planejados e acompanhados; 3 parceiros · Visuri, NeuroDynamics, H. Paulo de Tarso; 4meses como gerente de projeto; 360° da pedalada mapeados em canais
Ferramentas: Gantt · WBS, GitHub · Projects, ISO 14971 risk management, FMEA, IMU · inertial sensing, Bluetooth LE, FES stimulators (ReCARE®, Connect®)
Habilidades: Gestão de projetos, Gestão de stakeholders indústria–hospital, Engenharia de requisitos, Gestão de riscos, Ágil / Scrum, Apoio a protocolo clínico
Página: https://marcondes.dev/neurodynamics/calima/

#### Direção do portfólio (Diretor; 2024-11 → atual)

Manter nove projetos, cinco departamentos e cerca de quarenta pessoas apontando para o mesmo lugar: tecnologia que chega ao paciente.

- Lidero uma equipe de cerca de 40 pessoas no portfólio, definindo prioridades e alocando pessoas entre projetos e departamentos.
- Implantei o GitHub Projects com sprints quinzenais, reduzindo a entrega de funcionalidades de meses para semanas.
- Conduzo a governança — relatório semanal da liderança, OKRs, controle de documentos e registro de decisões, hoje tudo dentro do SOMA.
- Coordeno parceiros externos: Visuri, InCor e IMREA (HCFMUSP), Hospital São Luiz Jabaquara, Hospital Paulo de Tarso e ETH Zürich.
- Oriento gerentes de projeto e supervisores — e assumo a gerência quando um projeto precisa (Calima, depois Opalina).

Números: 9 projetos no portfólio; ~40 pessoas em 5 departamentos; 6 parceiros da indústria, clínicos e acadêmicos; 2sem cadência de sprint
Ferramentas: GitHub · Projects, Gantt · WBS, ISO 13485 · ISO 9001, ISO 14971 risk management, Lean · A3 · PDCA, Notion
Habilidades: Liderança, Gestão de portfólio, OKRs e governança, Ágil em escala de equipe, Parcerias, Mentoria
Página: https://marcondes.dev/neurodynamics/direction/

#### Criação da NeuroDynamics (Fundador; 2024-11 → 2025-05)

Transformar uma pilha de oportunidades em uma equipe: estatuto, estrutura, marca, base de qualidade e as primeiras quarenta pessoas.

- Escrevi o estatuto e o modelo de governança e desenhei o organograma: uma diretoria e cinco departamentos — Pessoal, P&D, Clínico, Relações Institucionais e Marketing.
- Construí a marca e a identidade visual usadas em projetos, documentos e redes sociais.
- Conduzi os primeiros processos seletivos e o onboarding, crescendo do grupo fundador para cerca de 40 membros até maio de 2025.
- Montei a base de qualidade desde o primeiro dia: controle de documentos e KPIs alinhados à ISO 9001 e um framework de P&D mapeado para ISO 13485, ISO 14971, IEC 62304 e ANVISA RDC 751/2022 — templates de DHF, matriz de risco e relatórios de teste.
- Abri as primeiras parcerias com a indústria e com instituições clínicas.

Números: ~40 membros até maio de 2025; 5 departamentos + diretoria; 7meses da ideia à equipe em operação; 4 normas no framework de P&D
Ferramentas: ISO 13485 · ISO 9001, ISO 14971 risk management, GitHub · Projects, Canva · Figma, Notion, Gantt · WBS
Habilidades: Empreendedorismo, Desenho organizacional, Governança e estatuto, Recrutamento e onboarding, Construção de marca, Sistemas da qualidade
Página: https://marcondes.dev/neurodynamics/founding/

### Abbott Laboratories — Estagiário de Melhoria Contínua

Divisão Structural Heart, Dispositivos Médicos · 2025-08 → atual · https://www.abbott.com/en-us/homepage

Apoio a otimização de processos e a excelência operacional em um ambiente de manufatura de dispositivos médicos altamente regulado, aplicando métodos lean e análise de dados.

- Avaliei mecanismos centrais de excelência operacional — gestão diária, reuniões por tiers, avaliação 4P e Modelo Shingo — para fortalecer a maturidade de melhoria contínua no site.
- Construí um andon em software sobre a infraestrutura existente, evitando mais de US$11 mil em hardware de automação, reduzindo desperdício de movimentação e tempo e o risco de geração de particulado em salas limpas.
- Criei ferramentas de BI e desempenho para decisões baseadas em dados, incluindo uma matriz de competências Lean Six Sigma em Power BI e um controle de carga de trabalho em Excel para equipes de inspeção.

#### Andon em software (Melhoria contínua · desenvolvimento; 2025-09 → 2026-02)

Um andon construído sobre a infraestrutura que a linha já tinha: mais de US$11 mil evitados, menos deslocamento, menos partículas na sala limpa.

- Mapeei problemas de fluxo e causas de parada na linha junto com produção e suporte.
- Projetei e construí a aplicação de andon: chamado no posto, painel ao vivo com cronômetro dos chamados e escalonamento.
- Construí a análise: chamados, tempos de resposta e de resolução, e um mapa de calor que expõe gargalos ao longo do fluxo de manufatura.
- Implantei sobre a infraestrutura existente, evitando mais de US$11 mil em instalação (soft savings).

Números: US$11k+ de instalação evitados (soft savings); 0 hardware novo instalado; 4 ganhos · fluxo, produtividade, movimentação, particulado
Ferramentas: Power Apps, SharePoint, Power Automate, Power BI, Excel, Lean · A3 · PDCA
Habilidades: Manufatura enxuta, Mapeamento de processos, Desenvolvimento de aplicações, Visualização de dados, Gestão da mudança, Sala limpa / BPF
Página: https://marcondes.dev/abbott/andon/

#### Gestão à vista e BI (Estagiário de melhoria contínua; 2025-08 → atual)

O lado rotina da melhoria contínua: quadros, tiers e dashboards que tornam os problemas visíveis antes que virem paradas.

- Mantenho os quadros de gestão à vista e os KPIs revisados nas reuniões diárias por tiers — segurança, qualidade, entrega, custo e pessoas.
- Avaliei mecanismos de excelência operacional — gestão diária, reuniões por tiers, avaliação 4P e Modelo Shingo — para fortalecer a maturidade de melhoria contínua no site.
- Construí ferramentas de BI: uma matriz de competências Lean Six Sigma em Power BI e um sistema de controle de carga de trabalho em Excel para as equipes de inspeção.

Números: 4 tiers de reunião, da linha à liderança; 5 famílias de KPI · S Q D C P; 2 ferramentas de BI construídas
Ferramentas: Power BI, Excel, Lean · A3 · PDCA, SharePoint
Habilidades: Lean Six Sigma, Gestão diária, Modelo Shingo, Desenho de KPIs, Análise de dados, Facilitação
Página: https://marcondes.dev/abbott/visual/

### LEB & LABBIO — Pesquisador de Graduação

UFMG · 2023-03 → atual · https://www.labbioufmg.org/

Contribuo com pesquisa aplicada em tecnologias biomédicas e assistivas, apoiando projeto, desenvolvimento e validação experimental. O trabalho passou por estimulação elétrica funcional e interfaces cérebro–computador para reabilitação motora, e pela biomecânica de próteses e órteses de membro inferior.

#### Cybathlon 2024 (Team manager; 2023-08 → 2024-10)

De um protótipo parado à largada em Zurique: levando a equipe de FES-cycling da UFMG às 'Olimpíadas ciborgues'.

- Iniciei o projeto ao entrar na UFMG: montei a equipe e fui o seu team manager.
- Recuperei a tecnologia de FES-cycling do laboratório, que estava parada, e organizei o trabalho para deixá-la pronta para competir.
- Planejei toda a campanha — cronograma, orçamento, viagem e logística de equipamentos — para competir presencialmente em Zurique, e consegui a verba para chegar lá.
- Fui o ponto de contato da equipe com a organização do Cybathlon e com as instituições parceiras.
- Fui responsável pela documentação de FMEA e de gerenciamento de riscos do sistema e da operação de prova.

Números: 67 equipes no Cybathlon 2024; 24 países; ~6000 espectadores no local · +15.500 online; 1960m distância da FES Bike Race
Ferramentas: FMEA, ISO 14971 risk management, Gantt · WBS, FES stimulators (ReCARE®, Connect®), Excel, Embedded (ESP32 / Arduino)
Habilidades: Formação de equipe, Captação de recursos, Logística internacional, Gestão de riscos · FMEA, Gestão de stakeholders, Integração de sistemas
Página: https://marcondes.dev/leb-labbio/cybathlon/

#### Prótese de membro inferior · FINEP (Planejamento do projeto; 2024-11 → 2025-01)

O projeto que mostrou que havia mais trabalho do que um laboratório conseguia carregar — e virou o motivo de a NeuroDynamics existir.

- Ajudei a planejar o trabalho da prótese: requisitos e os pacotes de trabalho — mecânica e materiais, eletrônica e sensores, protocolo clínico, regulatório (ANVISA) e gestão do projeto.
- Mapeei as pessoas e competências que cada pacote exigia, junto com os outros projetos que chegavam ao laboratório.
- Propus uma estrutura capaz de absorver tudo isso e abrir as portas para a graduação — e fundei a NeuroDynamics para ser essa estrutura.

Números: 5 pacotes de trabalho mapeados; 3meses do início a uma nova organização; 1 grupo estudantil de P&D fundado
Ferramentas: Gantt · WBS, CAD (SolidWorks), ISO 13485 · ISO 9001, Excel
Habilidades: Definição de escopo, Estrutura analítica de projeto, Planejamento de capacidade, Regulação de dispositivos médicos, Pensamento sistêmico
Página: https://marcondes.dev/leb-labbio/finep/

### CEFET-MG — Técnico em Mecatrônica

Belo Horizonte · 2019-02 → 2022-12 · https://www.cefetmg.br/

Curso técnico integrado em Mecatrônica no Centro Federal de Educação Tecnológica de Minas Gerais — onde começou a pergunta sobre tecnologia chegando às pessoas, com um TCC sobre pés protéticos.

#### Pés protéticos, medidos (Autor · trabalho de conclusão de curso; 2022-02 → 2022-11)

Quanto o projeto de um pé protético muda o jeito de alguém andar? Uma revisão de biomecânica com um modelo de marcha em MATLAB.

- Conduzi uma revisão bibliográfica estruturada no PubMed: montei as strings de busca, fiz a triagem dos registros e extraí dados de marcha dos estudos incluídos.
- Construí um modelo do ciclo de marcha em MATLAB para comparar a cinemática do tornozelo e a restituição de energia entre os projetos de pé.
- Comparei os projetos por restituição de energia, impulso, simetria da marcha e adequação a diferentes níveis de atividade (K-levels).
- Escrevi e defendi o trabalho.

Números: 34 estudos incluídos na revisão; 3 projetos de pé comparados; 100% do ciclo de marcha modelado; 1 modelo de marcha em MATLAB
Ferramentas: MATLAB, PubMed, Zotero, Excel, LaTeX
Habilidades: Biomecânica, Revisão bibliográfica estruturada, Modelagem e simulação, Análise de dados, Escrita científica
Página: https://marcondes.dev/cefet/tcc/

## Formação

- Engenharia de Controle e Automação — Universidade Federal de Minas Gerais (UFMG) (Previsão 2028)
- Técnico em Mecatrônica — Centro Federal de Educação Tecnológica (CEFET-MG) (2022 · TCC sobre pés protéticos)

## Habilidades

- Desenvolvimento de Dispositivos Médicos: P&D, projeto, verificação e validação, pesquisa clínica, regulatório
- Qualidade e Regulatório: ISO 13485, ISO 14971, IEC 62304, ISO 9001, ANVISA RDC 751/2022
- Excelência Operacional: Lean Six Sigma, Modelo Shingo, avaliação 4P, gestão diária e por tiers
- Domínios Técnicos: Neuromodulação, FES, interfaces cérebro–computador, próteses e órteses, vestíveis
- Projetos e Dados: Ágil / GitHub Projects, KPIs, Power BI, Excel, análise de dados

## Idiomas

- Português — nativo
- Inglês — profissional (B2)

## Liderança e Governança

- Membro, Conselho de Projetos (2025 – Atual) — Escola de Engenharia da UFMG
- Membro, Congregação (2024 – 2025) — Escola de Engenharia da UFMG

## Cursos e Certificações

- McKinsey Forward — McKinsey & Company
- RTL Digital Design — Cadence (CADEMICS, 2024)
- Metodologia de Pesquisa — Universidade de São Paulo (USP)
- Inglês B2 (CEFR) — Cambridge Assessment
