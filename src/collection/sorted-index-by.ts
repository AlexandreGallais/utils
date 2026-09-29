/**
 * Finds by binary search where to insert an item in a sorted list to keep it sorted, after the items with
 * the same key: `O(log n)`, to keep a live list sorted without sorting it again at each update.
 *
 * @template T - The item type.
 * @param items - The list, sorted by ascending key.
 * @param key - The key of the item to insert.
 * @param getKey - Reads the sort key of an item.
 * @returns The insertion index, from `0` to `items.length`.
 * @example
 * const index = sortedIndexBy(alarms, alarm.time, (item) => item.time);
 * alarms = alarms.toSpliced(index, 0, alarm);
 */
export function sortedIndexBy<T>(
  items: readonly T[],
  key: number | string,
  getKey: (item: T) => number | string,
): number {
  let low = 0;
  let high = items.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    // `middle` is always in range: the loop only runs over existing items.
    const [item] = items.slice(middle, middle + 1);
    if (item !== undefined && getKey(item) > key) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }
  return low;
}
