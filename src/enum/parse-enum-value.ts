import type { EnumObject } from './enum-object';
import { getEnumEntries } from './get-enum-entries';

/**
 * Reads a member of an enum from a value that went through text: a query parameter, a storage entry, an
 * HTML attribute. A numeric enum is matched from its number (`1`) or its text (`'1'`); with `isKeyAccepted`,
 * the member name (`'High'`) is accepted too.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum, such as `Level`.
 * @param input - The value to read, of any type.
 * @param isKeyAccepted - Whether a member name also identifies the member. Defaults to `false`.
 * @returns The member, or `undefined` when nothing matches.
 * @example
 * enum Level { Low = 0, High = 1 }
 * parseEnumValue(Level, '1', false); // Level.High
 * parseEnumValue(Level, 'High', true); // Level.High
 * parseEnumValue(Level, '7', false); // undefined
 */
export function parseEnumValue<E extends EnumObject>(
  enumObject: E,
  input: unknown,
  isKeyAccepted?: boolean | null,
): E[keyof E] | undefined {
  const resolvedIsKeyAccepted = isKeyAccepted ?? false;
  if (typeof input !== 'string' && typeof input !== 'number') {
    return undefined;
  }
  const text = String(input);
  const match = getEnumEntries(enumObject).find(
    ([key, value]) => String(value) === text || (resolvedIsKeyAccepted && key === text),
  );
  return match?.[1];
}
