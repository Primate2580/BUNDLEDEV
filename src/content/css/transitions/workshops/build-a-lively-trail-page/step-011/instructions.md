Now the question panel. It should fold open when the label is clicked. A panel with `height: auto` cannot animate, so use a **grid row** that goes from `0fr` to `1fr`. The row grows from nothing to the content's own height.

The inner box needs `overflow: hidden`, so that the content is clipped while the row is small. The checkbox is hidden but still works, and the `:checked` rule opens the panel. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `cursor: pointer;` to the `.faq-label` rule. Add a rule `.faq-panel` with `display: grid;` and `grid-template-rows: 0fr;`, a rule `.faq-inner` with `overflow: hidden;`, and a rule `.faq-toggle:checked ~ .faq-panel` with `grid-template-rows: 1fr;`.

## Hints

- `.faq-toggle:checked ~ .faq-panel` uses the general sibling combinator `~`, because the panel comes after the label.
- `.faq-panel { display: grid; grid-template-rows: 0fr; }`
