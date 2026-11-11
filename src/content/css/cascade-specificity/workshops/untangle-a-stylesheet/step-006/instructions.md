The danger button has the same kind of problem as the primary one: `#app .actions .btn.btn-danger` is `(1, 3, 0)`. Replace it with `.btn-danger`, below `.btn`.

Notice the pattern. You never needed an ID, because the class already says everything the selector was spelling out.

## Task

Replace `#app .actions .btn.btn-danger` with `.btn-danger`, and change its `background-color` to `#b91c1c`.

## Hints

- Same move as the primary button.
- `.btn-danger { background-color: #b91c1c; color: #ffffff; }`
