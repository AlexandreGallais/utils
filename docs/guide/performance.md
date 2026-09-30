# Performance

Values may refresh about 1 000 times per second, so functions used at each refresh must be cheap: no
allocation in hot paths, precomputed tables, formatter objects cached. Every optimisation is measured
against a naive baseline in `benchmarks/` (`pnpm bench`), in Chromium through Playwright: the functions run
where they run in the applications, with precise timers (the page is cross-origin isolated).

| Operation               | Library                 | Baseline                              | Gain |
| ----------------------- | ----------------------- | ------------------------------------- | ---- |
| `roundToFractionDigits` | arithmetic              | `Number(formatDecimal())`             | ~41× |
| `formatNumber`          | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~40× |
| `formatDecimal`         | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~38× |
| `roundToStep`           | no float noise          | `Math.round(v / step) * step` (noisy) | 0.5× |

`roundToStep` is slower on purpose: it pays ~7 ns per call for exact results.
