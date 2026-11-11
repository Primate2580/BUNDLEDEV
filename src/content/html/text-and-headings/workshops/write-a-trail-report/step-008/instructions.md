The next line is a quotation with its source. A quotation of this kind is a `blockquote`, and the quoted words go inside a paragraph. The credit does not belong inside the quote, so the pair is wrapped in a `figure`, and the credit goes in a `figcaption`. The book's title is marked with `cite`.

```html
<figure>
  <blockquote>
    <p>The best way to know a ridge is to walk it slowly.</p>
  </blockquote>
  <figcaption>A. Walker, in <cite>Notes from the Ridge</cite></figcaption>
</figure>
```

Notice that the typed quotation marks are gone. The `blockquote` already says that the words are a quotation.

## Task

Replace the line that begins with a quotation mark, `"The best way to know a ridge...`, with the `figure` shown above.

## Hints

- Delete the quotation marks around the words, and the line of credit.
- The credit text is `A. Walker, in`, followed by the title inside `cite`.
