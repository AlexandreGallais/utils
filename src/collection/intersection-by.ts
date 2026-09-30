/**
 * Keeps the items of a list whose key is also in another list: the contacts still present, the alarms both
 * active and acknowledged. O(n + m) with a `Set`, keys compared like in a `Set` (`SameValueZero`).
 *
 * @template T - Type of the items.
 * @param items - The list to filter. Defaults to `[]`.
 * @param others - The items to match (by key). Defaults to `[]`.
 * @param keySelector - Returns the identity of an item, applied to both lists.
 * @returns A new list of the `items` whose key is in `others`, in their order.
 * @example
 * intersectionBy(previousContacts, currentContacts, (contact) => contact.id); // contacts still tracked
 */
export function intersectionBy<T>(
  items: readonly T[] | null | undefined,
  others: Iterable<T> | null | undefined,
  keySelector: (item: T) => unknown,
): T[] {
  const resolvedItems = items ?? [];
  const resolvedOthers = others ?? [];
  const otherKeys = new Set<unknown>();
  for (const item of resolvedOthers) {
    otherKeys.add(keySelector(item));
  }
  return resolvedItems.filter((item) => otherKeys.has(keySelector(item)));
}
