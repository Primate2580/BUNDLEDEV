Give the buttons a duration and a curve, and a pressed state. A button that responds to a click should feel quick, so use `0.2s` with `ease-out`.

The `:active` rule comes after `:hover`, so it wins while the button is being pressed. It pushes the button back down and shrinks it very slightly, like a real key. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `transition-duration: 0.2s;` and `transition-timing-function: ease-out;` to the `.more` rule. Then add a new rule `.more:active` with `transform: translateY(0) scale(0.97);`.

## Hints

- Two declarations in `.more`, and a new rule after `.more:hover`.
- `.more:active { transform: translateY(0) scale(0.97); }`
