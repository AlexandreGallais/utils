/**
 * Interpolates linearly between two numbers, extrapolating outside [0, 1]. Uses the precise form, exact at
 * both ends: `lerp(a, b, 1) === b`.
 *
 * @param start - Value at `t = 0`.
 * @param end - Value at `t = 1`.
 * @param t - Interpolation factor.
 * @returns The interpolated value.
 * @example
 * lerp(0, 10, 0.25); // 2.5
 * lerp(0, 10, 2); // 20
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}
