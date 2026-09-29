# Simple variants

Every function takes all its parameters explicitly: nothing is hidden behind a default value. When some
parameters are choices that are almost always the same, the function also exists as a `…Simple` variant,
in its own file: **fewer parameters, the choices fixed**. The full function is not changed.

```ts
formatNumber(1234.5, '1.2-2', 'en-US'); // '1,234.50'
formatNumberSimple(1234.5, '1.2-2'); // '1234.50'
```

Each `…Simple` page shows its fixed choices in a green box. The house standard:

| Choice     | Fixed to                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| Numbers    | Digits in a row, `.` before the decimals: `1234.50`, never `1,234.50`    |
| Precision  | Whole units: whole seconds, whole degrees                                |
| Dates      | Local time                                                               |
| Randomness | `Math.random` (use the full version with `createSeededRandom` to replay) |
| Time       | `performance.now()`                                                      |
| Axes       | About 5 ticks                                                            |
| Bounds     | Included                                                                 |
| Statistics | Whole population (divides by n)                                          |
| Gauges     | Values clamped to the scale                                              |
| Async      | No abort signal                                                          |
| SVG        | Around the center of the element                                         |

Search for _Simple_ to list them all.
