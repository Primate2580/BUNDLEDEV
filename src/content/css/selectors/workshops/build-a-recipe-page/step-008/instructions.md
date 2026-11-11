**Attribute selectors** match elements by the attributes they carry. `[href]` matches anything with an `href`, and `[href^="https"]` matches an `href` that **starts with** `https`.

That is handy for styling external links differently, without adding a class to each one. Other useful operators are `$=` (ends with) and `*=` (contains).

## Task

Add a rule for links whose `href` starts with `https`, and make them `color: #047857;`.

## Hints

- Put the attribute test in square brackets after the element name.
- `a[href^="https"] { color: #047857; }`.
