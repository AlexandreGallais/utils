/** Tolerance when none is given: float noise, not a measurement error. */
const DEFAULT_EPSILON = 1e-9;

/**
 * Compares two numbers with a tolerance: relative for large numbers, absolute near zero.
 *
 * @param a - A number.
 * @param b - Another number.
 * @param epsilon - The tolerance, relative to the largest magnitude (at least 1). Defaults to `1e-9`.
 * @returns `true` when the numbers differ by no more than the tolerance.
 * @example
 * isNearlyEqual(0.1 + 0.2, 0.3, 1e-9); // true
 * isNearlyEqual(1, 1.1, 0.01); // false
 */
export function isNearlyEqual(a: number, b: number, epsilon?: number | null): boolean {
  const resolvedEpsilon = epsilon ?? DEFAULT_EPSILON;
  return a === b || Math.abs(a - b) <= resolvedEpsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
