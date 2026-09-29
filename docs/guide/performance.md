# Performance

Values may refresh about 1 000 times per second, so functions used at each refresh must be cheap: no
allocation in hot paths, precomputed tables, formatter objects cached. Every optimisation is measured
against a naive baseline in `benchmarks/` (`pnpm bench`), on the built package.

| Operation                            | Library                 | Baseline                            | Gain  |
| ------------------------------------ | ----------------------- | ----------------------------------- | ----- |
| `sliceVisiblePoints` (36 000 points) | binary search           | `filter`                            | ~380× |
| `formatDecimal`                      | cached `Intl` formatter | `new Intl.NumberFormat()` per call  | ~47×  |
| `roundToFractionDigits`              | arithmetic              | `Number(formatDecimal())`           | ~37×  |
| `parseColorCached` (repeated input)  | cache                   | `parseColor`                        | ~28×  |
| `getReadableTextColorCached(string)` | cached parse            | `getReadableTextColor(string)`      | ~15×  |
| `MovingAverage` (window 100)         | running sum             | `slice` + `mean` per value          | ~11×  |
| `getRelativeLuminance`               | lookup table            | `Math.pow` per channel              | ~5×   |
| `toHex`                              | byte table              | `toString(16).padStart` per channel | ~3×   |
| `downsampleMinMax` + `projectPoints` | 800 buckets             | projecting 36 000 points            | ~2×   |
| `createFpsMeter` (window 60)         | ring buffer             | array `push` + `shift`              | ~1.2× |
| `roundToStep`                        | no float noise          | `Math.round(v / step) * step`       | 0.6×  |
| `maxOf` (10 000 values)              | loop                    | `Math.max(...values)`               | 0.8×  |

The last two are slower on purpose: `roundToStep` pays ~15 ns for exact results, `maxOf` never throws on
large arrays (`Math.max(...values)` throws beyond ~100 000 values).
