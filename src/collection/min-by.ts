/**
 * Finds the item with the smallest numeric key, in one pass, without sorting: the oldest alarm, the nearest
 * contact. Items with a `NaN` key are ignored; on a tie, the first item wins.
 *
 * @template T - Type of the items.
 * @param items - The items to search. Defaults to `[]`.
 * @param keySelector - Returns the numeric key of an item.
 * @returns The item with the smallest key; `undefined` for an empty list or when every key is `NaN`.
 * @example
 * minBy(contacts, (contact) => contact.distance); // the nearest contact
 */
export function minBy<T>(items: Iterable<T> | null | undefined, keySelector: (item: T) => number): T | undefined {
  const resolvedItems = items ?? [];
  let best: T | undefined;
  let bestKey = Infinity;
  let hasBest = false;
  for (const item of resolvedItems) {
    const key = keySelector(item);
    if (key < bestKey || (!hasBest && key === Infinity)) {
      best = item;
      bestKey = key;
      hasBest = true;
    }
  }
  return best;
}
