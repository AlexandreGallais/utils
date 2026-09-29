/**
 * Draws `true` with a given probability: a random failure in a simulation, a random flag in test data.
 *
 * @param probability - Chance of `true`, from 0 (never) to 1 (always).
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs.
 * @returns The drawn boolean.
 * @example
 * randomBoolean(); // true or false, evenly
 * randomBoolean(0.01); // true once in a hundred draws
 */
export function randomBoolean(probability = 0.5, random: () => number = Math.random): boolean {
  return random() < probability;
}
