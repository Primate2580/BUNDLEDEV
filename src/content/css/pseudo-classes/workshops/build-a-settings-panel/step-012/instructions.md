Last, number the settings with a CSS counter. `counter-reset` on the list creates the counter, `counter-increment` on each row adds one, and `counter()` prints it, inside a `::before`. The rows are flex containers, so the number becomes the first flex item. Hover, focus and generated content cannot be checked automatically, so the checks look at the base styles. Hover over the preview, or use DevTools' `:hov` panel, to see the state rule work.

Also make sure that the list itself shows no bullets of its own, with `list-style-type: none`.

## Task

Add `counter-reset: setting;` and `list-style-type: none;` to the `.settings` rule. Then add a new rule `.setting::before` with `counter-increment: setting;`, `content: counter(setting) ".";`, `font-weight: 700;` and `color: #4f46e5;`.

## Hints

- Two declarations in `.settings`, and a new rule for the pseudo-element.
- `.setting::before { counter-increment: setting; content: counter(setting) "."; font-weight: 700; color: #4f46e5; }`
