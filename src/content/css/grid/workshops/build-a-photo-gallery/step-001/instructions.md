Seven tiles are stacked in one column, because they are ordinary blocks. To arrange them in rows **and** columns, turn the gallery into a **grid container**.

That is the only switch you need. The gallery's direct children become grid items, and the browser starts placing them into cells. You will not see a change yet, because the grid has no columns defined.

## Task

Add a `.gallery` rule with `display: grid;`.

## Hints

- Create a new rule with the selector `.gallery`, above `.tile`.
- `.gallery { display: grid; }`.
