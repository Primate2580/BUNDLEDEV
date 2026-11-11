Finally, we make the card turn. When the pointer is over the card, the inner part rotates half a turn, which brings the back to the front. The transition we wrote earlier takes care of the smooth movement.

Because the card is now clickable-looking, we also tell people it is interactive with a pointer cursor. And remember that keyboard users cannot hover, so in a real project you would add the same rule for `:focus-within`.

## Task

Add this rule below the others for the flip card:

```css
.flip:hover .flip-inner {
  transform: rotateY(180deg);
}
```

Then, in the `.flip` rule, add `cursor: pointer;`.

## Hints

- One new rule, and one declaration in `.flip`.
- Hover over the card in the preview to flip it.
