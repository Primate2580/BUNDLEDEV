Selectors can describe where an element sits. The **child combinator** `>` means "a direct child of". `.recipe > p` matches paragraphs that are directly inside the element with class `recipe`.

Here the three paragraphs are all direct children of the recipe, so all three match. If a paragraph were nested deeper, inside a `div`, the `>` would skip it.

## Task

Add a rule for `.recipe > p` with `margin-bottom: 12px;`.

## Hints

- Write the parent, a `>`, then the child: `.recipe > p`.
- `.recipe > p { margin-bottom: 12px; }`.
