# Performance

Values may refresh about 1 000 times per second, so functions used at each refresh must be cheap: no
allocation in hot paths, precomputed tables, formatter objects cached. Every optimisation is measured
against a naive baseline in `benchmarks/` (`pnpm bench`), in Chromium through Playwright: the functions run
where they run in the applications, with precise timers (the page is cross-origin isolated).

| Operation                            | Library                 | Baseline                              | Gain  |
| ------------------------------------ | ----------------------- | ------------------------------------- | ----- |
| `sliceVisiblePoints` (36 000 points) | binary search           | `filter`                              | ~316× |
| `parseColorCached` (repeated input)  | cache                   | `parseColor`                          | ~51×  |
| `roundToFractionDigits`              | arithmetic              | `Number(formatDecimal())`             | ~41×  |
| `formatNumber`                       | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~40×  |
| `formatDecimal`                      | cached `Intl` formatter | `new Intl.NumberFormat()` per call    | ~38×  |
| `getReadableTextColorCached(string)` | cached parse            | `getReadableTextColor(string)`        | ~21×  |
| `MovingAverage` (window 100)         | running sum             | `slice` + `mean` per value            | ~9×   |
| `getRelativeLuminance`               | lookup table            | `Math.pow` per channel                | ~6×   |
| `toHex`                              | byte table              | `toString(16).padStart` per channel   | ~3×   |
| `downsampleMinMax` + `projectPoints` | 800 buckets             | projecting 36 000 points              | ~2×   |
| `createFpsMeter` (window 60)         | ring buffer             | array `push` + `shift`                | ~1.2× |
| `maxOf` (10 000 values)              | loop                    | `Math.max(...values)`                 | 1×    |
| `roundToStep`                        | no float noise          | `Math.round(v / step) * step` (noisy) | 0.5×  |

`maxOf` is as fast as `Math.max(...values)` and never throws on large arrays (`Math.max(...values)` throws a
`RangeError` beyond ~100 000 values). `roundToStep` is slower on purpose: it pays ~7 ns per call for exact
results.
