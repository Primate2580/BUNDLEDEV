Make the label of a ticked checkbox stand out. The label comes right after its input, so the **adjacent sibling combinator** `+` links them: `input:checked + label` means "a label that directly follows a checked input".

`:checked` is a pseudo-class that the browser keeps up to date. Untick a box in the preview, and the label goes back to normal, with no JavaScript.

## Task

Add a new rule `input:checked + label` with `font-weight: 700;`.

## Hints

- Remember the `+`. Without it, the space would mean a descendant.
- `input:checked + label { font-weight: 700; }`
