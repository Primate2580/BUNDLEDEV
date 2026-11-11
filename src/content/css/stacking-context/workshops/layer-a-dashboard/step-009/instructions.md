The modal goes above its overlay, at `300`. Centre it with `top: 50%` and `left: 50%`, and pull it back by half of its own size with a transform.

The transform creates a stacking context on the modal. That is harmless here: the modal's children stay inside it, and its own level on the page is `300`.

## Task

In `.modal`, add `position: fixed;`, `top: 50%;`, `left: 50%;`, `transform: translate(-50%, -50%);` and `z-index: 300;`.

## Hints

- Five declarations in `.modal`.
- `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 300;`
