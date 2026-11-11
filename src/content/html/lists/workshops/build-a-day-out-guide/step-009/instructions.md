Now a little styling. A menu does not need its bullets or its indent, so give the list a class and add a rule to the head of the page. Type the style element as shown:

```html
<style>
  .menu { list-style: none; padding: 0; }
</style>
```

Put it inside the `head`, below the `title`. Then add `class="menu"` to the `ul` of walks.

## Task

Add the `style` element to the `head`, and give the `ul` of walks the class `menu`.

## Hints

- The `style` goes between `<head>` and `</head>`.
- The class goes inside the opening `ul` tag: `<ul class="menu">`.
