The featured card gets its border from `#app .card:first-child`, a rule that depends on the card being the first child. If you add another card above it, the style would move to the wrong one. The HTML has a descriptive class for this: `card--featured`.

The new rule sits after `.card`, so that its border replaces the card's own. Because both weigh `(0, 1, 0)`, order alone decides.

## Task

Replace `#app .card:first-child` with `.card--featured`, and change its border colour to `#4f46e5`.

## Hints

- Rename the selector, and change the colour in the `border` shorthand.
- `.card--featured { border: 2px solid #4f46e5; }`
