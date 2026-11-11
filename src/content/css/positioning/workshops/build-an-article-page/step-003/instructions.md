The contents list on the left should follow the reader down the page. Make it sticky too, but with a larger `top`. The header is 4rem tall, so `5rem` leaves a gap of 1rem below it.

The `.toc` rule already has `align-self: start`. In a grid, that keeps the sidebar at its natural height. Without it, it would be stretched to the full height of its row, and would have no room to move.

## Task

Add `position: sticky;` and `top: 5rem;` to the `.toc` rule.

## Hints

- Both go in `.toc`.
- `position: sticky; top: 5rem;`
