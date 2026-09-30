import type { EnumObject } from './enum-object';
import { getEnumEntries } from './get-enum-entries';

/**
 * Reads an enum member from a text, such as a query parameter: `'1'` gives the member of value `1`. With
 * `isKeyAccepted`, a member name (`'High'`) works too.
 *
 * @template E - The type of the enum object.
 * @param enumObject - The enum, such as `Level`.
 * @param input - The value or the name to read.
 * @param isKeyAccepted - Whether a member name also identifies the member. Defaults to `false`.
 * @returns The member.
 * @throws {TypeError} When no member matches.
 * @example
 * enum Level { Low = 0, High = 1 }
 * parseEnumValue(Level, '1'); // Level.High
 * parseEnumValue(Level, 'High', true); // Level.High
 */
export function parseEnumValue<E extends EnumObject>(
  enumObject: E,
  input: number | string,
  isKeyAccepted = false,
): E[keyof E] {
  const text = String(input);
  const match = getEnumEntries(enumObject).find(
    ([key, value]) => String(value) === text || (isKeyAccepted && key === text),
  );
  if (!match) {
    throw new TypeError(`No enum member matches '${text}'`);
  }
  return match[1];
}
