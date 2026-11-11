Finally, give the table some style. Give the `table` the class `timetable`, and add three more rules to the `style` element: collapsed borders, padding and borders on every cell, and a background for the `difficulty` column:

```css
.timetable { border-collapse: collapse; }
.timetable th, .timetable td { padding: 0.5rem; border: 1px solid #cbd5e1; }
.difficulty { background: #fef3c7; }
```

## Task

Add `class="timetable"` to the `table`, and add the three rules to the `style` element, below the `.scroll` rule.

## Hints

- The class goes inside the opening `table` tag.
- The rules go inside the same `style` element. Type them exactly as shown, so the checks can find them.
