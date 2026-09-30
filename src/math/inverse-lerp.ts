/**
 * Computes where a value sits between two numbers: the inverse of `lerp`. Not clamped.
 *
 * @param start - Value mapped to 0. Defaults to `0`.
 * @param end - Value mapped to 1. Defaults to `1`.
 * @param value - The value to locate.
 * @returns The interpolation factor, or `0` when `start === end` (never `NaN` or `Infinity`).
 * @example
 * inverseLerp(0, 10, 5); // 0.5
 * inverseLerp(10, 0, 2.5); // 0.75
 */
export function inverseLerp(start: number | null | undefined, end: number | null | undefined, value: number): number {
  const resolvedStart = start ?? 0;
  const resolvedEnd = end ?? 1;
  const span = resolvedEnd - resolvedStart;
  return span === 0 ? 0 : (value - resolvedStart) / span;
}
