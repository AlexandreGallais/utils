/**
 * Reads a lookup table with linear interpolation between its points, such as a calibration curve or a tank
 * gauging table. Outside the table, the first or last output is held. Binary search: O(log n).
 *
 * @param x - The input to look up.
 * @param table - The points `[x, y]`, sorted by increasing `x`.
 * @returns The interpolated output; `NaN` for an empty table.
 * @example
 * const tank = [[0, 0], [10, 150], [20, 380]] as const;
 * interpolateTable(15, tank); // 265
 * interpolateTable(40, tank); // 380
 */
export function interpolateTable(x: number, table: readonly (readonly [x: number, y: number])[]): number {
  const [first] = table;
  const last = table.at(-1);
  if (first === undefined || last === undefined) {
    return NaN;
  }
  if (x <= first[0]) {
    return first[1];
  }
  if (x >= last[0]) {
    return last[1];
  }
  let low = first;
  let high = last;
  let lowIndex = 0;
  let highIndex = table.length - 1;
  while (highIndex - lowIndex > 1) {
    const middleIndex = (lowIndex + highIndex) >>> 1;
    /* v8 ignore next -- `?? high` only satisfies noUncheckedIndexedAccess. */
    const middle = table[middleIndex] ?? high;
    if (middle[0] <= x) {
      low = middle;
      lowIndex = middleIndex;
    } else {
      high = middle;
      highIndex = middleIndex;
    }
  }
  return low[1] + ((high[1] - low[1]) * (x - low[0])) / (high[0] - low[0]);
}
