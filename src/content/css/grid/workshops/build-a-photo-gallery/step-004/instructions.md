You defined the columns, but never the rows. The grid creates rows automatically as it needs them, and by default each one is only as tall as its content.

`grid-auto-rows` sets the height of every automatically created row. Now all the tiles share the same height, whatever is inside them.

## Task

Add `grid-auto-rows: 120px;` to `.gallery`.

## Hints

- The property name has "auto" in it because these are the *automatic* rows.
- `grid-auto-rows: 120px;`.
