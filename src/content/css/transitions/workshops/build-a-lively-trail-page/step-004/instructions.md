Add an underline that fades in. `text-decoration-line` itself cannot animate, because it has no in-between values, so keep the underline **always on** and make its **colour** transparent at rest. `text-decoration-color` then fades smoothly.

List both properties in `transition-property`, separated by a comma and a space. The single duration is shared by both. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

In `.nav-link`, change `text-decoration-line` to `underline`, change `transition-property` to `color, text-decoration-color`, and add `text-decoration-color: transparent;` and `text-underline-offset: 0.3em;`. Then add `text-decoration-color: currentColor;` to the `.nav-link:hover` rule.

## Hints

- Four edits in `.nav-link`, and one new declaration in `.nav-link:hover`.
- `transition-property: color, text-decoration-color;`
