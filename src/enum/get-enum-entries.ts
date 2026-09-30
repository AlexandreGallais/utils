import type { EnumObject } from './enum-object';

/**
 * Lists the members of an enum as `[name, value]` pairs, without the reverse mapping of numeric enums: to
 * build a select list, or to show the name of each value.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum to read, such as `Direction`.
 * @returns The `[name, value]` pairs, in declaration order.
 * @example
 * enum Direction { Up, Down }
 * getEnumEntries(Direction); // [['Up', 0], ['Down', 1]]
 */
export function getEnumEntries<E extends EnumObject>(enumObject: E): [key: keyof E & string, value: E[keyof E]][] {
  const entries: [keyof E & string, E[keyof E]][] = [];
  for (const [key, value] of Object.entries(enumObject)) {
    // Reverse mapping of a numeric enum: `'0': 'Up'`. A real member name cannot be numeric.
    if (String(Number(key)) !== key) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the keys and values of `E`, read from `E` itself.
      entries.push([key, value as E[keyof E]]);
    }
  }
  return entries;
}
