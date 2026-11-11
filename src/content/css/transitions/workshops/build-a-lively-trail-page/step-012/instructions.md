The panel opens, but it jumps. Add the transition to the **panel**, on `grid-template-rows`. Current browsers can animate grid tracks, as long as both lists have the same number of tracks, as here.

The panel is the element that changes, so the transition belongs on `.faq-panel`, not on the inner box.

## Task

Add `transition-property: grid-template-rows;` and `transition-duration: 0.3s;` to the `.faq-panel` rule.

## Hints

- Two declarations in `.faq-panel`.
- `transition-property: grid-template-rows;`
