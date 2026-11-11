The `Snacks` item has two sub-items, `Fruit` and `Nuts`. A nested list goes inside the `li` that owns it, before that `li` closes. It does not go beside the `li`, inside the `ul`:

```html
<li>Snacks
  <ul>
    <li>Fruit</li>
    <li>Nuts</li>
  </ul>
</li>
```

## Task

Inside the `Snacks` item, add a nested unordered list with two items: `Fruit` and `Nuts`.

## Hints

- The inner `ul` goes between the word `Snacks` and the closing `</li>`.
- Do not close the `Snacks` item before the inner list.
