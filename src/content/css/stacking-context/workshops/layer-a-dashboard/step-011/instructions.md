Remember the back-to-top link? It is `position: fixed`, but inside `.page`, and `.page` has `transform: translateZ(0)`, an old "performance hack". A transform makes `.page` the containing block for fixed children, so the link scrolls with the page instead of staying in the window corner.

Remove the hack. `transform: none` creates no stacking context and no containing block, and the link sticks to the window again.

## Task

In `.page`, change `transform` to `none`.

## Hints

- Edit the value of the `transform` declaration.
- `transform: none;`
