/**
 * Copies an object without some of its properties, without `delete`, which slows down V8.
 *
 * @template T - The type of the object.
 * @template K - The keys to leave out.
 * @param object - The source object.
 * @param keys - The keys to leave out.
 * @returns A new object with the other properties.
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Every other own enumerable key is copied.
  return result as Omit<T, K>;
}
