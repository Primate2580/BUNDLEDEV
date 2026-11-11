One element can carry several classes, separated by spaces. The basil item has `class="ingredient optional"`. To target an element that has **both** classes, write the two class selectors together with **no space** between them.

`.ingredient.optional` means: an element that is an ingredient and is optional. With a space (`.ingredient .optional`) it would mean something very different: an optional element *inside* an ingredient.

## Task

Add a rule for `.ingredient.optional` with `color: #6b7280;`.

## Hints

- Join the two classes with no space: `.ingredient.optional`.
- `.ingredient.optional { color: #6b7280; }`.
