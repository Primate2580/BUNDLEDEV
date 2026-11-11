A short coloured bar under the title is a classic `::after` decoration. An empty `content` string makes a real box, and `display: block` gives it a width and a height. Hover, focus and generated content cannot be checked automatically, so the checks look at the base styles. Hover over the preview, or use DevTools' `:hov` panel, to see the state rule work.

Raise the title's size in the base rule, to give the accent something to sit under.

## Task

Change the `.panel-title` rule's `font-size` to `1.5rem`. Then add a new rule `.panel-title::after` with `content: "";`, `display: block;`, `width: 2.5rem;`, `height: 4px;`, `margin-top: 0.5rem;`, `border-radius: 999px;` and `background-color: #4f46e5;`.

## Hints

- Edit one value, and add a new rule.
- `.panel-title::after { content: ""; display: block; width: 2.5rem; height: 4px; margin-top: 0.5rem; border-radius: 999px; background-color: #4f46e5; }`
