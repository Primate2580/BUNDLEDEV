Suppose you want that link to open in a new tab, so a visitor does not lose the directory. A link that opens a new tab also needs a safe `rel` value, so that the new page cannot reach back to yours:

```html
<a href="..." target="_blank" rel="noopener noreferrer">...</a>
```

## Task

Add `target="_blank"` and `rel="noopener noreferrer"` to the forecast link.

## Hints

- Both attributes go inside the opening `a` tag, after the `href`.
- The `rel` value has two words, separated by a space.
