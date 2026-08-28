---
name: NOVUM
description: Black-and-ivory release-poster system for a São Paulo DJ booking site.
colors:
  paper: "#f2ecdc"
  ink: "#050505"
  smoke: "#b9aea0"
  muted: "#7d766d"
typography:
  display:
    fontFamily: "'Anton', sans-serif"
    fontWeight: 400
    lineHeight: 0.72
  label:
    fontFamily: "'DM Mono', monospace"
    fontSize: "10px"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  gutter: "clamp(8px, 1.4vw, 22px)"
  module: "24px"
components:
  booking-board:
    backgroundColor: "{colors.black}"
    textColor: "{colors.acid}"
    rounded: "{rounded.none}"
  channel-link:
    backgroundColor: "{colors.black}"
    textColor: "{colors.acid}"
    rounded: "{rounded.none}"
---

# Design System: NOVUM Release Poster

## Overview

NOVUM is a release announcement translated into a booking site: black field, warm paper ink, oversized condensed type and real performance photography expanded into an immersive background. The site behaves like a printed music poster made interactive, not a conventional DJ landing page.

## Color and hierarchy

- **Black** is the continuous field and gives the page its nighttime, collectible quality.
- **Warm paper ivory** carries the title, print rules and Booking action.
- **Soft smoke** is reserved for quiet hover feedback only.
- Photos are grayscale, high-contrast and held inside a paper-edged portrait panel.
- No decorative colors compete with the title, listening signals or Booking action.

## Typography

Anton carries the declarations: NOVUM, É BAILE, FUNK/TRAP/BAILE, figures and BOOKING. DM Mono carries operational labels and supporting copy. The display type is large, centered and allowed to overlap the portrait panel; paper contrast keeps it readable.

## Layout

The first viewport is a release poster in camera view: NOVUM crosses the top over the live performance image, FAÇA SEU BAILE sits low on the left, and the verified SoundCloud, Spotify and combined-play figures balance it on the right. The paper conversion band exposes “Pedir orçamento” in the first viewport. Genres and channels follow in an inverted paper field. The stage section turns the second photograph into a full-bleed, pinned camera sequence, followed by a paper-and-ink booking brief.

At 720px the poster becomes a readable vertical sequence: identity, photo, genre stamp, listening figures, Booking, channels, stage and footer. No element depends on color alone; text, placement and print rules carry the meaning.

## Motion

The hero takes focus through a fast editorial reveal: the background settles, NOVUM reveals, then FAÇA SEU BAILE, verified platform figures, a scroll cue and the budget CTA arrive in under one second. The scroll cue fades as the visitor moves. The stage scene is intentionally static: no pinning, zoom or text reveal. Native scrolling is preserved. Reduced-motion preferences show the finished composition without travel.

## Components

### Booking board

The Booking board is a semantic mail link with the plain action “Contrate o NOVUM para eventos”. It is the only paper conversion band in the first viewport and uses a square, poster-like treatment.

### Platform figures

The platform figures are direct links, not generic metric cards. Small technical captions were removed; each row now uses only a display-size platform name and its number, followed by a concise total. Accessible labels preserve the exact scope, while `/api/stats` refreshes the visible figures on an hourly cache window.

### Channel links

Channel links use explicit names — Instagram, Spotify and SoundCloud — with inline SVG arrows. Hover and focus reverse the link to white for a clear interaction state.

### Booking brief

The booking section asks for name, email, city, date, event type and an optional description. Submission prepares a structured message to WhatsApp `+55 51 99724-7382`; the interface explicitly tells visitors to review and press send inside WhatsApp and never claims that data was captured by a server.

## Do's and don'ts

- Do keep the first read as NOVUM → photo → Booking.
- Do keep poster text on a contrasting field.
- Do use the supplied performance photography as the emotional proof.
- Don't place black display text directly over black areas of the image.
- Don't add dates, tour claims or invented artist information.
- Don't use rounded cards, glass effects or arbitrary decorative grids.
