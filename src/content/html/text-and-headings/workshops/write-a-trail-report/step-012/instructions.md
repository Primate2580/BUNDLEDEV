The page is in English, and the greeting `Bonne randonnée` is French. A screen reader would read it with an English accent unless you say otherwise, and the `lang` attribute is how you say it. It can go on any element, so use a `span` around just those words:

```html
<span lang="fr">Bonne randonnée</span>
```

## Task

Wrap the greeting line in a `p`. Inside it, wrap `Bonne randonnée` in a `span` with `lang="fr"`.

## Hints

- The `span` goes around the two French words only.
- The rest of the sentence stays in English.
