The hero title is `2rem` on a phone, which is a good size for a narrow screen. On larger screens, there is room for a bigger headline, and this is the first media query. It sits **after** the base rule, and it only changes the one thing that needs to change.

The base keeps the title tight and bold. The query below it raises the size once the viewport is at least 40em, about 640px. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `margin: 0 0 0.5rem;` and `font-weight: 800;` to the `.hero-title` rule. Then, after all the rules, add `@media (min-width: 40em) { .hero-title { font-size: 3rem; } }`.

## Hints

- The two declarations go in `.hero-title`. The query is a new block at the end of the CSS.
- `@media (min-width: 40em) {
  .hero-title { font-size: 3rem; }
}`
