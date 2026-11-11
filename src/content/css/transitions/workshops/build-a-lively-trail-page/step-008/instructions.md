A card moves further than a link changes colour, so it can take a little longer: `0.3s`. For the curve, use a custom `cubic-bezier()`. This one starts fast and lands softly.

A `cubic-bezier()` needs four numbers, and the first and third must be between 0 and 1. Write a space after each comma, so the browser reads it back exactly as you typed it.

## Task

Add `transition-duration: 0.3s;` and `transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);` to the `.card` rule.

## Hints

- Two declarations in `.card`.
- `transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);`
