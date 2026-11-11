Next, the cards. A card that lifts and gains a stronger shadow feels tactile. `transform` and `box-shadow` are the two properties that change, so those two are the list.

`transform` is cheap for the browser to animate, because it does not change the layout, so the cards beside it do not move. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `transition-property: transform, box-shadow;` to the `.card` rule. Then add a new rule `.card:hover` with `transform: translateY(-6px);` and `box-shadow: 0 16px 28px rgb(15 23 42 / 0.18);`.

## Hints

- One declaration in `.card`, and a new rule.
- `.card:hover { transform: translateY(-6px); box-shadow: 0 16px 28px rgb(15 23 42 / 0.18); }`
