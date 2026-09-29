/**
 * Draws a random integer between two bounds, both included, each with the same probability. Pass a seeded
 * `random` for a reproducible simulation; not suitable for cryptography.
 *
 * @param min - Smallest possible value (rounded up to an integer).
 * @param max - Largest possible value (rounded down to an integer).
 * @param random - Returns a number in [0, 1[, `Math.random` by default.
 * @returns An integer in [min, max].
 * @throws {RangeError} When the interval holds no integer.
 * @example
 * const dice = randomInt(1, 6);
 */
export function randomInt(min: number, max: number, random: () => number = Math.random): number {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  if (Number.isNaN(high - low) || high < low) {
    throw new RangeError(`[${min}, ${max}] holds no integer`);
  }
  return low + Math.floor(random() * (high - low + 1));
}
