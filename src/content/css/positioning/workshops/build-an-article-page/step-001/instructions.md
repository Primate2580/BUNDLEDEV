A site header should stay in view as the reader scrolls. `position: sticky` does that while keeping the header in the layout, so nothing hides beneath it. A sticky element needs a threshold to know where to stick, and `top: 0` means "right at the top of the window".

Scroll the preview after this step. The header scrolls normally until it reaches the top, and then it stays there.

## Task

Add `position: sticky;` and `top: 0;` to the `.site-header` rule.

## Hints

- Both go in `.site-header`.
- `position: sticky; top: 0;`
