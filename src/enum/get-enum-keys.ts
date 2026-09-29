import type { EnumObject } from './enum-object.ts';
import { getEnumEntries } from './get-enum-entries.ts';

/**
 * Lists the member names of an enum, without the reverse mapping of numeric enums.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum to read, such as `Direction`.
 * @returns The member names, in declaration order.
 * @example
 * enum Direction { Up, Down }
 * getEnumKeys(Direction); // ['Up', 'Down'], not ['0', '1', 'Up', 'Down']
 */
export function getEnumKeys<E extends EnumObject>(enumObject: E): (keyof E & string)[] {
  return getEnumEntries(enumObject).map(([key]) => key);
}
