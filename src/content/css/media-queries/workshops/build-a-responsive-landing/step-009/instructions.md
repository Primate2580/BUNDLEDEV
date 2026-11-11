Give the button rounded ends and a colour transition. Hover effects should only apply on devices that can really hover, because on a touch screen a tap can leave the hover state stuck on. The `(hover: hover)` query takes care of that.

The transition is set in the base rule, and the hover style is wrapped in the query. A longhand `transition-duration` keeps it readable. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `border-radius: 999px;`, `transition-property: background-color;` and `transition-duration: 0.2s;` to the `.btn` rule. Then add `@media (hover: hover) { .btn:hover { background-color: #3730a3; } }` at the end.

## Hints

- Three declarations in `.btn`, and a new block at the end.
- `@media (hover: hover) {
  .btn:hover { background-color: #3730a3; }
}`
