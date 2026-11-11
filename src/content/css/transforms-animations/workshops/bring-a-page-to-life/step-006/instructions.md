All three items arrive at once, which is not the effect we wanted. To stagger them, each item needs a different delay. The first can start straight away, and the others wait a little longer each. A tenth of a second between items is plenty, because longer gaps make people wait.

A delay belongs to one element, so each item needs its own rule, written with `:nth-child()`.

## Task

Add these two rules at the end of the `.item` area (anywhere after `.item` is fine):

```css
.item:nth-child(2) {
  animation-delay: 0.1s;
}

.item:nth-child(3) {
  animation-delay: 0.2s;
}
```

## Hints

- Two new rules, written below the `.item` rule.
- The first item needs no rule, because its delay is already `0s`.
