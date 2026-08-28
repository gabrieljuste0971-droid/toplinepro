# Ironwood — Design System Extraction

Reference system reverse-engineered from <https://construction-visuvate.framer.website/>
(Framer template "Ironwood — Custom Home Builders & Design-Build"), captured 2026-08-27.

Everything is namespaced `--ref-*` / `.ref-*` so it can sit beside the existing
TopLine Pro system without collisions. Nothing in `design-system/tokens.css` or
`design-system/tokens.json` was modified.

## Files

| File | What it holds |
|---|---|
| `tokens.css` | Colour, type, spacing, layout, radius, elevation, control sizes |
| `motion.css` | Easings, durations, the word-reveal, the four scroll reveals, hover rules |
| `components.css` | Button / badge / chip / card / nav / dot / input / layout shapes |
| `tokens.json` | The same values, machine-readable, with caveats |
| `preview.html` | Open in a browser to see every component rendered |
| `../../.extract-design-system/raw.json` | Raw CLI extractor dump |
| `../../.extract-design-system/normalized.json` | CLI normalized output (thin — see note below) |

## How it was extracted

1. `npx extract-design-system <url>` — returned fonts and a spacing scale but
   zero palette entries and no animation data. Not sufficient on its own.
2. A headless Chromium pass that loaded the page, scrolled the full 10 067px,
   and read computed styles, `--token-*` custom properties, `@font-face` and
   `@keyframes` rules, and every painted button/card/chip box.
3. A second pass that patched `Element.prototype.animate` before page load to
   capture Framer Motion's real WAAPI keyframes, durations, easings and delays.

## The design in one paragraph

Warm monochrome — near-black `#171614`, bone `#f5f3ee`, warm grey body text
`#54504a` — with **one** accent, amber `#f7b74a`, doing all the work: CTAs,
eyebrow badges, carousel arrows, one feature tile. There is effectively a
single radius (4px) across buttons, cards, images, chips, inputs and the nav.
Shadows are absent; depth comes from flat colour blocks and full-bleed
photography. Display type is Cabinet Grotesk at 700–800, uppercase, tight
tracking; body is Geist at 400–500. Section rhythm is large: 120px top,
160px bottom, 56px internal. A 1px `#d8d2ca` six-column rule overlay runs
behind sections as decoration.

## Colour

| Token | Value | Role |
|---|---|---|
| `--ref-ink` | `#171614` | Headings, dark buttons, scrolled nav |
| `--ref-ink-deep` | `#1c1a17` | Deepest surface (Framer token) |
| `--ref-ink-footer` | `#181614` | Footer as painted |
| `--ref-accent` | `#f7b74a` | The brand colour — CTA, badge, arrows |
| `--ref-accent-soft` | `#f0ce96` | Disabled arrow, dashed connectors |
| `--ref-bone` | `#f5f3ee` | Alt section background, chips, step numbers |
| `--ref-text-body` | `#54504a` | Paragraph copy |
| `--ref-text-muted` | `#a8a298` | Meta, captions |
| `--ref-border` | `#d8d2ca` | Hairlines and the grid overlay |

There is no secondary hue and no semantic success/warning/error colour on this
page. If you port this palette you will need to add those yourself.

## Buttons

One radius, no border, no shadow, two heights.

- **Primary** — amber `#f7b74a` fill, `#171614` label, 44px tall.
- **Dark** — `#171614` fill, white label, 44px (40px for "Read More").
- **Light** — white fill, `#171614` label, 40px, used over photography and in the nav.
- **Icon button** — 40x40 square, 4px radius, amber or dark; disabled state is `#f0ce96`.

Padding is `8px 20px` normally. A CTA with a trailing arrow uses
`6px 6px 6px 12px` with `gap: 12px`, because the arrow lives in its own
32x32 chip whose fill inverts the button (amber button gets a dark chip).

## Motion

The signature is a **word-by-word headline reveal**: each word is an
`inline-block` span animating `opacity 0.001 -> 1` and `filter blur(8px) -> blur(0px)`
together, 400ms, `cubic-bezier(0.12, 0.23, 0.5, 1)`, 75ms stagger, first word
delayed 400ms. Captured delays on the hero were 400 / 475 / 550 / 625 / 700 /
775 / 850 / 925ms.

Four scroll-reveal pre-states were found:

| Pattern | From |
|---|---|
| `rise-lg` | `opacity:0; translateY(30px) scale(0.8)` |
| `rise-md` | `opacity:0; translateY(10px) scale(0.9)` |
| `rise-sm` | `opacity:0; translateY(8px) scale(0.9)` |
| `rise-left` | `opacity:0; translate(-24px, 30px) scale(0.9)` |

Hover behaviour is deliberately minimal — only two rules exist site-wide:
the trailing arrow icon rotates exactly 45°, and the nav CTA fades to 0.8.
No lifts, no colour swaps, no scale on cards.

Other transitions in the stylesheet: `0.25s cubic-bezier(0.4,0,0.2,1)` for
general UI, `transform 0.4s cubic-bezier(0.25,0.1,0.25,1)` for glides,
`opacity 0.2s / transform 0.15s` for micro-interactions, and
`background 0.3s, border-color 0.3s` for surfaces. `backdrop-filter: blur(4px)`
appears on floating surfaces.

`motion.css` reconstructs all of this as CSS with a
`prefers-reduced-motion` block, which the original site does not have.

## Layout

- Content container **1340px** inside a 1440px viewport — 50px gutters.
- Centered prose column caps at **860px**; a secondary column sits at 938px.
- Sections: `padding: 120px 0 160px`, internal `gap: 56px`, header-to-body `48px`.
- Breakpoints at **810px** and **1200px**.
- Decorative overlay: 1px `#d8d2ca` vertical rules, 6 columns, ~223px pitch.

## Caveats

- **Home page only.** Other routes were not visited; this is not proof of a
  whole product design system.
- Framer strips semantic class names and paints CTAs on an inner element, so
  the outer `<a>` reports `padding: 0px`. Values here come from the painted box.
- The animations are JS-driven (Framer Motion). The CSS in `motion.css` is a
  faithful reconstruction of the captured timings, not a copy of site CSS.
- Cabinet Grotesk (Fontshare) and Geist (Vercel) are third-party fonts —
  confirm licensing before shipping either.
- Treat every value as a starting point to review, not as authoritative.
