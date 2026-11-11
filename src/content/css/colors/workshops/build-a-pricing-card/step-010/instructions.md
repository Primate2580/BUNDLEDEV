The second button is a secondary action, so it should be quieter: no fill, just an outline. `transparent` is the fully see-through colour, so the white card shows straight through it.

The ghost button's border has been invisible all along. The shared `.cta` rule gave every button a `2px solid transparent` border, which simply reserves the space. Now the ghost button's border gets the brand colour.

## Task

Add `background-color: transparent;`, `color: #4f46e5;` and `border-color: #4f46e5;` to the `.cta-ghost` rule.

## Hints

- All three go in the `.cta-ghost` rule, which comes after `.cta` so it wins.
- `background-color: transparent;`, `color: #4f46e5;` and `border-color: #4f46e5;`
