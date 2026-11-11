Finish the panel with an arrow that turns when it opens. The arrow is a small box with two borders, rotated 45 degrees, and opening the panel turns it a further 180 degrees. Transition `transform` with the same `0.3s`, so the arrow and the panel move together.

The selector `.faq-toggle:checked + .faq-label .faq-arrow` reads: an arrow inside the label that comes straight after a checked checkbox. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `transition-property: transform;` and `transition-duration: 0.3s;` to the `.faq-arrow` rule. Then add a new rule `.faq-toggle:checked + .faq-label .faq-arrow` with `transform: rotate(225deg);`.

## Hints

- Two declarations in `.faq-arrow`, and a new rule.
- `.faq-toggle:checked + .faq-label .faq-arrow { transform: rotate(225deg); }`
