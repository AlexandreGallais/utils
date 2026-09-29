/**
 * Keeps the items of a list whose key is also in another list: the contacts still present, the alarms both
 * active and acknowledged. O(n + m) with a `Set`, keys compared like in a `Set` (`SameValueZero`).
 *
 * @template T - Type of the items.
 * @param items - The list to filter.
 * @param others - The items to match (by key).
 * @param keySelector - Returns the identity of an item, applied to both lists.
 * @returns A new list of the `items` whose key is in `others`, in their order.
 * @example
 * intersectionBy(previousContacts, currentContacts, (contact) => contact.id); // contacts still tracked
 */
export function intersectionBy<T>(items: readonly T[], others: Iterable<T>, keySelector: (item: T) => unknown): T[] {
  const otherKeys = new Set<unknown>();
  for (const item of others) {
    otherKeys.add(keySelector(item));
  }
  return items.filter((item) => otherKeys.has(keySelector(item)));
}
