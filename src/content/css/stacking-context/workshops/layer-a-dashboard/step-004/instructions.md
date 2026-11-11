Place the label in the corner of its card. It is absolute inside the card, so its `z-index` is only compared with other things inside that card's context. A small number such as `2` is plenty.

The label's number does not need to be bigger than the header's. It cannot reach the header: it is trapped, **usefully**, inside a card at level `1`.

## Task

In `.tip`, add `position: absolute;`, `top: 0.6rem;`, `right: 0.75rem;` and `z-index: 2;`.

## Hints

- Four declarations in `.tip`.
- `position: absolute; top: 0.6rem; right: 0.75rem; z-index: 2;`
