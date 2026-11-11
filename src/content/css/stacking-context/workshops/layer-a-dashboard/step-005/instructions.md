The menu belongs to the header, and it should drop down below it. Since the header is sticky, it is positioned, and so it is the containing block for an absolute child. The menu's `z-index: 10` is a local number inside the header's context, which sits at `100` on the page, so the menu will always be above the cards.

This is the lesson of the whole topic in one step: the menu needs a small number, because its **folder** is already high.

## Task

In `.menu`, add `position: absolute;`, `top: 100%;`, `right: 0;` and `z-index: 10;`.

## Hints

- Four declarations in `.menu`.
- `position: absolute; top: 100%; right: 0; z-index: 10;`
