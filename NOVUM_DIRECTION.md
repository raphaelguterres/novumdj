# NOVUM — Direção de redesign

## Superfície e objetivo

Landing page de booking para NOVUM, DJ/Selecta de São Paulo. O visitante deve identificar o artista, acessar os canais e iniciar o contato de booking em poucos segundos.

## Direção aprovada

Sistema de sinalização urbana noturna: superfícies em asfalto preto e papel off-white, azul-cobalto como rota, laranja de segurança como ação e tipografia condensada de alto impacto. A referência é a cultura visual de metrôs, placas de orientação, pôsteres de rua e música eletrônica independente; não há reprodução de identidade de terceiros.

## Composição

- Título NOVUM em grande escala no painel de abertura.
- Foto real do artista como faixa vertical central.
- Rota azul conectando identidade, foto, canais e booking.
- CTA de booking como placa laranja de maior peso visual.
- Canais sociais como sinalização direcional, sem cards genéricos.

## Inventário de implementação

| Elemento | Meio | Compromisso |
| --- | --- | --- |
| Foto do artista | Asset existente | `outputs/assets/novum-live.png`, com tratamento editorial em CSS |
| Rota e nós | HTML/CSS | Linha azul contínua, nós e ramificações responsivos |
| Setas e marcadores | SVG inline | Geometria consistente, decorativa quando sem função |
| Tipografia | CSS / Google Fonts | Display condensado e interface mono, sem texto rasterizado |
| CTA principal | HTML/CSS | Placa laranja com ação inequívoca para booking |
| Textura | CSS | Ruído discreto, sem depender de imagem gerada no site |

## Referência de composição

`.impeccable/mocks/novum-wayfinding-approved.png`
