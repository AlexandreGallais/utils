/**
 * Copies some properties of an object into a new one: the fields a component needs, the payload of a
 * request. Keys absent from the object are left out.
 *
 * @template T - Type of the object.
 * @template K - Keys to keep.
 * @param object - The source object; left untouched.
 * @param keys - The keys to copy.
 * @returns A new object with only those keys.
 * @example
 * pick({ id: 1, name: 'Pump', rpm: 800 }, ['id', 'name']); // { id: 1, name: 'Pump' }
 */
export function pick<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K> {
  const result: Partial<Pick<T, K>> = {};
  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- every requested own key is copied; absent keys were absent in `T` too.
  return result as Pick<T, K>;
}
