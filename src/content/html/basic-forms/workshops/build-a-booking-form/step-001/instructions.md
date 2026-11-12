This page has the words of a booking form, but none of its controls, so the browser shows only plain text. Over the next twelve steps you will turn each line into a proper control, one kind at a time.

Start with the wrapper. Everything the visitor fills in goes inside a `form`, which says where the data is sent and how:

```html
<form action="/book" method="post">
  ...
</form>
```

## Task

Wrap all the plain lines, from `Name` to `Send`, in a `form` with `action="/book"` and `method="post"`. Leave the heading and the introduction outside it.

## Hints

- The `form` goes after the introduction paragraph.
- The closing tag comes after the line `Send`.
