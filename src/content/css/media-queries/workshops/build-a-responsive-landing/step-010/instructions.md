Now the footer, and dark mode. The base styles are light. A `prefers-color-scheme: dark` query overrides just the colours for people who have chosen a dark system theme. Keep this kind of rule together at the end, so all your preference overrides are easy to find.

The padding and centring belong in the base, because they apply in every colour scheme. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `padding: 1.5rem 1rem;` and `text-align: center;` to the `.footer` rule. Then add `@media (prefers-color-scheme: dark) { .footer { background-color: #1e1b4b; color: #e0e7ff; } }` at the end.

## Hints

- Two declarations in `.footer`, and a new block at the end.
- `@media (prefers-color-scheme: dark) {
  .footer { background-color: #1e1b4b; color: #e0e7ff; }
}`
