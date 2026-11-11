Next, the link. Give it a bolder weight in the base rule, and add a **hover** state. `:hover` applies while the pointer is over the link, and the hover rule goes after the base rule so it can override it. Hover, focus and generated content cannot be checked automatically, so the checks look at the base styles. Hover over the preview, or use DevTools' `:hov` panel, to see the state rule work.

A thicker underline and a darker colour are a clear but quiet signal that the link is interactive.

## Task

Add `font-weight: 600;` to the `.help-link` rule. Then add a new rule `.help-link:hover` with `color: #3730a3;` and `text-decoration-thickness: 3px;`.

## Hints

- One declaration in `.help-link`, and a new rule.
- `.help-link:hover { color: #3730a3; text-decoration-thickness: 3px; }`
