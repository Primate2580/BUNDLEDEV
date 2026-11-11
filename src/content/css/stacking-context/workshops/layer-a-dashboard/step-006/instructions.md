Protect the header from the page. Every card, label and widget in the content lives in the page's context, and any of them might one day get a big z-index. `isolation: isolate` on the content wrapper gives it a bubble of its own, so everything inside can use any number without ever overtaking the header.

`isolation: isolate` does nothing visible. It only draws a boundary.

## Task

Add `isolation: isolate;` to the `.page` rule.

## Hints

- One declaration in `.page`.
- `isolation: isolate;`
