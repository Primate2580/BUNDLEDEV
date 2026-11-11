With the logo growing, there is no free space left for `space-between` to share, so it is no longer doing anything useful. Now the logo's `flex-grow` is what spreads the layout.

Replace `space-between` with `flex-start` to say what you actually mean: pack the items from the start, and let the growing logo take the rest. Same result, clearer intent.

## Task

Change `justify-content` in `.site-header` from `space-between` to `flex-start`.

## Hints

- Edit the existing `justify-content` line instead of adding a new one.
- It should read `justify-content: flex-start;`.
