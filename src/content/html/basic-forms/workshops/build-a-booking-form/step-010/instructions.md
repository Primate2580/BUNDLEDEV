A single yes or no is a job for a checkbox. It is sent only when it is ticked, so its `value` matters:

```html
<input type="checkbox" id="reminder" name="reminder" value="yes">
<label for="reminder">Send me a reminder</label>
```

## Task

Add a `p` before the button that holds a checkbox named `reminder`, with the value `yes`, and a label that says `Send me a reminder`.

## Hints

- The checkbox and its label both go inside the paragraph.
- The `for` of the label matches the `id` of the checkbox.
