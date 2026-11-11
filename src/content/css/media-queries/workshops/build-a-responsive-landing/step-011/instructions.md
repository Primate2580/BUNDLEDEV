Respect people who ask for less motion. The button has a colour transition, and a gentle fade is usually fine, but some people want all animation off. A `prefers-reduced-motion: reduce` query shortens it to almost nothing.

Also add a little letter spacing to the button text in the base rule. Spacing set in `em` follows the font size. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `letter-spacing: 0.02em;` to the `.btn` rule. Then add `@media (prefers-reduced-motion: reduce) { .btn { transition-duration: 0.01ms; } }` at the end.

## Hints

- One declaration in `.btn`, and a new block at the end.
- `@media (prefers-reduced-motion: reduce) {
  .btn { transition-duration: 0.01ms; }
}`
