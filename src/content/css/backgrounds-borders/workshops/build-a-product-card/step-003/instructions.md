The image area at the top is empty. Fill it with a gradient, which is a CSS image, so it goes in `background-image`, not `background-color`. Keep a solid `background-color` behind it as a fallback.

`135deg` points to the bottom right, so the blend runs from indigo at the top left to pink at the bottom right.

## Task

Add `background-color: #4f46e5;` and `background-image: linear-gradient(135deg, #4f46e5, #db2777);` to the `.media` rule.

## Hints

- Both go in `.media`.
- `background-color: #4f46e5; background-image: linear-gradient(135deg, #4f46e5, #db2777);`
