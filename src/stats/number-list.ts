/**
 * A list of numbers the statistics functions accept: an array or a typed array (`Float64Array`…). They loop
 * over it and never spread it: `Math.max(...values)` throws a `RangeError` beyond ~100 000 values.
 */
export type NumberList = ArrayLike<number> & Iterable<number>;
