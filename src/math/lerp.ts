/**
 * Interpolates linearly between two numbers, extrapolating outside [0, 1]. Uses the precise form, exact at
 * both ends: `lerp(a, b, 1) === b`.
 *
 * @param start - Value at `t = 0`. Defaults to `0`.
 * @param end - Value at `t = 1`. Defaults to `1`.
 * @param t - Interpolation factor. Defaults to `0`.
 * @returns The interpolated value.
 * @example
 * lerp(0, 10, 0.25); // 2.5
 * lerp(0, 10, 2); // 20
 */
export function lerp(start?: number | null, end?: number | null, t?: number | null): number {
  const resolvedStart = start ?? 0;
  const resolvedEnd = end ?? 1;
  const resolvedT = t ?? 0;
  return resolvedStart * (1 - resolvedT) + resolvedEnd * resolvedT;
}
