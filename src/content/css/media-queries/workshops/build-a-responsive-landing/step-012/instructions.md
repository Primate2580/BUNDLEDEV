Last, the printed page. Navigation and buttons are no use on paper, so a print query hides them. Everything else flows normally. The base footer text also gets a slightly smaller size, which suits a footer.

You have now used queries for width, hover, colour scheme, motion and print. Each one is an `if` for the stylesheet. Media rules cannot be checked automatically, so switch the preview between Phone, Tablet and Full width to see it work.

## Task

Add `font-size: 0.875rem;` to the `.footer` rule. Then add `@media print { .site-header, .btn { display: none; } }` at the end.

## Hints

- One declaration in `.footer`, and a new block at the very end.
- `@media print {
  .site-header, .btn { display: none; }
}`
