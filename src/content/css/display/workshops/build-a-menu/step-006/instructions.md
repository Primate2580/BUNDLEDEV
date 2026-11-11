There is a thin, unintended gap between the menu items. It comes from the **whitespace in the HTML**: the line break between each `li` is treated as a space character, and inline-block items sit in a line of text, so that space shows.

A more reliable way to lay out a row is flexbox. Setting `display: flex` on the list turns its `li` elements into flex items, which ignore the whitespace, and `gap` gives you exact, intentional spacing.

## Task

Add `display: flex;` and `gap: 4px;` to `.menu-list`.

## Hints

- Put both declarations on the `ul`, the parent, not on the `li` elements.
- `display: flex;` and `gap: 4px;` inside `.menu-list`.
