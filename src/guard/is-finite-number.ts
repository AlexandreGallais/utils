/**
 * Checks whether a value is a finite number: neither `NaN` nor an infinity.
 *
 * @param value - The value to check.
 * @returns `true` for a finite number (never for a numeric string).
 * @example
 * isFiniteNumber(1.5); // true
 * isFiniteNumber(Infinity); // false
 */
export function isFiniteNumber(value: unknown): value is number {
  return Number.isFinite(value);
}
