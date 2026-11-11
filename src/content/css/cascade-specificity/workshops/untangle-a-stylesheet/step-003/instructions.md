`#app .card p` is another heavy rule, and it matches **every** paragraph in the card, including the footer. A class on only the text is more precise, and lighter. The HTML already has `card-text`.

The footer paragraph will lose the style it was borrowing. That is a good sign: rules should apply to what you meant, not to whatever happens to match.

## Task

Replace `#app .card p` with `.card-text`, and change its `color` to `#334155`.

## Hints

- Change the selector, then the colour.
- `.card-text { margin: 0 0 1rem; color: #334155; }`
