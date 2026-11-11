Look at the card's real width. You set `320px`, but with the default `content-box`, that width is only the content. The padding and border are added on top, so the card is actually 372px wide.

`box-sizing: border-box` changes the rule: `width` now includes the padding and border, so the card is exactly the `320px` you asked for. Most developers set this on every element.

## Task

Add `box-sizing: border-box;` to `.card`.

## Hints

- It goes on the same `.card` rule.
- `box-sizing: border-box;`.
