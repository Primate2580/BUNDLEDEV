Now the cards. Each card will hold a small label, the `.tip`, that is placed absolutely inside it. For that, the card needs to be **positioned**, so it becomes the containing block. Give it `z-index: 1`, a small local number. The card becomes a stacking context at level `1`, well below the header at `100`.

A card at `1` and a header at `100` can never fight over the same screen space, whatever they contain.

## Task

In `.card`, add `position: relative;` and `z-index: 1;`.

## Hints

- Two declarations in `.card`.
- `position: relative; z-index: 1;`
