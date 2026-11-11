Variables can change inside a media query, even though they cannot be used in its condition. We store the number of columns as a bare number, use it in the grid, and raise it on wider screens. The grid rule stays untouched.

```css
:root {
  --cols: 1;
}

@media (min-width: 48rem) {
  :root {
    --cols: 3;
  }
}
```

## Task

Add `--cols: 1;` to your existing `:root` rule. In the `.cards` rule, change `grid-template-columns` to `repeat(var(--cols), 1fr)`. Then, at the end of the stylesheet, add a media query that sets `--cols` to `3` from `48rem` wide.

## Hints

- Three edits: a token, a changed value, and a media query at the end.
- Drag the width of the preview to see the columns change.
