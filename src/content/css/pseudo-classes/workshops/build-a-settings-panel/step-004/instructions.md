The last checkbox is disabled, so its label should look unavailable. `:disabled` matches controls that cannot be used, and with the same sibling pattern, you can fade the label that goes with it.

Use a grey with enough contrast to still be readable. Disabled text is exempt from contrast rules, but there is no reason to make it vanish.

## Task

Add a new rule `input:disabled + label` with `color: #94a3b8;`.

## Hints

- The same shape as the last step, with a different pseudo-class.
- `input:disabled + label { color: #94a3b8; }`
