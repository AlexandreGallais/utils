/**
 * Draws a random number in an interval, uniformly: sensor noise, a random start position. Pass a seeded
 * `random` for a reproducible simulation; not suitable for cryptography.
 *
 * @param min - Lower bound (included).
 * @param max - Upper bound (excluded).
 * @param random - Returns a number in [0, 1[: `Math.random`, or a seeded generator for replayable runs.
 * @returns A number in [min, max[.
 * @example
 * const noise = randomBetween(-0.05, 0.05, Math.random); // ±5 % measurement noise
 */
export function randomBetween(min: number, max: number, random: () => number): number {
  return min + (max - min) * random();
}
