A wide table can overflow a small screen. Wrap it in a `div` that can scroll, and make the div reachable by keyboard. Add a rule for the wrapper in a `style` element in the head:

```html
<div class="scroll" role="region" aria-label="Walk timetable" tabindex="0">
  <table>...</table>
</div>
```

```html
<style>
  .scroll { overflow-x: auto; }
</style>
```

## Task

Wrap the table in the `div` above, and add the `style` element, with its one rule, to the `head`.

## Hints

- The `style` goes between `<head>` and `</head>`.
- The whole table, including its caption, is inside the `div`.
