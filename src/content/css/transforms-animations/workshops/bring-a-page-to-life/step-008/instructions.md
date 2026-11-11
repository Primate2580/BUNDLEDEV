A button that keeps moving is hard to click. People reach for it, and it grows under the pointer. A friendly fix is to freeze the animation while the pointer is over the button. The property for that is `animation-play-state`, which can be `running` or `paused`.

We write `running` in the normal rule, which makes the intent clear, and `paused` in a hover rule. While we are on the button, we will also give it a pointer cursor, so that people can tell it is clickable.

## Task

In the `.cta` rule, add:

```css
animation-play-state: running;
cursor: pointer;
```

Then add a new rule below it:

```css
.cta:hover {
  animation-play-state: paused;
}
```

## Hints

- Two declarations in `.cta`, and one new rule.
- Hover over the button in the preview to see the pulse freeze.
