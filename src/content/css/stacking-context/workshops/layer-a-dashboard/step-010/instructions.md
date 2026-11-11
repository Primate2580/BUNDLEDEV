A toast message must be visible even over a modal, so it takes the top of the scale: `400`. It sits in the bottom right corner of the window.

Four levels now: header `100`, overlay `200`, modal `300`, toast `400`. Each has room for something between.

## Task

In `.toast`, add `position: fixed;`, `right: 1rem;`, `bottom: 1rem;` and `z-index: 400;`.

## Hints

- Four declarations in `.toast`.
- `position: fixed; right: 1rem; bottom: 1rem; z-index: 400;`
