/** Default relative tolerance: far above float noise, far below any meaningful difference. */
const DEFAULT_EPSILON = 1e-9;

/**
 * Compares two numbers with a tolerance: relative for large numbers, absolute near zero.
 *
 * @param a - A number.
 * @param b - Another number.
 * @param epsilon - The tolerance, relative to the largest magnitude (at least 1).
 * @returns `true` when the numbers differ by no more than the tolerance.
 * @example
 * isNearlyEqual(0.1 + 0.2, 0.3); // true
 * isNearlyEqual(1, 1.1, 0.01); // false
 */
export function isNearlyEqual(a: number, b: number, epsilon: number = DEFAULT_EPSILON): boolean {
  return a === b || Math.abs(a - b) <= epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
