The line `Total distance: 16 km` is a summary of the rows above, so it belongs in a `tfoot`. The label spans three columns, so it uses `colspan="3"`, and the value sits in the fourth:

```html
<tfoot>
  <tr>
    <th scope="row" colspan="3">Total distance</th>
    <td>16 km</td>
  </tr>
</tfoot>
```

## Task

Delete the plain line `Total distance: 16 km`, and add the `tfoot` above after the `tbody`.

## Hints

- `tfoot` goes after `tbody`, inside the table.
- The row has one `th` that spans three columns, and one `td`.
