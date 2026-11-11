Icons can be drawn inline with SVG. This button has a small circle icon beside its label. The label already says what the button does, so the icon is decoration, and `aria-hidden="true"` hides it from screen readers:

```html
<button type="button">
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
  </svg>
  Save this walk
</button>
```

## Task

Add the button above after the logo link, with the `svg` inside it and the text `Save this walk`.

## Hints

- Type the `svg` and its `circle` exactly as shown.
- The text sits after the `svg`, still inside the `button`.
