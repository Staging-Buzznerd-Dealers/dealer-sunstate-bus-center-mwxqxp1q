# Asset inventory

Everything in `assets/`. Dimensions below are the **rendered** sizes the CSS
asks for — supply source images at 2× those for retina, then compress.

## Photography

| File | Used on | Rendered | Crop notes |
| --- | --- | --- | --- |
| `hero-bus.jpg` | Sun State hero, Financing banner | Full-bleed, min 680px tall (360px on the banner) | Subject must sit right of center — the scrim darkens the left 45% for the headline |
| `sunset-highway.jpg` | Ironhaul hero | Full-bleed, min 680px tall | Same left-weighted scrim |
| `hero-truck.jpg` | Kenworth hero, T680 coverflow card | Full-bleed hero; 1:1 crop in coverflow | Doubles as a model card, so the truck must survive a square crop |
| `service-bus.jpg` | Sun State service feature | 100% × 280px, 16px radius | Wide crop |
| `parts-bus.jpg` | Sun State parts feature | 100% × 280px | Wide crop |
| `driver-cab.jpg` | Ironhaul service feature | 100% × 280px | Wide crop |
| `mountain-road.jpg` | Ironhaul parts feature | 100% × 280px | Wide crop |
| `service-garage.jpg` | Kenworth service feature + stats band | 100% × 280px; full-bleed behind stats | Needs to read at 6–12% brightness under the stats scrim |
| `parts-store.jpg` | Kenworth parts feature | 100% × 280px | Wide crop |
| `paclease-lot.jpg` | Kenworth PacLease row | 100% × 300px | Wide crop |
| `thermo-king-truck.jpg` | Kenworth Thermo King row | 100% × 400px | Taller crop than the other program rows |
| `trp-wall.jpg` | Kenworth TRP row | 100% × 300px | Wide crop |
| `inventory-ce-series.jpg` | Sun State listing card + Financing apply block | 4:3 card (16:9 under 640px); 320px min in the apply block | Must survive both crops |
| `inventory-re-series.jpg` | Sun State listing card | 4:3 | |
| `inventory-ae-series.jpg` | Sun State listing card | 4:3 | |
| `inventory-ce-electric.jpg` | Sun State listing card | 4:3 | |
| `listing-t680.jpg` `listing-w990.jpg` `listing-t880.jpg` `listing-t680e.jpg` | Kenworth listing cards | 100% × 170px | Shallow crop — keep the cab in the vertical middle |
| `model-w990.jpg` `model-w900l.jpg` `model-t680e.jpg` `model-t880.jpg` | Kenworth coverflow | 1:1, up to 425px at active scale | Square crop; bottom 30% is under a dark gradient with the model name |
| `blog-bus-1.jpg` `blog-bus-2.jpg` `blog-bus-3.jpg` | Sun State blog cards | 16:10 | |

Unused in these pages but present in the source design: `hero-garage.jpg`,
`lineup-quarry.jpg`, `model-profile.jpg`, `parts-shelf.jpg`,
`texture-accent.jpg`. Keep or drop as you like.

When a listing has no photo, `.listing-card__placeholder` renders the category
name letter-spaced at 16% ink on a `#D9D2C4` tile — see the Ironhaul page for
the live state. Blog cards with no image fall back to a 3%-opacity diagonal
hatch. Both are intentional empty states, not missing assets.

## Logos

| File | Used on | Rendered |
| --- | --- | --- |
| `sun-state-logo.png` | Sun State header (44px tall) and footer (38px tall) | Height-constrained, width auto |
| `kenworth-logo.png` | Kenworth header (190×54) and footer (170×48) | `object-fit:contain` |
| `buzznerd-logo-white-cropped.png` | Every footer, "Built by" | 16px tall |
| `buzznerd-logo-white.png`, `buzznerd-logo.png` | Alternates, unused | — |

Ironhaul has no logo file — the header and footer render a `▲` glyph plus the
company name in INTL Headline (`.site-header__wordmark`). Supply a real mark and
swap in an `<img>` matching the Sun State pattern.

## Icons

Two sets of the same five social marks, plus three UI marks:

- `icon-facebook-white.svg` `icon-instagram-white.svg` `icon-linkedin-white.svg`
  `icon-twitter-white.svg` `icon-youtube-white.svg` — used on the ink chrome at
  16px (utility bar) and 18px (footer). These are what all three brands use.
- `icon-facebook.svg` `icon-instagram.svg` `icon-linkedin.svg`
  `icon-twitter.svg` `icon-youtube.svg` — dark versions, currently unused. The
  original Kenworth build inverted these with a CSS filter; this package uses
  the white set directly instead.
- `icon-bus.svg` `icon-service.svg` `icon-parts.svg` — 20px inside hero action
  tiles, 26px inside Kenworth stat cards. On the Kenworth theme they are
  inverted to white via `filter:brightness(0) invert(1)` because the red tile
  needs white ink.

Everything else that looks like an icon is a Unicode glyph, not an asset:
`☎ ◎ ▾ ▲ ✓ ⚙ ★ ✦ ↗ → ↑ ‹ › ⌕ ♡ ♥`. That is deliberate — the design system has no
icon font and no sprite sheet.

## Fonts

`assets/fonts/` holds 12 woff2 files: INTL Headline (Light 300, Regular 400,
Medium 500, Bold 600–900) and INTL Text (the same four weights plus italics for
Light, Regular, Medium and Bold). All are declared with `font-display:swap` in
`css/tokens.css` and referenced relative to that file.

Only two weights do real work: **display 700** for every title, price and
primary button label, and **body 400/600** for everything else. The Light and
Medium cuts are shipped for completeness — drop them if you're trimming payload.

Licensing for both families needs to be confirmed for web use on the client's
domains before launch. This package does not include a license file.
