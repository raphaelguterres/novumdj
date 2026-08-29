# NOVUM — Booking Experience

[![CI](https://github.com/raphaelguterres/novumdj/actions/workflows/ci.yml/badge.svg)](https://github.com/raphaelguterres/novumdj/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-novumdj.vercel.app-050505?style=flat-square)](https://novumdj.vercel.app)

Landing page de alta conversão para o **NOVUM**, DJ/Selecta. O projeto apresenta a identidade do artista, prova social por reproduções públicas e um fluxo de booking que prepara o briefing do lead diretamente no WhatsApp.

**[Ver site em produção →](https://novumdj.vercel.app)**

## O que a experiência resolve

- Expõe a proposta do artista no primeiro viewport, com direção visual editorial e foco em conversão.
- Centraliza os canais oficiais de Instagram, Spotify e SoundCloud.
- Mostra números públicos de reprodução sem tornar a interface técnica ou poluída.
- Transforma o formulário em um briefing organizado para o WhatsApp de booking.
- Mantém a página responsiva, acessível e respeitosa à preferência de redução de movimento.

## Destaques de produto

| Área | Implementação |
| --- | --- |
| Identidade | Pôster digital de alto contraste, tipografia Anton e fotografia de performance otimizada. |
| Conversão | CTA no hero, dock móvel e formulário com nome, e-mail, cidade, data, tipo e briefing do evento. |
| Atendimento | Mensagem estruturada para `+55 51 98217-1591` via WhatsApp. |
| Métricas | API `/api/stats` com cache de CDN de uma hora para SoundCloud, Spotify e total consolidado. |
| Performance | Imagens responsivas em WebP, fallback PNG, scripts com `defer` e animações GSAP curtas. |
| Confiabilidade | Fallback para a última contagem pública conhecida do Spotify caso a plataforma não exponha os números ao servidor. |

## Arquitetura

```text
novumdj/
├── api/                    # Vercel Functions
│   ├── booking.js           # Validação de booking legada
│   ├── links.js             # Links oficiais
│   └── stats.js             # Métricas públicas e cache de 1h
├── outputs/                # Frontend estático
│   ├── assets/              # Fotos e versões responsivas
│   ├── index.html           # Estrutura e conteúdo
│   ├── script.js            # GSAP, métricas e WhatsApp
│   └── styles.css           # Design system e responsividade
├── tests/                  # Testes de contrato e smoke tests
├── .github/workflows/ci.yml
├── vercel.json             # Rotas e Functions
└── package.json
```

O projeto mantém a camada pública separada da camada de operações:

```text
Visitante
   │
   ├── /                     → outputs/index.html
   ├── /api/stats            → métricas públicas com cache de 1h
   └── Formulário de booking → WhatsApp com briefing pré-preenchido
```

## Dados de reprodução

`GET /api/stats` atualiza as faixas próprias do SoundCloud e consolida o total apresentado na página. A resposta é cacheada por uma hora na CDN; o navegador também reconsulta ao voltar para uma aba que ficou inativa.

O Spotify não disponibiliza streams pelo Web API público. Por isso, o endpoint tenta usar as contagens públicas visíveis e preserva o último valor confirmado se essa fonte não estiver disponível. Essa escolha evita que a vitrine exiba zero ou uma métrica enganosa.

Exemplo de resposta:

```json
{
  "soundcloud": { "plays": 33633, "tracks": 10, "live": true },
  "spotify": { "plays": 22951, "tracks": 5, "live": false },
  "total": 56584,
  "refreshAfter": 3600
}
```

## Desenvolvimento local

Pré-requisito: Node.js 24.

```bash
npm ci
npm run check
npm test
npx vercel dev
```

Para validar a build de produção sem publicar:

```bash
npx vercel pull --yes --environment=production
npx vercel build --prod
```

## Qualidade e entrega

- GitHub Actions executa check de sintaxe e testes em cada push ou pull request.
- `npm audit` verifica dependências do projeto.
- Snyk Code é executado localmente sobre `api/` e `outputs/`.
- Vercel é conectada ao repositório para deploys guiados pelo GitHub.
- `.vercelignore` mantém testes, documentação e ferramentas locais fora do artefato de produção.

## Documentação complementar

- [Produto e restrições](PRODUCT.md)
- [Sistema de design](DESIGN.md)
- [Contratos da API](API.md)
- [Direção criativa](NOVUM_DIRECTION.md)
- [Histórico das alterações](RESUMO_ALTERACOES.md)

---

Feito para transformar atenção em briefing e briefing em baile.
