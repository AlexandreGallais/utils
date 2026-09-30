import type { EnumObject } from './enum-object';
import { getEnumEntries } from './get-enum-entries';

/**
 * Finds the member name of an enum value, for string enums too (TypeScript only generates the reverse
 * mapping for numeric enums): to log a readable name, or to build a translation key.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum, such as `Status`.
 * @param value - The value to name.
 * @returns The first member name with this value, or `undefined` when no member has it.
 * @example
 * enum Status { Idle = 'idle', Running = 'running' }
 * getEnumKey(Status, 'running'); // 'Running'
 */
export function getEnumKey<E extends EnumObject>(enumObject: E, value: unknown): (keyof E & string) | undefined {
  return getEnumEntries(enumObject).find(([, member]) => member === value)?.[0];
}
