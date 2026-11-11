A fixed `width` is a problem on small screens: a `320px` card inside a `280px` window would overflow. `max-width` sets a ceiling instead of a fixed size.

With `max-width: 100%`, the card can never be wider than the space it lives in, so it shrinks on narrow screens and keeps `320px` on wide ones.

## Task

Add `max-width: 100%;` to `.card`.

## Hints

- Add it next to `width` in the `.card` rule.
- `max-width: 100%;`.
