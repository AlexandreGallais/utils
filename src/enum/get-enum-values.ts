import type { EnumObject } from './enum-object';
import { getEnumEntries } from './get-enum-entries';

/**
 * Lists the values of an enum, without the names of the reverse mapping of numeric enums.
 *
 * @template E - The type of the enum object.
 * @param enumObject - The enum to read, such as `Direction`.
 * @returns The values, in declaration order.
 * @example
 * enum Direction { Up, Down }
 * getEnumValues(Direction); // [0, 1]
 */
export function getEnumValues<E extends EnumObject>(enumObject: E): E[keyof E][] {
  return getEnumEntries(enumObject).map(([, value]) => value);
}
