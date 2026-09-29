import { sortBy } from './sort-by.ts';
import type { SortKey } from './sort-key.ts';

/**
 * Sorts items by a key like `sortBy`, in ascending order.
 *
 * @template T - The item type.
 * @param items - The items to sort.
 * @param keySelector - Reads the sort key of an item.
 * @returns A new sorted array.
 * @simple Ascending order.
 * @example
 * sortBySimple(alarms, (alarm) => alarm.time); // oldest first
 */
export function sortBySimple<T>(items: readonly T[], keySelector: (item: T) => SortKey): T[] {
  return sortBy(items, keySelector, 'asc');
}
