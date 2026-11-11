Changing the layout is now a one-word edit. Replace the `3` in `repeat()` with a `4` and every tile reflows into four columns, with the featured tile and the dense packing adapting automatically.

That is the benefit of describing a grid with tracks instead of fixed positions: the items find their own cells.

## Task

Change `grid-template-columns` in `.gallery` to `repeat(4, 1fr);`.

## Hints

- Edit the existing line rather than adding a new one.
- `grid-template-columns: repeat(4, 1fr);`.
