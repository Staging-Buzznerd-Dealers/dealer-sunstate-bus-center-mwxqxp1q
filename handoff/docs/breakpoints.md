# Breakpoints

The layout is fluid first. Most reflow happens without a media query at all —
`.split`, `.listing-grid`, `.blog-grid`, `.benefit-grid` and `.cta-grid` are all
`repeat(auto-fit, minmax(…, 1fr))` grids, so they wrap on content width rather
than device width. Four media queries handle what auto-fit can't.

## 1100px — navigation collapse

```css
@media (max-width:1100px){ .nav{display:none} .nav-toggle{display:flex} }
```

The desktop nav is hidden and the hamburger appears. This is set by the widest
nav in the set (Ironhaul, six links plus search) — the point where links would
begin to wrap, not a device size. If a brand adds a seventh link, raise this
number rather than letting the nav wrap.

The mobile panel (`.mobile-nav`) is a plain stacked list on ink, appended below
the header inside the hero, so it pushes nothing and needs no overlay.

## 900px — filter rails

```css
@media (max-width:900px){ .chip-row{flex-wrap:nowrap;overflow-x:auto} }
```

Chip rows stop wrapping and become horizontal scroll tracks — three stacked
wrapped rows of chips eat the whole viewport otherwise. `.filter-stack` also
goes full width and left-aligns, and Kenworth's three-up stats band goes to one
column.

## 640px — phone layout

`--gutter` drops from 24px to 16px, and:

- Hero loses its 680px minimum height, stacks copy above the action tiles, and
  drops to 36px/80px vertical padding. `.hero__title` drops 52px → 30px.
- Hero action tiles go to one column at full width.
- Quick-links card goes to a 2-column grid; dividers move from right to bottom.
- Section rhythm drops 96px → 64px; `.title-lg` / `.title-xl` → 26px.
- Listing card media changes from 4/3 to 16/9 so cards stay shallow in a
  single-column stack.
- Coverflow shrinks to 280px tall with 240px cards.
- Utility bar stacks; the social group loses its left divider.
- Promo banner stacks and its CTA goes full width.
- Footer goes to one column; the bottom row stacks.

## Print

`@media print` hides the hamburger, back-to-top, carousel arrows and filter
rows, and forces exact color printing. The pages are not paginated for print —
they are screen designs that print legibly, not print documents.

## Testing widths

Check these five: **1440** (design width), **1100** (nav collapse boundary),
**900** (filter rail boundary), **768** (tablet portrait), **390** (phone).
The two boundary widths are where regressions show up first.
