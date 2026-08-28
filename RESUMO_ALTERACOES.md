# Resumo das alterações — NOVUM

## Objetivo

Organizar a landing page estática do NOVUM em uma estrutura mais limpa, sustentável e acessível, preservando sua identidade visual e comportamento.

## Estrutura criada

```text
eu-x20/
├── api/
│   ├── booking.js
│   ├── links.js
│   └── stats.js
├── outputs/
│   ├── assets/
│   │   ├── novum-live.png
│   │   └── novum-stage.png
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── vercel.json
└── RESUMO_ALTERACOES.md
```

## Mudanças realizadas

- As duas fotos reais enviadas passaram a estruturar a narrativa: pista lotada no primeiro impacto e palco, fumaça e palmeiras no segundo campo visual.
- Redesign completo da landing page para uma linguagem urbana de sinalização noturna, inspirada em mapas de rota, placas públicas e cultura de pista — sem copiar a identidade da referência de Behance.
- Novo sistema visual documentado em `DESIGN.md`: asfalto preto, papel off-white, azul de rota e laranja de segurança.
- Reestruturação do primeiro viewport em três áreas: identidade do artista, fotografia de performance e rota de canais; o booking ocupa uma placa de ação em toda a base.
- Canais sociais convertidos de cards genéricos para sinais direcionais com setas SVG e estados de hover/foco.
- Composição de referência gerada e aprovada por delegação do usuário, preservada em `.impeccable/mocks/novum-wayfinding-approved.png`.
- Separação de responsabilidades:
  - `index.html`: estrutura, conteúdo e referências externas.
  - `styles.css`: tokens, layout, responsividade e estados visuais.
  - `script.js`: animações GSAP, Lenis e ScrollTrigger.
- Remoção de CSS e JavaScript inline do HTML.
- Centralização de cores, fontes, largura de conteúdo e foco de teclado em variáveis CSS.
- Melhoria da semântica do documento com `nav`, `main`, `section`, `footer`, rótulos e referência explícita ao título principal.
- Inclusão de foco visível para navegação por teclado.
- Inclusão de suporte a `prefers-reduced-motion`, mantendo o conteúdo visível quando animações são reduzidas.
- Scripts externos configurados com `defer` para não bloquear a renderização inicial.
- Imagem principal com dimensões declaradas e `fetchpriority="high"` para reduzir instabilidade visual no carregamento.
- Link externo do Instagram protegido com `rel="noopener noreferrer"`.
- Estados de interação preservados: hover, active e layout adaptado para telas menores.
- Identificadores e classes renomeados para refletir melhor suas responsabilidades, como `site-nav`, `content` e `signal-dot`.
- Formulário de booking conectado ao WhatsApp `+55 51 99724-7382`, com nome, e-mail, cidade, data, tipo e descrição do evento na mensagem pronta.
- Textos técnicos pequenos das métricas removidos; a leitura visual agora mostra apenas SoundCloud, Spotify, Total e os números em tipografia de display.
- Endpoint online `GET /api/stats` criado para recalcular as 10 faixas próprias do SoundCloud e somar com as 5 contagens públicas confirmadas do Spotify.
- Cache de CDN configurado por uma hora, com atualização no carregamento, a cada hora enquanto a página estiver aberta e ao retornar para uma aba que ficou inativa.
- Fallback seguro mantém o último número confirmado do Spotify quando a página pública não entrega as contagens ao servidor.
- Site publicado em produção na Vercel: `https://eu-x20.vercel.app`.

## Validação executada

Foi executado o detector da skill local de qualidade visual sobre `index.html`, `styles.css` e `script.js`.

- A página foi verificada em desktop (1440px) e mobile (390px): conteúdo presente, sem overflow horizontal e sem erros de console.
- O Snyk analisou os diretórios publicados `api/` e `outputs/` e encontrou **0 vulnerabilidades** em ambos.
- A procedência dos assets PNG foi registrada e o scan de proveniência retornou **0 arquivos pendentes**.
- O detector operou em modo reduzido porque dependências de análise HTML/CSS não estão instaladas no ambiente; por isso, a análise de contraste e cascata não foi calculada.
- A única observação do detector foi a rota azul ser interpretada como uma borda lateral. É um falso positivo: a linha conecta estações e canais, portanto é uma parte funcional da interface.

## Observação de dados

- SoundCloud em 2026-08-28: **33.632 reproduções** em 10 faixas próprias.
- Spotify/Novumbr: **22.951 reproduções** nas 5 faixas que expõem número público.
- Total geral atual: **56.583 reproduções**.
- O Web API oficial do Spotify não expõe streams; por isso, a coleta tenta a página pública e usa o último total confirmado quando a plataforma não entrega esses números ao servidor.

## Arquivos principais

- `outputs/index.html`
- `outputs/styles.css`
- `outputs/script.js`
- `PRODUCT.md`
- `DESIGN.md`
