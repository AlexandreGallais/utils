import { lerp } from './lerp';

/** A point of a lookup table: an input and its output. */
type TablePoint = readonly [x: number, y: number];

/**
 * Reads a lookup table with linear interpolation between its points: a sensor calibration curve, an engine
 * performance table, a fuel tank gauging table. Out of the table, the first or last output is held.
 * Binary search: O(log n) per read, fine for large tables at a high rate.
 *
 * @param x - The input to look up.
 * @param table - Points `[x, y]` sorted by increasing `x`.
 * @returns The interpolated output; `NaN` for an empty table.
 * @example
 * const TANK = [[0, 0], [10, 150], [20, 380], [30, 600]] as const; // sounding (cm) → volume (L)
 * interpolateTable(15, TANK); // 265
 * interpolateTable(40, TANK); // 600 (held at the last point)
 */
export function interpolateTable(x: number, table: readonly TablePoint[]): number {
  const [first] = table;
  const [last] = table.slice(-1);
  if (!first || !last) {
    return NaN;
  }
  if (x <= first[0]) {
    return first[1];
  }
  if (x >= last[0]) {
    return last[1];
  }
  // Invariant: table[low][0] <= x < table[high][0].
  let low = 0;
  let high = table.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >>> 1;
    const [[middleX] = first] = table.slice(middle, middle + 1);
    if (middleX <= x) {
      low = middle;
    } else {
      high = middle;
    }
  }
  // Here `x0 <= x < x1`, so the span is never zero.
  const [[x0, y0] = first, [x1, y1] = last] = table.slice(low, high + 1);
  return lerp(y0, y1, (x - x0) / (x1 - x0));
}
