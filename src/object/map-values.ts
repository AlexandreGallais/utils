/**
 * Transforms every value of an object, keeping its keys: format a record of readings, convert a map of
 * settings.
 *
 * @template T - Type of the object.
 * @template U - Type of the new values.
 * @param object - The source object (own enumerable string keys); left untouched.
 * @param mapper - Returns the new value of a property, from its value and its key.
 * @returns A new object with the same keys and the mapped values.
 * @example
 * mapValues({ rpm: 800.4, temperature: 72.25 }, (value) => formatDecimal(value, 1)); // { rpm: '800.4', temperature: '72.3' }
 */
export function mapValues<T extends object, U>(
  object: T,
  mapper: (value: T[keyof T], key: keyof T & string) => U,
): Record<keyof T & string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(object)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `Object.entries` lists the own string keys of `T` and their values.
    result[key] = mapper(value as T[keyof T], key as keyof T & string);
  }
  return result;
}
