Last, think about **interaction**. The toast is the topmost layer on the page, so it receives every click where it sits, even if the message is transparent or finished. A message that does not need a click should let it through: `pointer-events: none`.

The layers you have built are, from the bottom: content, back-to-top `50`, header `100`, overlay `200`, modal `300`, toast `400`. In a real project, replace the numbers with named custom properties, and use `<dialog>` for the modal.

## Task

Add `pointer-events: none;` to the `.toast` rule.

## Hints

- One declaration in `.toast`.
- `pointer-events: none;`
