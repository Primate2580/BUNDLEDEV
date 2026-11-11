Tokens can be built from other tokens. The page needs a larger gap around its content, which should always be twice the medium step. Writing it with `calc()` means it follows `--space-3` automatically.

```css
--space-4: calc(var(--space-3) * 2);
```

## Task

Add the `--space-4` token to `:root`, as shown above. Then, in the `.page` rule, set `padding` to `var(--space-4) var(--space-3)`.

## Hints

- One new line, and one value replaced.
- Multiplying a length by a bare number is fine in `calc()`.
