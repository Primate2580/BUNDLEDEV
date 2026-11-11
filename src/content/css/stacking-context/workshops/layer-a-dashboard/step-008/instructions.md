Now the layers above the whole page. The overlay dims everything, so it goes at `200`, above the header. It is fixed and stretched to all four edges, which `inset: 0` writes in one line.

The overlay and the modal are placed **outside** `.page` in the HTML, which keeps them out of the content's isolated bubble, and in the root context where the scale lives.

## Task

In `.overlay`, add `position: fixed;`, `inset: 0;` and `z-index: 200;`.

## Hints

- Three declarations in `.overlay`.
- `position: fixed; inset: 0; z-index: 200;`
