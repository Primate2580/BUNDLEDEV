The last tangle is the page container: `#app` is an ID, and its weight `(1, 0, 0)` beats any class you might add later to adjust it. The HTML also has `class="page"` on the same element, so you can style it by class and keep the ID free for scripts and anchors.

Widen the page a little as you move it, and check the whole stylesheet: not one ID and not one `!important` should be left.

## Task

Replace `#app` with `.page`, and change its `max-width` to `30rem`.

## Hints

- One class, one new value.
- `.page { max-width: 30rem; margin: 2rem auto; padding: 0 1rem; }`
