Now the form. The email field has the `required` attribute, and `:required` matches it, so you can make required fields look different without adding a class. An indigo border tells people the field must be filled in.

The rule comes after `.field` in the file, so it overrides the base border colour. A pseudo-class adds specificity too, so it would win either way.

## Task

Add a new rule `.field:required` with `border-color: #4f46e5;`.

## Hints

- A new rule, with one declaration.
- `.field:required { border-color: #4f46e5; }`
