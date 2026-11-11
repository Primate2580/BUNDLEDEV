Each link is an `a`, which is **inline** by default. Inline elements flow like words in a sentence. Their vertical padding is painted, but it doesn't push other lines away, so a padded inline link can overlap whatever is above and below it.

Making the link `inline-block` gives it a real box. Now the padding takes up room, and the link can have width and height too.

## Task

Add a `.link` rule with `display: inline-block;` and `padding: 8px 16px;`.

## Hints

- The existing `.link` rule needs two more lines (or a new rule works too, if it comes after).
- `display: inline-block;` and `padding: 8px 16px;`.
