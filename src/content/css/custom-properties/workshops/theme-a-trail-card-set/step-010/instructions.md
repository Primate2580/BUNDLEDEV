Now the payoff for naming colours by their job. Everything in the stylesheet reads `--bg`, `--surface`, `--text` and `--muted`, so a dark theme is only a second set of values. The HTML already has `data-theme="dark"` on the wrapper, but nothing has happened yet, because no rule mentions it.

The attribute selector below applies to the wrapper and everything inside it, and it redefines the colour tokens. The brand gets a lighter indigo, so it keeps its contrast on dark:

```css
[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --brand: #818cf8;
}
```

## Task

Add the dark theme rule above, after the `.card--featured` rule. Then change `data-theme` in the HTML tab from `dark` to `light` and back, to see the theme respond. Leave it on `dark` when you are done.

## Hints

- One new rule with five declarations.
- No component rule needs to change.
