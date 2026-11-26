# How this handoff maps onto the repo

`handoff/` is the **visual reference**: static HTML, CSS and JS for every screen,
openable from disk. The **implementation** is the JSON in `site/`, which the
BuzzNerd renderer turns into the real pages and which the dashboard canvas can
edit. Nothing in `site/` imports from `handoff/`; the two are kept side by side so
a developer can compare them.

If you are porting the handoff into some other stack, ignore this file. If you are
checking that the repo matches the design, start here.

## Design tokens → `site/tokens.json`

| Handoff (`css/tokens.css`, `css/themes.css`) | `site/tokens.json` |
| --- | --- |
| `--color-accent` `#F7C600` (Sun State) | `colors.accent` |
| `--color-accent-text` `#8A6D00` | `colors.accentDark` |
| `--ink-900` `#1A1714` | `colors.ink`, `colors.inkDark` |
| `--color-paper-alt` `#FAF8F4` | `colors.paper` |
| `--color-line` `#E1DACB` | `colors.line` |
| `--color-muted` `#6B6354` | `colors.muted` |
| `--color-card` `#FFFFFF` | `colors.card` |
| `--text-hero 52 / h2 36 / h3 28 / base 15` | `type.h1 / h2 / h3 / body` |
| `--radius-md 10 / lg 14 / xl 16` | `radius.input` & `nav` / `card` / `modal` |
| `--measure 1440px`, `--gutter 24px` | `layout.container`, `layout.padDesktop` |
| INTL Headline + INTL Text `.woff2` | `public/fonts/`, listed in `fonts.files` |

The handoff has three brand themes (`.theme-sunstate`, `.theme-ironhaul`,
`.theme-kenworth`). This repo is the Sun State dealer, so only the Sun State values
are in `tokens.json`. Ironhaul and Kenworth exist in the handoff for reference and
for the next dealer repo generated from the template.

## Sections → blocks, components and libraries

| Handoff section | Where it lives in the repo |
| --- | --- |
| Utility bar | component `site/sections/utility-bar.json`, placed in `site/templates/default.json`; links are menu `utility` |
| Header, nav, dropdown | `default` template; menu `main` (Inventory has a 2nd level) |
| Hero + search | home page `hero` section; search is the `inventory-search` widget |
| Four action tiles | `iconGrid` block (`quick-links`) |
| Featured listings | `inventory-carousel` widget (live inventory) |
| What We Offer stats | `statBand` block |
| Service / Parts split | row of two columns; buttons `schedule-service`, `order-parts` |
| Financing banner | accent-background section; button `get-prequalified` |
| Testimonials | `testimonials` block |
| Find a Location | `locations-map` widget (live locations) |
| From the Road Ahead | `postsList` block over `site/blog/posts/*` |
| Contact + subscribe | `form` blocks: `request-info`, `fleet-updates` |
| Footer | `footer` + `footer-links` component, menus `footer-*` and `legal` |
| Financing page: banner, intro, warranty copy | `site/pages/financing/page.json` |
| Eight benefit cards | component `site/sections/benefit-grid.json` (one list, one repeated card) |
| Three dark CTA cards | `serviceGrid` block |
| Partnership card, Apply today | section / row / column compositions; button `apply-now` |

## What the repo does differently, and why

- **Header over the hero.** The handoff lays the header on top of the hero photo.
  The renderer's template chrome sits above page content, so the repo draws a solid
  ink header followed by the hero. The photo, scrim and copy are unchanged.
- **Location filter chips.** The handoff filters 17 hand-typed location cards by
  department and state. The repo uses the live `locations-map` widget, so the
  cards come from Admin → Locations and are never stale. Authored nodes cannot yet
  carry the facet attributes a `filter` behaviour reads, so department/state chips
  over custom cards are not expressible; the widget supplies its own filtering.
  This is a platform gap, not a design change.
- **Listings and locations are empty until publish.** Live widgets show a
  placeholder until the platform bakes real inventory and locations in on publish.
  The handoff's typed cards show the intended look.
- **Quote carousel.** The handoff rotates three testimonials with arrows and dots.
  The `testimonials` block renders them as a row of cards.
- **Accent as text.** Sun State yellow fails contrast as text on white, so
  `site/custom-code.json` points eyebrows and text links on light surfaces at
  `accentDark`. The renderer's default uses the fill colour.

## Dropped or deferred

- **Careers** link: the design links to a Careers page that is not in the handoff.
- **Ironhaul and Kenworth pages**: other dealers' homepages, kept in `handoff/pages/`
  for reference only. No `site/` equivalent is built.
- **Back-to-top button**: not built. It is a `scrollstate` behaviour with a `totop`
  part and can be added to the template.
- **Favourite (heart) toggle and photo counters on listing cards**: part of the
  live inventory card, which the storefront draws, so they are not authored here.
- **Social links** all point to `#` until the dealer supplies real profile URLs.
- **Figures and copy** (stats, testimonials, blog posts, phone numbers, the
  finance contact) are the design comp's sample content. Confirm every one with
  the dealer before launch.
