/**
 * Indexes the items of a list by key, in a single pass; with duplicate keys, the last item wins.
 *
 * @template T - Type of the items.
 * @template K - Type of the keys.
 * @param items - The list to index.
 * @param keySelector - Returns the key of an item.
 * @returns An object mapping each key to its item.
 * @example
 * keyBy([{ id: 'u1' }, { id: 'u2' }], (user) => user.id); // { u1: { id: 'u1' }, u2: { id: 'u2' } }
 */
export function keyBy<T, K extends PropertyKey>(
  items: readonly T[],
  keySelector: (item: T) => K,
): Partial<Record<K, T>> {
  const result: Partial<Record<K, T>> = {};
  for (const item of items) {
    result[keySelector(item)] = item;
  }
  return result;
}
