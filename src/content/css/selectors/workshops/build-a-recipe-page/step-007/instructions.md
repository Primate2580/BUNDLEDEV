The **adjacent sibling combinator** `+` matches an element that comes *immediately after* another one, with the same parent. `h2 + p` means "a paragraph right after an `h2`".

Only the method paragraph directly follows an `h2`. The first `h2` is followed by a list, so it has no adjacent paragraph, and the intro paragraph comes after an `h1`, not an `h2`.

## Task

Add a rule for `h2 + p` with `font-weight: 600;`.

## Hints

- The `+` goes between the two selectors.
- `h2 + p { font-weight: 600; }`.
