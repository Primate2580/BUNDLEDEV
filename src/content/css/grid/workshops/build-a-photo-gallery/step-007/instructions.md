Look at the gap beside the first two tiles. The grid places items in order, and it never goes back: once the large featured tile jumped to the next row, the cell it skipped stayed empty.

`grid-auto-flow: dense` tells the grid to go back and fill earlier holes with later items that fit. The visual order can then differ from the HTML order, so use it for galleries rather than for content that must be read in sequence.

## Task

Add `grid-auto-flow: dense;` to `.gallery`.

## Hints

- It is a container property.
- `grid-auto-flow: dense;`.
