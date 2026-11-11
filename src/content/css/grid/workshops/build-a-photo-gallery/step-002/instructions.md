Columns are defined with `grid-template-columns`, a list with one size per column. `1fr` means one share of the leftover space, so `1fr 1fr 1fr` is three equal columns.

`repeat(3, 1fr)` is the same list written shorter: three columns, each `1fr`. Use `repeat()` whenever a size is repeated.

## Task

Add `grid-template-columns: repeat(3, 1fr);` to `.gallery`.

## Hints

- It goes in the `.gallery` rule you just made.
- `grid-template-columns: repeat(3, 1fr);`.
