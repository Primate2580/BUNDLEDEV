Style each card with padding and rounded corners, in `rem`. Then add the second query: when there is room for it, the grid gets two columns. The query goes after the base rules.

`repeat(2, 1fr)` means two columns of equal width. The media rule changes only the column count, and the cards themselves do not change. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `padding: 1.25rem;` and `border-radius: 0.75rem;` to the `.route` rule. Then add `@media (min-width: 40em) { .routes { grid-template-columns: repeat(2, 1fr); } }` after the title query.

## Hints

- Two declarations in `.route`, and a new block at the end.
- `@media (min-width: 40em) {
  .routes { grid-template-columns: repeat(2, 1fr); }
}`
