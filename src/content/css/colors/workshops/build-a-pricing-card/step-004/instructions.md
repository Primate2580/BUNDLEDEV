The badge should look like a soft tint of the brand colour, not a solid block. That is a job for alpha. Take the same indigo as the border, `rgb(79 70 229)`, and add `/ 0.12` after a slash: 12% opaque.

Over the white card, 12% indigo looks like a pale lilac. The text gets a darker indigo, `#4338ca`, which has a contrast ratio of about 6.6:1 on that tint.

## Task

Add `background-color: rgb(79 70 229 / 0.12);` and `color: #4338ca;` to the `.badge` rule.

## Hints

- The alpha goes after a slash inside `rgb()`.
- `background-color: rgb(79 70 229 / 0.12);` and `color: #4338ca;`
