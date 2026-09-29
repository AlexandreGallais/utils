/**
 * Draws `true` with a given probability: a random failure in a simulation, a random flag in test data.
 *
 * @param probability - Chance of `true`, from 0 (never) to 1 (always).
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs.
 * @returns The drawn boolean.
 * @example
 * randomBoolean(0.5, Math.random); // true or false, evenly
 * randomBoolean(0.01, Math.random); // true once in a hundred draws
 */
export function randomBoolean(probability: number, random: () => number): boolean {
  return random() < probability;
}
