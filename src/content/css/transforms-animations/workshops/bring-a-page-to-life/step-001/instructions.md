This page is finished apart from one thing: nothing on it moves. Over the next twelve steps we will bring it to life, starting at the top with the loading ring.

A CSS animation has two halves. The `@keyframes` rule describes what should happen, and a few `animation` properties on the element say which keyframes to play. Let's write the keyframes first. A ring that spins is simply a ring that turns a full circle, so we only need an end step:

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

There is no `from` step, because the ring's starting point is its own style.

## Task

At the very end of the stylesheet, add the `spin` keyframes exactly as shown above. Then, in the `.spinner` rule, add this declaration so the ring plays them:

```css
animation-name: spin;
```

## Hints

- The keyframes go at the top level, after the last rule, not inside `.spinner`.
- `animation-name` has to match the keyframes name exactly: `spin`.
