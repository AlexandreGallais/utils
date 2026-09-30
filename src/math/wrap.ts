/**
 * Wraps a number into [min, max[ with an always-positive modulo, like a heading wrapping at 360°.
 *
 * @param value - The number to wrap.
 * @param min - The included bound.
 * @param max - The excluded bound.
 * @returns The equivalent value in [min, max[.
 * @example
 * wrap(370, 0, 360); // 10
 * wrap(-10, 0, 360); // 350
 */
export function wrap(value: number, min: number, max: number): number {
  const span = max - min;
  return ((((value - min) % span) + span) % span) + min;
}
