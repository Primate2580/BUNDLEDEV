The `/ month` part should be quieter than the price. A muted blue-grey does that. Here we use `hsl()`: hue 215 (a blue), saturation 16% (very little colour, close to grey) and lightness 47%.

Because `hsl()` separates the three ideas, you can read why it looks quiet straight from the numbers: low saturation means close to grey. It still has about 4.7:1 contrast on white.

## Task

Add `color: hsl(215 16% 47%);` to the `.per` rule.

## Hints

- `hsl()` takes a hue number, then two percentages, separated by spaces.
- `color: hsl(215 16% 47%);`
