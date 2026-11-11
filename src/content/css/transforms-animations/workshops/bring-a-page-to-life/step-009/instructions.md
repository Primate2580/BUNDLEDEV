Now something different: a card that flips over. A flip needs three things. The card needs a parent that sets the viewer's distance, so the turn has depth. That is `perspective`. The part that turns needs to keep its children in 3D space, which is `transform-style: preserve-3d`. And we want it to turn smoothly, with a transition rather than an animation, because it responds to a hover.

We start with the parent and the part that turns.

## Task

In the `.flip` rule, add:

```css
perspective: 800px;
```

Then, in the `.flip-inner` rule, add:

```css
transform-style: preserve-3d;
transition-property: transform;
transition-duration: 0.6s;
```

## Hints

- One declaration in `.flip` and three in `.flip-inner`.
- The perspective goes on the parent, not on the element that turns.
