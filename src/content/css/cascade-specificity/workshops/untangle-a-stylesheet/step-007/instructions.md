The badge uses `#app .card span.badge`, which weighs `(1, 2, 1)`, and a `span` qualifier that does nothing useful. A badge is a badge, whatever element it is on. Use `.badge`.

Qualifying a class with its element name, such as `span.badge`, only adds weight. You can switch to another element later without touching the CSS.

## Task

Replace `#app .card span.badge` with `.badge`, and change its `background-color` to `#fde68a` and its `color` to `#78350f`.

## Hints

- One class, two new colours.
- `.badge { display: inline-block; ... background-color: #fde68a; color: #78350f; }`
