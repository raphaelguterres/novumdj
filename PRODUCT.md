# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas que procuram um DJ para eventos e contratantes avaliando o NOVUM para bookings.

## Product Purpose

Apresentar NOVUM, DJ/Selecta de São Paulo, e direcionar visitantes para os canais e o contato de booking.

## Positioning

Uma presença digital de artista centrada em som, luz, movimento e experiência de pista.

## Operating Context

A avaliação acontece principalmente em celular e desktop, por pessoas descobrindo o artista ou considerando sua contratação para eventos.

## Capabilities and Constraints

- Landing page estática em HTML, CSS e JavaScript.
- Navegação por âncoras, formulário de briefing que prepara uma mensagem de WhatsApp e links sociais.
- Canais de música oficiais: Spotify e SoundCloud.
- Endpoint `/api/stats` com cache de uma hora para atualizar os números gerais sem bloquear o carregamento da página.

## Brand Commitments

- Nome: NOVUM.
- Voz: direta, noturna e ligada à cultura de pista.
- A referência visual vinculante é a linguagem de pôster de lançamento: preto absoluto, papel marfim, fotografia monocromática central e tipografia monumental, sem reproduzir a identidade ou o conteúdo de terceiros.

## Evidence on Hand

- Imagem principal otimizada: `outputs/assets/novum-live-hq-1536.webp`, derivada de `novum-live.png`.
- Imagem adicional otimizada: `outputs/assets/novum-stage-hq-1536.webp`, derivada de `novum-stage.png`.
- Perfil de Instagram: `https://www.instagram.com/novumdj/`.
- Perfil de Spotify: `https://open.spotify.com/artist/1F3gUK3swGl27lTlPuM3qD`.
- Perfil de SoundCloud: `https://soundcloud.com/djnovum`.
- Contato: `booking@novumdj.com`.
- WhatsApp de booking: `+55 51 98217-1591`.

## Public Platform Signals

- SoundCloud, consulta em 2026-08-28: 10 faixas próprias somam 33.632 reproduções.
- Spotify (perfil Novumbr confirmado), consulta em 2026-08-28: as 5 faixas com contagem pública somam 22.951 reproduções.
- Total público verificável das duas plataformas: 56.583 reproduções. O Spotify não exibe uma soma pública do catálogo inteiro.
- O número do SoundCloud é recalculado pela API pública usada na página. Para o Spotify, o último total confirmado permanece como fallback porque o Web API oficial não expõe streams.

## Product Principles

- Fazer a identidade do artista ser reconhecível no primeiro viewport.
- Priorizar o caminho para booking e canais oficiais.
- Pedir somente os dados essenciais do evento e deixar claro que o WhatsApp abre com a mensagem pronta, mas o visitante ainda precisa confirmar o envio.
- Preservar legibilidade, performance e navegação em qualquer tela.
- Usar a gramática de pôster como linguagem própria do NOVUM, priorizando contraste, reconhecimento imediato e conversão para booking.
