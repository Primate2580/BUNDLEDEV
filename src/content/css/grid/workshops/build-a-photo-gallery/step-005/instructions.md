Items normally take one cell each, but any item can stretch across several tracks. `grid-column: span 2` means: start wherever you are placed and cover two columns.

The featured tile now needs two columns, and there is only one column left on the first row, so the grid moves it to the next row. Notice the empty space it leaves behind. You will fix that in a few steps.

## Task

Add a `.featured` rule with `grid-column: span 2;`.

## Hints

- Create a new rule, selector `.featured`, below `.tile`.
- `.featured { grid-column: span 2; }`.
