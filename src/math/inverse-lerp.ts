/**
 * Computes where a value sits between two numbers: the inverse of `lerp`. Not clamped.
 *
 * @param start - The value mapped to 0.
 * @param end - The value mapped to 1.
 * @param value - The value to locate.
 * @returns The interpolation factor; `0` when `start === end`.
 * @example
 * inverseLerp(0, 10, 5); // 0.5
 * inverseLerp(10, 0, 2.5); // 0.75
 */
export function inverseLerp(start: number, end: number, value: number): number {
  const span = end - start;
  return span === 0 ? 0 : (value - start) / span;
}
