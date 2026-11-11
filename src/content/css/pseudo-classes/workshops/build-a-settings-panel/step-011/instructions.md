Finish the panel with a soft shadow in the base rule, and a branded text selection. `::selection` styles text the reader highlights, and only colours work, so choose a pair with strong contrast. Hover, focus and generated content cannot be checked automatically, so the checks look at the base styles. Hover over the preview, or use DevTools' `:hov` panel, to see the state rule work.

Selecting text in the preview is the quickest way to test it.

## Task

Add `box-shadow: 0 10px 25px rgb(15 23 42 / 0.12);` to the `.panel` rule. Then add a new rule `.panel ::selection` with `background-color: #c7d2fe;` and `color: #1e1b4b;`.

## Hints

- One declaration in `.panel`, and a new rule with a space before `::selection`.
- `.panel ::selection { background-color: #c7d2fe; color: #1e1b4b; }`
