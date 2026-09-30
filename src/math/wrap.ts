/**
 * Wraps a number into [min, max[ with an always-positive modulo, like a heading wrapping at 360°. The bounds
 * may be given in any order. Never returns `-0`.
 *
 * @param value - The number to wrap.
 * @param min - One bound (included). Defaults to `0`.
 * @param max - The other bound (excluded). Defaults to `1`.
 * @returns The equivalent value in [min, max[; the lower bound for an empty range.
 * @example
 * wrap(370, 0, 360); // 10
 * wrap(-10, 0, 360); // 350
 */
export function wrap(value: number, min?: number | null, max?: number | null): number {
  const resolvedMin = min ?? 0;
  const resolvedMax = max ?? 1;
  const lower = Math.min(resolvedMin, resolvedMax);
  const span = Math.abs(resolvedMax - resolvedMin);
  if (span === 0) {
    return lower;
  }
  const wrapped = (((value - lower) % span) + span) % span;
  // `+ 0` turns a `-0` into `0`.
  return wrapped + lower + 0;
}
