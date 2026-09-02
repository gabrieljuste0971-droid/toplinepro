## How to build with Seam & Slate

**This system ships no React components.** `_ds_bundle.js` is empty by design — the
design system is CSS: three layers of design tokens plus a BEM class vocabulary that
the production site is built from. Build with plain HTML elements and these classes.
Do not invent class names, and do not reach for Tailwind or any utility framework —
none is present.

### Setup

Load `styles.css`. It `@import`s `_ds_bundle.css`, which carries every token and every
component class, and pulls Inter (400/500/600) from Google Fonts. There is no provider
and no wrapper component to mount.

Light is the default and the system deliberately ignores `prefers-color-scheme`. Dark is
opt-in only, by setting `data-theme="dark"` on the root element.

Page shell is two nested elements:

```html
<section class="section section--alt" id="services">
  <div class="wrap">…</div>
</section>
```

`.wrap` is the container (max width `--container-max`, gutter `--gutter`); `.wrap--wide`
widens it. Section tone comes from `.section--alt` and `.section--wash`; `.section--sm`
cuts the vertical padding.

### Motion — read before animating anything

`data-reveal="rise-md"` (also `rise-sm`, `rise-lg`, `rise-left`, `slide-left`,
`slide-right`) sets the element to `opacity: 0` and only the class `is-in` reveals it.
The IntersectionObserver that adds `is-in` lives in the site's own `assets/js/home.js`,
which is **not** part of this system. **A `data-reveal` element with no `is-in` renders
invisible.** So either omit the attribute, or put `is-in` on the element at author time:
`<div class="section-head is-in" data-reveal="rise-md">`.

`.enter` is safe without any script — it is a pure CSS animation, staggered by an inline
`style="--i:2"` index. Every animation in the system is disabled under
`prefers-reduced-motion`.

### Class vocabulary

BEM throughout: `block`, `block__element`, `block--modifier`. All of these are defined
in `_ds_bundle.css`.

| Family | Classes |
|---|---|
| Actions | `.btn` with `.btn--block .btn--dark .btn--light .btn--ghost .btn--sm .btn--noicon`; `.btn__chip` (the circular icon chip); `.btn-row`; `.btn-nav`; `.iconbtn` |
| Labels | `.badge` (+ `.badge--glass`), `.eyebrow`, `.chip`, `.pill-badge` in `.pill-badges`, `.mono` |
| Text | `.lead`, `.section-head` (+ `.section-head--split`), `.intro`, `.quote` |
| Cards | `.deckcard` (`__img __scrim __body __title __text __cta`) inside `.deck`; `.ecard` in `.ecards`; `.review` |
| Disclosure | `.accord` (`__rail __spine __num __title __meta __img __scrim __panel __body`) |
| Data | `.stats` holding `.stat` (`__num __suffix`) |
| Forms | `.estform`, `.form`, `.field` (+ `.field--wide`, `.field.is-invalid`, `.field__error`) |
| Coverage map | `.areas`, `.arearow` (`__n __name __tag __towns`), `.areachip` in `.areachips`, `.areapanel`, `.areamap`, `.pin` (+ `.pin--hq`), `.areakey` (+ `.areakey--hq`) |
| Chrome | `.nav` (+ `.nav--light`, `__item __link __label`), `.sheet`, `.mobile-bar`, `.footer`, `.dropdown`, `.themetoggle`, `.skip-link` |
| Page blocks | `.hero`, `.trust`, `.diff`, `.projects`, `.family`, `.estimate`, `.finalcta`, `.promo`, `.closer` |

Links are never colored: `a` is `currentColor` plus an underline. `a.plain` and `a.btn`
opt out of the underline — nothing else should.

### Tokens

Use the semantic layer, never the primitives (`--blue-*`, `--silver-*`, `--ink-*`), and
never a hardcoded value — your own layout glue is written with these too.

- Surface and text — `--surface-page --surface-alt --surface-raised --surface-invert
  --text-primary --text-body --text-muted --text-on-dark --line`
- Dark ground, the only place a dark surface is allowed (a media frame) —
  `--ground --ground-soft --on-ground --on-ground-2 --on-ground-3`
- Glass — `--glass --glass-strong --glass-line --blur-glass --blur-panel`
- Action — `--action-block --action-on-block --action-dark --action-on-dark
  --action-light --action-on-light --action-soft --action-urgent`
- Type — one family for every role (`--font-ui --font-display --font-body --font-mono`
  all resolve to Inter); sizes `--text-display --text-h1 --text-h2 --text-h3 --text-h4
  --text-h5 --text-lead --text-md --text-sm --text-ui --text-xs`; weights
  `--fw-regular --fw-medium --fw-semi`; matching `--lh-*` and `--ls-*`. Display type is
  uppercase via `--case-display`.
- Shape — `--r-pill --r-frame --r-card --r-card-lg --r-media --r-sm`
- Rhythm — `--container --container-max --gutter --pad-x --section-pad
  --section-pad-sm --measure --measure-body --measure-heading`
- Motion — `--dur-fast --dur-base --dur-reveal --ease-soft --ease-reveal --stagger`

Standing rules the system encodes: no drawn icons and no illustration (photography and
type only); dark surfaces only as a media frame; body size is fluid across breakpoints
via `--text-md`, so never pin a pixel size on body copy.

### Where the truth lives

`_ds_bundle.css` is the whole system — read it before styling anything unusual. It is a
literal concatenation of the repo's `design-system/tokens.css` and `assets/css/home.css`.
`guidelines/design-system/DESIGN-SYSTEM.md` is the full written specification, including the rationale
and provenance of every layer (written in Portuguese).

### Idiomatic snippet

```html
<section class="section section--alt">
  <div class="wrap">
    <div class="section-head section-head--split">
      <span class="badge">Services</span>
      <h2>Full-Service Roofing and Exterior Work</h2>
      <p class="lead">One company, one crew, one point of accountability.</p>
    </div>

    <div class="deck" style="display:grid; gap:var(--space-6); grid-template-columns:repeat(3,1fr)">
      <article class="deckcard">
        <img class="deckcard__img" src="…" alt="">
        <span class="deckcard__scrim" aria-hidden="true"></span>
        <div class="deckcard__body">
          <h4 class="deckcard__title">Standing Seam Metal Roofing</h4>
          <p class="deckcard__text">Custom-formed panels and precision flashing.</p>
          <a class="deckcard__cta" href="/metal-roofing">Discover</a>
        </div>
      </article>
    </div>

    <div class="btn-row">
      <a class="btn btn--block" href="#estimate">Get Free Estimate
        <span class="btn__chip" aria-hidden="true">→</span>
      </a>
      <a class="btn btn--ghost" href="tel:+19787512053">Call (978) 751-2053</a>
    </div>
  </div>
</section>
```
