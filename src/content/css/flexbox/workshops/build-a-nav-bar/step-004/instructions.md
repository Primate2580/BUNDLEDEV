The links inside `.nav` are still sitting inline, as plain text. Flex containers can nest: the header is one, and `.nav` can be another that arranges its own children.

Remember that flexbox only affects **direct children**. The header's flex layout positions the `nav` as one item, and a second flex container inside it lays out the three links.

## Task

Add a `.nav` rule and give it `display: flex;`.

## Hints

- You need a new rule with the selector `.nav`, below `.site-header a`.
- The rule is `.nav { display: flex; }`.
