/**
 * Wraps a number into [min, max[ with an always-positive modulo, like a heading wrapping at 360°.
 *
 * @param value - The number to wrap.
 * @param min - The included bound. Defaults to `0`.
 * @param max - The excluded bound. Defaults to `1`.
 * @returns The equivalent value in [min, max[.
 * @example
 * wrap(370, 0, 360); // 10
 * wrap(-10, 0, 360); // 350
 */
export function wrap(value: number, min = 0, max = 1): number {
  const span = max - min;
  return ((((value - min) % span) + span) % span) + min;
}
