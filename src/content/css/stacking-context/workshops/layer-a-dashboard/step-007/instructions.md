A back-to-top link should stay in the corner of the window. That is `position: fixed`. It always creates a stacking context, so it gets a number from the scale: `50`, below the header.

Look at where the link ends up in the preview after you scroll. Keep that in mind: it will matter in a later step.

## Task

In `.back-top`, add `position: fixed;`, `bottom: 1rem;`, `left: 1rem;` and `z-index: 50;`.

## Hints

- Four declarations in `.back-top`.
- `position: fixed; bottom: 1rem; left: 1rem; z-index: 50;`
