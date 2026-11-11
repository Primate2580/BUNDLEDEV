Right now the four menu items stack in a column. A `li` is a **block-level** element, so each one starts on a new line and takes the full width available. That is the default `display` value for list items.

`display: inline-block` makes an element sit in a line like a word, side by side with its neighbours, while still behaving like a box. It is a simple way to make a row.

## Task

Add a rule for `.menu-list li` with `display: inline-block;`.

## Hints

- The selector is `.menu-list li`: every `li` inside `.menu-list`.
- `.menu-list li { display: inline-block; }`.
