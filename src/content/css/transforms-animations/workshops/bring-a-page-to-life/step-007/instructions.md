Time for the button. We want it to pulse gently, to draw the eye. A pulse is a small growth and shrink, so the only step we need is the middle one. The start and end are filled in from the button's own style:

```css
@keyframes pulse {
  50% {
    transform: scale(1.05);
  }
}
```

Keep it small, around five percent. A bigger pulse is distracting, and a pulse that never stops is tiring, but we will deal with that later.

## Task

Add the `pulse` keyframes at the end of the stylesheet, and then in the `.cta` rule add:

```css
animation-name: pulse;
animation-duration: 1.5s;
animation-iteration-count: infinite;
```

## Hints

- Keyframes at the end, three declarations in `.cta`.
- The easing is left as the default, `ease`, which is fine for a pulse.
