# O que revisar

Tudo o que eu supus, inventei ou não consegui confirmar está listado aqui, por página. O conteúdo fica em `src/content/` — edite lá e rode `node src/build.mjs` (e `node src/pdf.mjs` para os PDFs).

## Geral

- Datas aproximadas em várias experiências (veja abaixo). A data de hoje usada nas linhas do tempo é 2026-10 (`NOW` em `src/content/site.mjs`).
- Os gráficos marcados como "dados ilustrativos" na página não são dados reais — substitua quando tiver os números.
- O texto do currículo na página inicial foi mantido; só a linha da Abbott sobre o andon foi atualizada com os US$11 mil.
- Não consegui abrir o ascii-magic.com daqui (o domínio não resolveu na rede deste ambiente). As animações seguem a linguagem ASCII clássica: rampas de densidade, arte de linha `_.-'`, caracteres de bloco.
- Os PDFs (`cv/*.pdf`) saem de `cv/en.html` e `cv/pt.html` com `node src/pdf.mjs` (Playwright + Chromium + pypdf). Rode depois de mudar o conteúdo.

## NeuroDynamics

- Opalina: confirmar o que exatamente coordeno com Visuri e InCor e a fase atual (bancada / pré-clínica).
- Opalina: confirmar a frase sobre a animação explicativa (quem produziu).
- Opalina: as métricas são do plano (9 objetivos, 3 parceiros, 2 etapas); '0 estímulos fora da inspiração' é regra de projeto, não resultado medido.
- SOMA: o repositório `membro` só tem histórico a partir de 2026-07 (versões 1.x–13.0 ficavam no repo `nro-pessoal`). Mantive o início em junho de 2025, como você disse — confirme.
- SOMA: o repo não usa os termos ERP/MES; descrevi como 'plataforma no estilo ERP/MES'. Ajuste se preferir outro rótulo.
- SOMA: mencionei explicitamente o trabalho com agentes de IA (Claude Code), já que 172 dos 233 commits são do agente. Remova se não quiser expor isso.
- Nebula: confirmar as bibliotecas (Python, BrainFlow, NumPy/SciPy) e o modelo do relé inteligente.
- Nebula: o gráfico de EEG é ilustrativo; se tiver os dados reais (proporção por iteração), dá para trocar por um gráfico real.
- Nebula: adicionar o link do pôster (PDF) se quiser — deixei o campo vazio.
- Calima: os ângulos de ativação por músculo no gráfico polar são ilustrativos (típicos de FES-cycling), não do projeto.
- Calima: confirmar a frase de passagem do projeto em março de 2026 e os entregáveis que você de fato conduziu.
- Direção: a barra do quadro de status é a fase estimada de cada projeto (não %). Confirme os status (vieram da planilha).
- Direção: o gráfico 'antes/depois dos sprints' (12 → 3 semanas) é ilustrativo — ajuste com os números reais, se tiver.
- Direção: confirmar a lista de parceiros (incluí ETH Zürich, que já estava no currículo).
- Criação: a curva de membros (4 → 40 entre nov/24 e mai/25) é ilustrativa — confirme os números de cada processo seletivo.
- Criação: confirmar ferramentas (Notion, Canva/Figma) e quem fez a marca.

## Abbott Laboratories

- Início do estágio: coloquei ago/2025.
- Andon: confirmar a stack (coloquei Power Apps, SharePoint, Power Automate, Power BI) e as datas (set/2025 → fev/2026).
- Andon: o mapa de calor é ilustrativo; o custo de hardware usa o seu número (> US$11 mil). Verifique o que pode ser divulgado publicamente sobre a Abbott.
- Gestão à vista: horários dos tiers e a matriz de competências são ilustrativos. Confirme a data de início do estágio (coloquei ago/2025).

## LEB & LABBIO

- Início: mar/2023 (entrada na UFMG).
- Cybathlon: confirmar datas do projeto (coloquei ago/2023 → out/2024), nome da equipe, piloto e quanto foi captado.
- Cybathlon: números do evento vêm de fontes públicas (67 equipes, 24 países, ~6.000 no local, 15.500 online, prova de 1.960 m). A matriz de FMEA é ilustrativa.
- Cybathlon: citar nominalmente as parcerias que saíram do evento, se quiser (ex.: ETH Zürich).
- Prótese FINEP: datas (nov/2024 → jan/2025), seu papel e os pacotes de trabalho são suposições minhas — revise tudo.
- Prótese FINEP: as cotas de 480 mm / 260 mm na animação são só ilustrativas.

## CEFET-MG

- Curso: fev/2019 → dez/2022.
- TCC: título, datas (fev → nov/2022), números da revisão (412 → 268 → 61 → 34), percentuais de energia e ferramentas (Zotero, LaTeX, Excel) foram inventados para você revisar.
- TCC: confirmar quais projetos de pé você comparou de fato e se houve modelo em MATLAB.
