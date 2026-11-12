Choosing one from two is a job for radio buttons. They share a `name`, so only one can be chosen, and a `fieldset` with a `legend` gives the group its question:

```html
<fieldset>
  <legend>Group size</legend>
  <input type="radio" id="small" name="size" value="small" checked>
  <label for="small">Small (1 to 4)</label>
</fieldset>
```

## Task

Replace the two lines about group size with a `fieldset` whose legend is `Group size`, and two labelled radio buttons named `size`: `small`, which is `checked`, and `large`.

## Hints

- The two radio buttons share the name `size`, but have different ids.
- The legend is the first child of the fieldset.
