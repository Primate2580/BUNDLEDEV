Now we make the button configurable. A component can read its own settings, with a default for each one, and anybody can change the look by setting a variable. The first setting falls back to the brand colour, the second to white, and we will add a third for the font weight, nudged up a little to 700.

A fallback is the second value inside `var()`, after a comma. It is only used when the variable is not defined:

```css
background-color: var(--btn-bg, var(--brand));
color: var(--btn-text, #ffffff);
font-weight: var(--btn-weight, 700);
```

## Task

In the `.btn` rule, replace the `background-color`, `color` and `font-weight` values with the three lines above.

## Hints

- Three values replaced in `.btn`.
- No button defines any of these settings yet, so the fallbacks decide. The text gets a little bolder.
