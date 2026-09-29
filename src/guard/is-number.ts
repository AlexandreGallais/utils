/**
 * Checks whether a value is a number other than `NaN`. Infinities pass: use `isFiniteNumber` to exclude them.
 *
 * @param value - The value to check.
 * @returns `true` for a number that is not `NaN`.
 * @example
 * isNumber(Infinity); // true
 * isNumber(NaN); // false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}
