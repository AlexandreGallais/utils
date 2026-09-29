/**
 * Copies an object without some of its properties: remove internal fields before sending, drop a key from a
 * state. Builds a new object instead of using `delete`, which slows down later accesses in V8.
 *
 * @template T - Type of the object.
 * @template K - Keys to leave out.
 * @param object - The source object; left untouched.
 * @param keys - The keys to leave out.
 * @returns A new object with the other own enumerable properties.
 * @example
 * omit({ id: 1, name: 'Pump', internalRef: 'x' }, ['internalRef']); // { id: 1, name: 'Pump' }
 */
export function omit<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K> {
  const excluded = new Set<PropertyKey>(keys);
  const result: Record<PropertyKey, unknown> = {};
  for (const key of Reflect.ownKeys(object)) {
    if (!excluded.has(key) && Object.prototype.propertyIsEnumerable.call(object, key)) {
      result[key] = Reflect.get(object, key);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- every own enumerable key but the excluded ones is copied.
  return result as Omit<T, K>;
}
