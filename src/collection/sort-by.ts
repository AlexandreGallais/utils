import type { SortKey } from './sort-key.ts';

/** A key comparable with `<`, `undefined` for keys that sort last. */
type ComparableKey = Exclude<SortKey, Date>;

/**
 * Sorts a list by a key, in a new array (the input is left untouched). The sort is stable: items with equal
 * keys keep their order, so sorting by a secondary key then by the primary key sorts by both. Keys are
 * compared with `<` (numbers, strings in code-unit order, dates); `NaN` and `undefined` keys go last.
 *
 * @template T - Type of the items.
 * @param items - The list to sort.
 * @param keySelector - Returns the sort key of an item.
 * @param order - `'asc'` for increasing keys, `'desc'` for decreasing keys.
 * @returns A new sorted array.
 * @example
 * sortBy(alarms, (alarm) => alarm.priority, 'desc');
 * sortBy(['b', 'C', 'a'], (text) => text.toLowerCase()); // ['a', 'b', 'C']
 */
export function sortBy<T>(items: readonly T[], keySelector: (item: T) => SortKey, order: 'asc' | 'desc' = 'asc'): T[] {
  const direction = order === 'asc' ? 1 : -1;
  // Keys are computed once per item, not once per comparison.
  const keyed = items.map((item, index) => ({ item, index, key: sortKey(keySelector(item)) }));
  keyed.sort((a, b) => {
    if (a.key === undefined || b.key === undefined) {
      const missingOrder = Number(a.key === undefined) - Number(b.key === undefined);
      return missingOrder === 0 ? a.index - b.index : missingOrder;
    }
    if (a.key < b.key) {
      return -direction;
    }
    return a.key > b.key ? direction : a.index - b.index;
  });
  return keyed.map(({ item }) => item);
}

/**
 * Normalizes a sort key: dates become numbers, `NaN` becomes `undefined` so both sort last.
 *
 * @param key - The key returned by the selector.
 * @returns A key comparable with `<`, or `undefined`.
 */
function sortKey(key: SortKey): ComparableKey {
  const value = key instanceof Date ? key.getTime() : key;
  return typeof value === 'number' && Number.isNaN(value) ? undefined : value;
}
