This page works, but its stylesheet is tangled: every rule hangs off the `#app` ID, so every rule weighs a lot. `#app .card` is `(1, 1, 0)`. To change anything later, you would need a selector at least that heavy.

Start with the card. Replace the selector `#app .card` with the single class `.card`, which weighs `(0, 1, 0)`, and take the chance to round the corners a little more. You are not changing how it looks, only what it costs to override.

## Task

Change the selector `#app .card` to `.card`, and change its `border-radius` to `1rem`.

## Hints

- Edit the selector of the rule and the radius value.
- `.card { padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 1rem; background-color: #ffffff; }`
