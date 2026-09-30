/**
 * Shuffles a list with the Fisher-Yates algorithm (every order equally likely), in a new array. Pass a
 * seeded `random` for a reproducible simulation; not suitable for cryptography.
 *
 * @template T - Type of the items.
 * @param items - The list to shuffle; left untouched. Defaults to `[]`.
 * @param random - Returns a number in [0, 1[: `Math.random`, or a seeded generator for replayable runs. Defaults to
 * `Math.random`.
 * @returns A new array with the same items in random order.
 * @example
 * shuffle(['a', 'b', 'c'], Math.random); // ['c', 'a', 'b'], for instance
 */
export function shuffle<T>(items?: readonly T[] | null, random?: (() => number) | null): T[] {
  const resolvedItems = items ?? [];
  const resolvedRandom = random ?? Math.random;
  const result = [...resolvedItems];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(resolvedRandom() * (index + 1));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `index` is within the array.
    const current = result[index] as T;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `other` is within the array.
    result[index] = result[other] as T;
    result[other] = current;
  }
  return result;
}
