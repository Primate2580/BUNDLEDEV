There is one catch. In some browsers, a list with `list-style: none` is no longer announced as a list by a screen reader. Adding `role="list"` brings the announcement back, and it does no harm elsewhere:

```html
<ul class="menu" role="list">
```

## Task

Add `role="list"` to the `ul` with the class `menu`.

## Hints

- One more attribute in the same tag.
