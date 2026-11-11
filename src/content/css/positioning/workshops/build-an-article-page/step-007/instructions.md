The "Up" button is stuck in the normal flow, somewhere on the page. A floating action button belongs in a fixed spot in the window, whatever the scroll position. `position: fixed` pins it to the viewport.

`1.5rem` from the bottom and right edges keeps it clear of the window's edge. It is out of the flow, so it takes up no room.

## Task

Add `position: fixed;`, `bottom: 1.5rem;` and `right: 1.5rem;` to the `.fab` rule.

## Hints

- Three declarations in `.fab`.
- `position: fixed; bottom: 1.5rem; right: 1.5rem;`
