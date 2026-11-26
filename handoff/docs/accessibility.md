# Accessibility notes

What is already built in, and what still needs a decision from you.

## Built in

**Skip link.** Every page opens with `.skip-link` → `#main-content`. It is
off-screen until focused, then drops to 8px from the top. The target carries
`tabindex="-1"` so focus actually lands there.

**Focus is always visible.** `base.css` sets a global
`:focus-visible` outline (2px, accent-text color, 2px offset). Nothing in the
package removes an outline. If you add a component, do not set
`outline:none` without providing a replacement.

**State lives in ARIA, not classes.** Chip selection is `aria-pressed`,
dead filter options are `aria-disabled="true"`, dropdowns are `aria-expanded` +
`hidden`, the mobile toggle is `aria-expanded` with `aria-controls`, the
testimonial dots are `aria-current`, the save toggle is `aria-pressed`. CSS
selects on the attribute, so the visual state and the announced state cannot
drift apart.

**Keyboard paths.** Dropdowns open on `focusin` and close on `focusout` or
Escape, so they work without a pointer. Carousel arrows and dots are real
`<button>`s. The coverflow cards are buttons with `aria-label="View <name>"`,
and off-stage cards get `aria-hidden="true"` plus `pointer-events:none` so
they're not reachable while hidden.

**Decoration is hidden.** Every glyph used as an icon (`☎ ◎ ▾ ✓ ⚙ → ↑ ‹ ›`) is
inside a span marked `aria-hidden="true"`, and decorative `<img>` elements carry
`alt=""`. Social links carry `aria-label`; their images are `alt=""`.

**Hit targets.** Buttons are 46px minimum (38px for `.btn--sm`, used only for
secondary actions), icon buttons 44px, the mobile toggle 44px, inputs 46px.

**Reduced motion.** `prefers-reduced-motion: reduce` collapses every transition
and animation to 0.01ms — including the coverflow transforms, which are the only
substantial motion on the site.

**Forms.** Every input has an `aria-label` (placeholders are examples, not
labels). Status messages sit in `role="status"` so a confirmation is announced.

## Contrast

Verified against WCAG AA (4.5:1 body, 3:1 for headline-scale type):

| Combination                          | Ratio  | Use                        |
| ------------------------------------ | ------ | -------------------------- |
| Ink #1A1714 on white                 | 16.4:1 | Body copy, titles          |
| Body #3a342c on white                | 11.3:1 | Long-form paragraphs       |
| Muted #6B6354 on white               | 5.6:1  | Meta text, captions        |
| Accent text #A23A16 on white         | 6.3:1  | Ironhaul links, eyebrows   |
| Accent text #8A6D00 on white         | 5.0:1  | Sun State links, eyebrows  |
| Accent text #B01330 on white         | 7.1:1  | Kenworth links, eyebrows   |
| Ink on Ironhaul #E8531F              | 6.0:1  | Primary button label       |
| Ink on Sun State #F7C600             | 11.0:1 | Primary button label       |
| White on Kenworth #E31C3D            | 4.6:1  | Primary button label       |
| Cream #F2EEE6 on ink                 | 15.1:1 | Dark chrome text           |
| #B8B0A2 on ink                       | 7.6:1  | Footer links               |
| #8A8273 on ink                       | 4.6:1  | Footer legal row           |

Note the two that constrain future work: **Kenworth red needs white text**
(ink on that red is only 3.2:1 and fails), and **#8A8273 on ink is at the
floor** — do not go lighter on the ink background or darker in the footer.

The accent-as-text colors (`--color-accent-text`) exist precisely because the
accent fills themselves are too light to use as text on white. Never set body
copy to `--color-accent`.

## Still open

- **Hero scrim.** Headline contrast over the hero photo relies on the gradient
  scrim, which is tuned to the comp's images. If you swap in a lighter photo,
  re-check the h1 and lede against the new image and deepen the scrim if needed.
- **Heading order.** Each page runs a single `h1` and section-level `h2`s, but a
  few section headings are styled `div.eyebrow` rather than real headings by
  design. If you need a strict document outline for an audit, promote the
  eyebrows to `<h3>` and restyle rather than adding hidden headings.
- **Location rail.** It's a horizontal scroll region. Keyboard users can tab
  through the cards and the browser scrolls to follow, but consider adding
  `tabindex="0"` and a group label to the rail itself if your audit requires the
  scroll container be reachable directly.
- **Form errors.** The demo handler shows a single combined message. A real
  implementation should mark the offending fields with `aria-invalid` and
  associate per-field messages with `aria-describedby`.
- **Reduced transparency / forced colors.** Not addressed. The translucent nav
  plate and the dark cards using `rgba(255,255,255,.04)` will need review if
  you support Windows High Contrast.
