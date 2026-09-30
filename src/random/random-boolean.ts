/** Chance of `true` when none is given: even. */
const DEFAULT_PROBABILITY = 0.5;

/**
 * Draws `true` with a given probability: a random failure in a simulation, a random flag in test data.
 *
 * @param probability - Chance of `true`, from 0 (never) to 1 (always). Defaults to `0.5`.
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs. Defaults to
 * `Math.random`.
 * @returns The drawn boolean.
 * @example
 * randomBoolean(0.5, Math.random); // true or false, evenly
 * randomBoolean(0.01, Math.random); // true once in a hundred draws
 */
export function randomBoolean(probability?: number | null, random?: (() => number) | null): boolean {
  const resolvedProbability = probability ?? DEFAULT_PROBABILITY;
  const resolvedRandom = random ?? Math.random;
  return resolvedRandom() < resolvedProbability;
}
