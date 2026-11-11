The settings are a plain stack. Give each row some padding, and a thin divider **between** rows. The divider must not appear under the last row, and `:not(:last-child)` does exactly that, without any extra class.

Adding or removing a setting later needs no CSS changes, because the selector counts positions for you.

## Task

Add `padding: 0.75rem 0.5rem;` to the `.setting` rule. Then add a new rule `.setting:not(:last-child)` with `border-bottom-width: 1px;`, `border-bottom-style: solid;` and `border-bottom-color: #e2e8f0;`.

## Hints

- One declaration in `.setting`, and a new rule.
- `.setting:not(:last-child) { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #e2e8f0; }`
