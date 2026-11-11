Keyboard users need to see which field has focus. `:focus-visible` shows a ring when it is helpful, such as for keyboard navigation and for typing into a field. Also raise the field's text to `1rem`, so phones do not zoom in when you tap it. Hover, focus and generated content cannot be checked automatically, so the checks look at the base styles. Hover over the preview, or use DevTools' `:hov` panel, to see the state rule work.

`outline-offset: 2px` pushes the ring slightly away from the border, so it does not blend into it.

## Task

Add `font-size: 1rem;` to the `.field` rule. Then add a new rule `.field:focus-visible` with `outline-width: 3px;`, `outline-style: solid;`, `outline-color: #4f46e5;` and `outline-offset: 2px;`.

## Hints

- One declaration in `.field`, and a new rule with four.
- `.field:focus-visible { outline-width: 3px; outline-style: solid; outline-color: #4f46e5; outline-offset: 2px; }`
