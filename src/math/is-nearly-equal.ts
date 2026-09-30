/**
 * Checks whether two numbers are equal within a tolerance, relative for large numbers and absolute near zero.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @param epsilon - The tolerance, relative to the largest magnitude (at least 1). Defaults to `1e-9`.
 * @returns `true` when the numbers differ by no more than the tolerance.
 * @example
 * isNearlyEqual(0.1 + 0.2, 0.3); // true
 * isNearlyEqual(1, 1.1, 0.01); // false
 */
export function isNearlyEqual(a: number, b: number, epsilon = 1e-9): boolean {
  return a === b || Math.abs(a - b) <= epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
