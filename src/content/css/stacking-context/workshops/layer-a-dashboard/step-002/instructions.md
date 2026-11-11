A sticky header is only useful if it stays **above** the content scrolling under it. Both live in the page's stacking context, so a `z-index` decides. Give the header the first level of a small scale: `100`.

Leave room between levels (100, 200, 300, and so on), so that you can slip a new one in later.

## Task

Add `z-index: 100;` to the `.header` rule.

## Hints

- One declaration in `.header`.
- `z-index: 100;`
