import { parseEnumValue } from './parse-enum-value.ts';
import type { EnumObject } from './enum-object.ts';

/**
 * Reads an enum value from untrusted data like `parseEnumValue`, accepting values only.
 *
 * @template E - The enum type.
 * @param enumObject - The enum, such as `Status`.
 * @param input - The value to check, such as a parsed JSON field.
 * @returns The enum value, or `undefined`.
 * @simple Member names are not accepted, only values.
 * @example
 * parseEnumValueSimple(Status, json.status);
 */
export function parseEnumValueSimple<E extends EnumObject>(enumObject: E, input: unknown): E[keyof E] | undefined {
  return parseEnumValue(enumObject, input, false);
}
