Variables are inherited, so a value set on one element reaches everything inside it. The second card is the featured one, and we would like all of its colours to follow an orange brand, without a single new rule for its title or its button.

Let's change only `--brand`, and only on that card:

```css
.card--featured {
  --brand: #ea580c;
}
```

## Task

Add the `.card--featured` rule above, after the `.btn--danger` rule.

## Hints

- One new rule with one declaration.
- The featured card's title and button should turn orange, and no other card changes.
