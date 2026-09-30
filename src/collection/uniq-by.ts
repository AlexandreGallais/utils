/**
 * Removes the items whose key was already seen, keeping the first occurrence of each key in order. For a
 * list of primitives, `[...new Set(items)]` is enough.
 *
 * @template T - Type of the items.
 * @param items - The list to deduplicate. Defaults to `[]`.
 * @param keySelector - Returns the identity of an item, compared with `SameValueZero` (like a `Set`).
 * @returns A new list with one item per key.
 * @example
 * uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (item) => item.id); // [{ id: 1 }, { id: 2 }]
 */
export function uniqBy<T>(items: readonly T[] | null | undefined, keySelector: (item: T) => unknown): T[] {
  const resolvedItems = items ?? [];
  const seen = new Set<unknown>();
  const result: T[] = [];
  for (const item of resolvedItems) {
    const key = keySelector(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}
