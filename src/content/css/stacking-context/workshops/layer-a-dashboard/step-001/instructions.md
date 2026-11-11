This page works, but nothing is layered on purpose yet. Start at the top: a header that stays visible while the cards scroll underneath it. `position: sticky` with `top: 0` does that, and it creates a stacking context on its own, even without a `z-index`.

Several checks in this workshop read declared values, because the preview cannot scroll or overlap on demand. Scroll the preview yourself to see each effect.

## Task

In the `.header` rule, add `position: sticky;` and `top: 0;`.

## Hints

- Two declarations in `.header`.
- `position: sticky; top: 0;`
