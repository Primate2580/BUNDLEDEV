Now the buttons. Each card has a **View route** link styled as a button. This one will change colour **and** lift a little, so two properties belong in the list: `background-color` and `transform`.

`.more` is `display: inline-block`, which matters: transforms do not apply to plain inline elements. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `transition-property: background-color, transform;` to the `.more` rule. Then add a new rule `.more:hover` with `background-color: #3730a3;` and `transform: translateY(-2px);`.

## Hints

- One declaration in `.more`, and a new rule.
- `.more:hover { background-color: #3730a3; transform: translateY(-2px); }`
