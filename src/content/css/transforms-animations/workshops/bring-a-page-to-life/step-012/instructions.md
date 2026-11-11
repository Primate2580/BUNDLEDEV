One last thing, and it is the most important. The pulse never stops, which can be tiring for everyone and a real problem for some people. We will limit it to three pulses, which is plenty to draw the eye.

And for people who have asked their system for less motion, we add a safety net that shortens every animation and stops them from repeating. It lives inside a media query that matches when that setting is on:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The media query cannot be checked here, because the preview does not switch that setting on, so test it with the Rendering panel in your developer tools.

## Task

In the `.cta` rule, change `animation-iteration-count` from `infinite` to `3`. Then add the reduced motion media query exactly as shown above, at the end of the stylesheet.

## Hints

- Change one value, and paste the media query at the very end.
- In Chrome DevTools, open the Rendering panel and emulate `prefers-reduced-motion: reduce` to try it.
