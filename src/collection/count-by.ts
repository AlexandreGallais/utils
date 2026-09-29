/**
 * Counts the items of a list per key, in a single pass. To group the items themselves, use the native
 * `Object.groupBy` or `Map.groupBy`.
 *
 * @template T - Type of the items.
 * @template K - Type of the keys.
 * @param items - The list to count.
 * @param keySelector - Returns the key of an item.
 * @returns The number of items per key; keys without items are absent.
 * @example
 * countBy(['a', 'bb', 'cc'], (word) => word.length); // { 1: 1, 2: 2 }
 */
export function countBy<T, K extends PropertyKey>(
  items: readonly T[],
  keySelector: (item: T) => K,
): Partial<Record<K, number>> {
  const counts: Partial<Record<K, number>> = {};
  for (const item of items) {
    const key = keySelector(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}
