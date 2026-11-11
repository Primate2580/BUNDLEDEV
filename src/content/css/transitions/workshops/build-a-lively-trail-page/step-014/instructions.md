Last, be kind to people who asked their system for less motion. Smooth scrolling is motion too, so set `scroll-behavior: smooth` on `html`, and then switch it off, along with the transitions, inside a `prefers-reduced-motion` query.

The media rule cannot be checked automatically, because the preview does not switch the preference on, so test it with the Rendering panel in DevTools. The check looks at the smooth scrolling. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add a rule `html` with `scroll-behavior: smooth;`. Then add a media query `@media (prefers-reduced-motion: reduce)` containing the rule `*, *::before, *::after` with `transition-duration: 0.01ms !important;`, `transition-delay: 0s !important;` and `scroll-behavior: auto !important;`.

## Hints

- Add the `html` rule first, then the media query at the very end of the file.
- `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; transition-delay: 0s !important; scroll-behavior: auto !important; } }`
