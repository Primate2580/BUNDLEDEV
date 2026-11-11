This trail page works, but look at its stylesheet. The same indigo, `#4f46e5`, is written in two places, and plenty of other numbers repeat. Over the next twelve steps we will give every repeated decision a name, so the page can be restyled, re-themed and made responsive from a few lines.

Start with the brand colour. A custom property is declared with two dashes, and the top of the page, `:root`, is the best place to keep the ones everything shares:

```css
:root {
  --brand: #4f46e5;
}
```

## Task

Add the `:root` rule above, just under the `body` rule. Then, in the `.title` rule, change `color` to `var(--brand)`, and in the `.btn` rule, change `background-color` to `var(--brand)`.

## Hints

- Three edits: one new rule, and two values replaced by `var(--brand)`.
- There is no space between `var` and the bracket.
