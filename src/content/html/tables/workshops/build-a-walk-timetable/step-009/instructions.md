To style a whole column, describe the columns first. A `colgroup` goes after the caption, with one `col` for each column. Give the last one a class, so CSS can aim at it:

```html
<colgroup>
  <col>
  <col>
  <col>
  <col class="difficulty">
</colgroup>
```

## Task

Add the `colgroup` after the `caption`, with four `col` elements, the last with the class `difficulty`.

## Hints

- The `col` elements are empty.
- Put the class on the fourth one only.
