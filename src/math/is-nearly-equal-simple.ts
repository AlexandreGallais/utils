import { isNearlyEqual } from './is-nearly-equal.ts';

/** Tolerance: far above the float noise of usual values, far below any meaningful difference. */
const EPSILON = 1e-9;

/**
 * Compares two numbers with a tolerance for floating-point noise, like `isNearlyEqual`.
 *
 * @param a - A first number.
 * @param b - A second number.
 * @returns `true` when they differ by less than the tolerance.
 * @simple Tolerance of 1e-9.
 * @example
 * isNearlyEqualSimple(0.1 + 0.2, 0.3); // true
 */
export function isNearlyEqualSimple(a: number, b: number): boolean {
  return isNearlyEqual(a, b, EPSILON);
}
