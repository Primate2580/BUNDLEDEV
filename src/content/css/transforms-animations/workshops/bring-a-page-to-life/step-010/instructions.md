At the moment both faces are stacked, and you can only see the green one, because it is last. Two things fix that. Each face should hide its own back, so that a face that is turned away disappears. And the back face should start turned around, so that when the card flips, it is the right way round.

`backface-visibility: hidden` goes on both faces, which already share a rule. The turned-around start goes on the back:

## Task

In the rule that says `.front, .back`, add:

```css
backface-visibility: hidden;
```

Then, in the `.back` rule, add:

```css
transform: rotateY(180deg);
```

## Hints

- One declaration in the shared rule for both faces, and one in `.back`.
- After this step you should see only the blue front face.
