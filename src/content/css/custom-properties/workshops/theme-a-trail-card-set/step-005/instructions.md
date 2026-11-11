A custom property can hold more than a single word. A shadow is several parts, and it is a good candidate, because it is long, it is hard to type twice, and a designer will want to adjust it in one place.

```css
--shadow: 0 4px 12px rgb(15 23 42 / 0.15);
```

The browser keeps the whole text exactly as written, and checks it only when it is used.

## Task

Add the `--shadow` token to `:root`, with the value shown above. Then, in the `.card` rule, replace the `box-shadow` value with `var(--shadow)`.

## Hints

- Copy the shadow text from the `.card` rule into the token, and then replace it with the name.
- Keep the spaces inside the shadow exactly as they are.
