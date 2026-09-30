/**
 * Interpolates linearly between two numbers, exact at both ends and extrapolated outside [0, 1].
 *
 * @param start - The value at `t = 0`.
 * @param end - The value at `t = 1`.
 * @param t - The interpolation factor.
 * @returns The interpolated value.
 * @example
 * lerp(0, 10, 0.25); // 2.5
 * lerp(0, 10, 2); // 20
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}
