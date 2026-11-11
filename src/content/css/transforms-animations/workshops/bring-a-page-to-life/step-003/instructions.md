Next, the title. Rather than appear all at once, we want it to rise into place while it fades in, which feels gentler. This is a good effect to reuse, so we will give the keyframes a descriptive name: `rise`.

```css
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Notice the title's own style already says `opacity: 1`, so the end of the animation matches how it normally looks. We also want the title to stay hidden until the animation starts, and to stay put afterwards. `animation-fill-mode: both` does both.

## Task

Add the `rise` keyframes at the end of the stylesheet. Then, in the `.title` rule, add:

```css
animation-name: rise;
animation-duration: 0.6s;
animation-fill-mode: both;
```

## Hints

- Keyframes at the end, three declarations in `.title`.
- `both` means the element holds the first keyframe before the start and the last one after the end.
