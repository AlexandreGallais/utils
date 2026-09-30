import type { EnumObject } from './enum-object';
import { getEnumEntries } from './get-enum-entries';

/**
 * Finds the member name of an enum value, string enums included: a readable name for a log or a
 * translation key.
 *
 * @template E - The type of the enum object.
 * @param enumObject - The enum, such as `Status`.
 * @param value - The value to name.
 * @returns The first member name with this value; `undefined` when none has it.
 * @example
 * enum Status { Idle = 'idle', Running = 'running' }
 * getEnumKey(Status, 'running'); // 'Running'
 */
export function getEnumKey<E extends EnumObject>(enumObject: E, value: unknown): (keyof E & string) | undefined {
  return getEnumEntries(enumObject).find(([, member]) => member === value)?.[0];
}
