A plain gradient can look flat. Add a second background layer: a grid of translucent white dots, made by a small tiled radial gradient. The first layer in a list is painted on top, so the dots go first, and the colour gradient follows.

A gradient has no natural size, so `background-size` is what turns one dot into a grid. The first size, `20px 20px`, belongs to the dots, and the second, `auto`, lets the colour gradient fill the whole box.

## Task

Replace the `.media` rule's `background-image` with `radial-gradient(circle, rgb(255 255 255 / 0.35) 2px, transparent 3px), linear-gradient(135deg, #4f46e5, #db2777)`, and add `background-size: 20px 20px, auto;`.

## Hints

- Two layers separated by a comma, with the dots first. Then a size for each layer.
- `background-image: radial-gradient(circle, rgb(255 255 255 / 0.35) 2px, transparent 3px), linear-gradient(135deg, #4f46e5, #db2777); background-size: 20px 20px, auto;`
