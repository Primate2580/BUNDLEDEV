Colours that describe a job are the next thing to name. We need four: the page background, the surface of a card, the main text and the muted text. We call them by what they are for, not by what they look like, and that choice will pay off when we make a dark theme.

Add the four tokens to the `:root` rule you already have:

```css
--bg: #f8fafc;
--surface: #ffffff;
--text: #0f172a;
--muted: #64748b;
```

## Task

Add the four tokens to `:root`. Then use them: in `.app`, set `background-color` to `var(--bg)` and `color` to `var(--text)`. In `.card`, set `background-color` to `var(--surface)`. In `.text`, set `color` to `var(--muted)`.

## Hints

- Four new lines in `:root`, and four values replaced.
- The page looks exactly the same. That is the point: only the way it is written has changed.
