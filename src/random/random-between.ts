/**
 * Draws a random number in an interval, uniformly: sensor noise, a random start position. Pass a seeded
 * `random` for a reproducible simulation; not suitable for cryptography.
 *
 * @param min - Lower bound (included). Defaults to `0`.
 * @param max - Upper bound (excluded). Defaults to `1`.
 * @param random - Returns a number in [0, 1[: `Math.random`, or a seeded generator for replayable runs. Defaults to
 * `Math.random`.
 * @returns A number in [min, max[.
 * @example
 * const noise = randomBetween(-0.05, 0.05, Math.random); // ±5 % measurement noise
 */
export function randomBetween(min?: number | null, max?: number | null, random?: (() => number) | null): number {
  const resolvedMin = min ?? 0;
  const resolvedMax = max ?? 1;
  const resolvedRandom = random ?? Math.random;
  return resolvedMin + (resolvedMax - resolvedMin) * resolvedRandom();
}
