# Dealer Site — Design Handoff

Framework-agnostic HTML, CSS and JavaScript for the complete dealer site. No build
step, no bundler, no runtime dependencies. Open `index.html` in any browser to
preview everything.

```
index.html          overview + links to every page
css/                tokens, base, components, themes
js/site.js          all interactive behavior
pages/              4 site pages + the design system reference
assets/             fonts, photography, logos, icons
docs/               breakpoints, accessibility, asset inventory, repo mapping
```

## Load order

Four stylesheets, in this order, on every page:

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/themes.css">
<script src="js/site.js"></script>
```

`tokens.css` must come first — everything else reads its custom properties.
`site.js` can go anywhere; it waits for `DOMContentLoaded`.

## Theming

One class on `<body>` re-skins the site. A theme sets four variables and nothing
else — ink, paper, line color, type and spacing are shared across all brands.

| Theme              | Accent  | On accent | Accent as text |
| ------------------ | ------- | --------- | -------------- |
| `.theme-ironhaul`  | #E8531F | #1A1714   | #A23A16        |
| `.theme-sunstate`  | #F7C600 | #1A1714   | #8A6D00        |
| `.theme-kenworth`  | #E31C3D | #FFFFFF   | #B01330        |

`--color-accent-on` is the ink laid on top of an accent fill. It flips to white
for Kenworth's red so button labels stay legible — check contrast before adding
a new accent.

## CSS convention

BEM: `.block`, `.block__element`, `.block--modifier`. Blocks are independent —
no block styles another block, and no component depends on its position in the
page. Utility-style helpers are limited to layout primitives in `base.css`
(`.container`, `.section`, `.split`, `.eyebrow`, `.title-*`, `.prose`).

Component inventory, with live specimens and every variant, is in
`pages/design-system.html`.

## JavaScript

Every behavior is opt-in through a data attribute, so markup can move into any
template language without touching the script.

| Attribute               | Behavior                                                       |
| ----------------------- | -------------------------------------------------------------- |
| `data-nav-toggle`       | Mobile panel named by `aria-controls`; keeps `aria-expanded` in sync |
| `data-dropdown`         | Header dropdown — hover, focus-within, click (touch), Escape   |
| `data-quote-carousel`   | Testimonial rotator with arrows and dots                       |
| `data-carousel3d`       | Coverflow brand/model picker, 40px drag threshold              |
| `data-location-filter`  | Chip filtering; auto-disables zero-result options              |
| `data-demo-form`        | Front-end-only confirmation (replace with a real endpoint)     |
| `data-back-to-top`      | Reveals after 600px of scroll                                  |
| `data-save`             | Favorite toggle, state in `aria-pressed`, not persisted        |
| `data-year`             | Writes the current year into the footer                        |
| `data-screen-label`     | Section name for review and QA — no behavior                   |

### The location filter

The only piece worth reading before you port it. Chips carry
`data-filter-group` and `data-filter-value`; each card carries
`data-<group>="A|B|C"`. After each change the script recomputes which options
would still return results and marks the dead ones `aria-disabled="true"`, so a
user can never filter into an empty rail. Add a filter axis by adding a chip row
and a matching `data-` attribute on the cards — no script changes.

## Page notes

**Sun State Bus Centers** (`pages/sun-state-bus-centers.html`) — the reference
homepage. Hero carries four action tiles; five-figure stats band; 17 locations
filtered by department and state.

**Financing & Warranty** (`pages/financing.html`) — the interior-page pattern.
Short banner hero (`.hero--short`), 1000px reading column, eight numbered
benefit cards, three dark CTA cards, partnership promo card.

**Ironhaul Truck Centers** (`pages/ironhaul-truck-centers.html`) — same
homepage template, plus two blocks the other brands don't run: the quick-links
card that overlaps the hero, and the 3D brand coverflow. Its location filter
runs three axes (brand, department, state) and shows brand dots per card. Its
listing cards demonstrate the empty-photo state.

**Kenworth of Pennsylvania** (`pages/kenworth-of-pennsylvania.html`) — the
widest variation. Photographic coverflow, three program rows (PacLease, Thermo
King, TRP), stats over a photo (`.stats-band` + `.stats--rule`), careers banner,
five-column footer.

Two blocks are part of the template but disabled for Sun State: the quick-links
card and the brand carousel. They are live on the Ironhaul page if you need the
markup.

## Before it ships

- Both forms only confirm in the browser. Point them at real endpoints and add
  server-side validation.
- Search inputs and `href="#"` links are placeholders pending real routes.
- Inventory, locations, testimonials and articles are hard-coded in the HTML —
  they are the shapes your data should fill.
- Photography is the design comp's. Swap in the client's licensed images; see
  `docs/assets.md` for intended dimensions.
- Structured data (`application/ld+json`) is present on the two homepages that
  had it specified. Verify NAP details against the client's records.

## Browser support

Modern evergreen browsers. Two features are worth naming:

- `color-mix()` in oklch is used for button hover states and the quick-link
  icon tint. Both degrade to the un-mixed color rather than breaking.
- `aspect-ratio` on card media. No fallback is provided; if you need to support
  older Safari, replace with a padding-top ratio box.

`prefers-reduced-motion: reduce` disables all transitions and animations.
