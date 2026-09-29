/**
 * Picks a random item of a list, each with the same probability. Pass a seeded `random` for a reproducible
 * simulation; not suitable for cryptography.
 *
 * @template T - Type of the items.
 * @param items - The list to pick from.
 * @param random - Returns a number in [0, 1[: `Math.random`, or a seeded generator for replayable runs.
 * @returns A random item; `undefined` for an empty list.
 * @example
 * sample(['fog', 'rain', 'clear'], Math.random); // 'rain', for instance
 */
export function sample<T>(items: readonly T[], random: () => number): T | undefined {
  const index = Math.floor(random() * items.length);
  const [item] = items.slice(index, index + 1);
  return item;
}
