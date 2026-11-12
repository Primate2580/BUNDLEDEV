Finish with a little layout. Give each field's paragraph the class `field`, and add a `style` element to the `head` that puts the labels on a line of their own and makes the controls use the page's font:

```html
<style>
  .field label { display: block; }
  input, select, textarea { font: inherit; }
</style>
```

## Task

Add `class="field"` to the paragraphs of the name, email, walk and notes fields, and add the `style` element to the `head`.

## Hints

- Four paragraphs get the class. The checkbox's paragraph and the fieldset do not.
- The `style` goes between `<head>` and `</head>`.
