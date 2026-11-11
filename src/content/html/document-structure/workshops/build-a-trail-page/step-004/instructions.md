Phones pretend to be wide desktop screens unless a page tells them otherwise, so pages look tiny and zoomed out. The **viewport** meta tag tells the phone to use its real width.

Responsive CSS depends on it. Skipping this tag is the classic reason a mobile page looks wrong even when the CSS is correct.

## Task

Add `<meta name="viewport" content="width=device-width, initial-scale=1" />` to the head, below the charset tag.

## Hints

- Add it on a new line inside the `head`, after the charset `meta`.
- It uses two attributes: `name="viewport"` and `content="width=device-width, initial-scale=1"`.
