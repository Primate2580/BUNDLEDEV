Spacing repeats even more than colour. The card padding, the gap between cards and the button padding are all built from the same small and medium steps. Two tokens are enough here, and the numbers in their names say which is bigger.

```css
--space-2: 0.5rem;
--space-3: 1rem;
```

## Task

Add the two tokens to `:root`. Then, in `.card`, set `padding` to `var(--space-3)`. In `.cards`, set `gap` to `var(--space-3)`. In `.btn`, set `padding` to `var(--space-2) var(--space-3)`.

## Hints

- Two new lines, and three values replaced.
- `var()` can be one part of a value, as in the button's padding.
