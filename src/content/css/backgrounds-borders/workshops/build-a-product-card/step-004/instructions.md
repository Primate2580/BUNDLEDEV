Look at the top corners of the gradient. They are square, and they poke out past the card's rounded corners, because rounding does not clip a child's background.

`overflow: hidden` on the rounded element clips everything inside it to the rounded shape. After this step, the gradient follows the card's curve.

## Task

Add `overflow: hidden;` to the `.product` rule.

## Hints

- The rounded element is `.product`.
- `overflow: hidden;`
