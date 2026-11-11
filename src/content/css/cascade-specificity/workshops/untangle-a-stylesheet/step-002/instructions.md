The title rule is `#app .card .title`, which weighs `(1, 2, 0)`. The HTML already has a `card-title` class on the heading, so a single class can do the job at `(0, 1, 0)`.

Replace the rule, and give the title the indigo brand colour at the same time. Because the old rule is gone, the new one is the only one left to win.

## Task

Replace `#app .card .title` with `.card-title`, and change its `color` to `#4f46e5`.

## Hints

- Rename the selector and change the colour. Remove the old rule by renaming, not by adding a second one.
- `.card-title { margin: 0.25rem 0 0.5rem; color: #4f46e5; font-size: 1.25rem; }`
