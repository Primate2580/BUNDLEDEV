Right now the text runs the whole width of the window, which means very long lines on a wide screen. Capping the article at about 65 characters keeps the eye comfortable.

`ch` is the width of a `0` in the current font, so `65ch` follows the text size. Use `max-width` rather than `width`, so the column can still shrink on a phone. The rule already has `margin: 0 auto`, which centres it.

## Task

Add `max-width: 65ch;` to the `.post` rule.

## Hints

- It goes on `.post`, the article element.
- `max-width: 65ch;`
