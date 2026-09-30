/**
 * Transforms every value of an object, keeping its keys.
 *
 * @template T - The type of the object.
 * @template U - The type of the new values.
 * @param object - The source object.
 * @param mapper - Returns the new value of a property, from its value and its key.
 * @returns A new object with the same keys.
 * @example
 * mapValues({ rpm: 800.4, temperature: 72.25 }, (value) => formatDecimal(value, 1));
 * // { rpm: '800.4', temperature: '72.3' }
 */
export function mapValues<T extends object, U>(
  object: T,
  mapper: (value: T[keyof T], key: keyof T & string) => U,
): Record<keyof T & string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(object)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- The own string keys of `T` and their values.
    result[key] = mapper(value as T[keyof T], key as keyof T & string);
  }
  return result;
}
