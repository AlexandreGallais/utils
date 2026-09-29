import type { EnumObject } from './enum-object.ts';
import { getEnumEntries } from './get-enum-entries.ts';

/**
 * Lists the values of an enum. The names that TypeScript adds to a numeric enum for its reverse mapping
 * (`Direction[0] === 'Up'`) are left out, so the result holds the declared values only.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum to read, such as `Direction`.
 * @returns Its values, in declaration order.
 * @example
 * enum Direction { Up, Down }
 * getEnumValues(Direction); // [0, 1], not ['Up', 'Down', 0, 1]
 * enum Status { Idle = 'idle', Running = 'running' }
 * getEnumValues(Status); // ['idle', 'running']
 */
export function getEnumValues<E extends EnumObject>(enumObject: E): E[keyof E][] {
  return getEnumEntries(enumObject).map(([, value]) => value);
}
