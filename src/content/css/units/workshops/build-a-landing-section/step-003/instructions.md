A hero should feel like a stage, so give it height that follows the window. Use `min-height`, not `height`, so the content can still grow it if it needs more room, and a viewport unit, `vh`, for 1% of the window's height.

`60vh` is 60% of the window's height. The hero is already a flex container with `align-items: center`, so the content sits in the middle of the extra space.

## Task

Add `min-height: 60vh;` to the `.hero` rule.

## Hints

- Use `min-height`, not `height`.
- `min-height: 60vh;`
