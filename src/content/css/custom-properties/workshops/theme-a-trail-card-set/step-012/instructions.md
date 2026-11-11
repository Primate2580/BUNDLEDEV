One last use of a variable, and it matters for people. We would like the button's colour change to be quick, but we would also like to turn it off for anyone who has asked their system for less motion. If the duration is a variable, one small media query does it for every transition that uses it.

```css
--duration: 0.2s;
```

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration: 0.01ms;
  }
}
```

## Task

Add `--duration: 0.2s;` to your `:root` rule. In the `.btn` rule, add `transition-property: background-color;` and `transition-duration: var(--duration);`. Then add the reduced motion media query above at the end of the stylesheet.

## Hints

- One token, two declarations in `.btn`, and one media query at the end.
- In Chrome DevTools, the Rendering panel can emulate `prefers-reduced-motion: reduce`.
