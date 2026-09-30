/**
 * Finds the item with the largest numeric key, in one pass, without sorting: the hottest sensor, the highest
 * priority alarm. Items with a `NaN` key are ignored; on a tie, the first item wins.
 *
 * @template T - Type of the items.
 * @param items - The items to search. Defaults to `[]`.
 * @param keySelector - Returns the numeric key of an item.
 * @returns The item with the largest key; `undefined` for an empty list or when every key is `NaN`.
 * @example
 * maxBy(sensors, (sensor) => sensor.temperature); // the hottest sensor
 */
export function maxBy<T>(items: Iterable<T> | null | undefined, keySelector: (item: T) => number): T | undefined {
  const resolvedItems = items ?? [];
  let best: T | undefined;
  let bestKey = -Infinity;
  let hasBest = false;
  for (const item of resolvedItems) {
    const key = keySelector(item);
    if (key > bestKey || (!hasBest && key === -Infinity)) {
      best = item;
      bestKey = key;
      hasBest = true;
    }
  }
  return best;
}
