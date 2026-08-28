# API do NOVUM

## Links oficiais

`GET /api/links` retorna os canais oficiais para a UI consumir por URL.

## Booking

`POST /api/booking` valida um pedido e retorna um `contactUrl` com o e-mail pré-preenchido.

Exemplo:

```json
{
  "name": "Nome da pessoa",
  "event": "Nome do evento",
  "date": "2026-12-31"
}
```

O endpoint não armazena dados nem envia e-mails sozinho. Para isso, será necessário conectar um provedor de e-mail e uma base de dados.

## Reproduções públicas

`GET /api/stats` retorna as reproduções públicas usadas no hero:

- SoundCloud: soma das faixas próprias publicadas por `djnovum`.
- Spotify: soma das 5 faixas do perfil `Novumbr` que exibem contagem pública.
- `total`: soma das duas plataformas.

A resposta usa cache de CDN por uma hora. O SoundCloud é recalculado ao vivo. Como o Web API oficial do Spotify não fornece contagem de streams, o endpoint tenta ler os números públicos da página e mantém o último total confirmado quando eles não são entregues ao servidor.
