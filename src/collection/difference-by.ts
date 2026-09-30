/**
 * Keeps the items of a list whose key is absent from another list: the new alarms since the last update,
 * the contacts that disappeared. O(n + m) with a `Set`, keys compared like in a `Set` (`SameValueZero`).
 *
 * @template T - Type of the items.
 * @param items - The list to filter. Defaults to `[]`.
 * @param excluded - The items to remove (by key). Defaults to `[]`.
 * @param keySelector - Returns the identity of an item, applied to both lists.
 * @returns A new list of the `items` whose key is not in `excluded`, in their order.
 * @example
 * differenceBy(currentAlarms, acknowledgedAlarms, (alarm) => alarm.id); // alarms not acknowledged yet
 */
export function differenceBy<T>(
  items: readonly T[] | null | undefined,
  excluded: Iterable<T> | null | undefined,
  keySelector: (item: T) => unknown,
): T[] {
  const resolvedItems = items ?? [];
  const resolvedExcluded = excluded ?? [];
  const excludedKeys = new Set<unknown>();
  for (const item of resolvedExcluded) {
    excludedKeys.add(keySelector(item));
  }
  return resolvedItems.filter((item) => !excludedKeys.has(keySelector(item)));
}
