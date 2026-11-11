The tagline can use the very same keyframes. This is the benefit of writing them once: a second element costs three lines. But if it appeared at exactly the same moment as the title, it would feel flat, so we will make it wait a little.

A delay only looks right if the element is hidden while it waits. That is what the first half of `both` is for, so keep it.

## Task

In the `.tagline` rule, add:

```css
animation-name: rise;
animation-duration: 0.6s;
animation-delay: 0.2s;
animation-fill-mode: both;
```

## Hints

- Four declarations inside `.tagline`.
- Without `both`, the tagline would be visible during the delay and then jump.
