import type { EnumObject } from './enum-object.ts';
import { getEnumValues } from './get-enum-values.ts';

/**
 * Checks whether a value is one of the values of a TypeScript enum (or of a `const` object used as one).
 * Numeric enums are handled: the names added by their reverse mapping (`Direction[0] === 'Up'`) are not
 * values. Each call reads the enum again: for checks at a high rate, use `isEnumValueCached`.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum to search, such as `Direction`.
 * @param value - The value to look for, typically read from untyped data (JSON, storage).
 * @returns `true` when the value is one of the enum's values.
 * @example
 * enum Direction { Up, Down }
 * isEnumValue(Direction, 0); // true
 * isEnumValue(Direction, 'Up'); // false (a name, not a value)
 */
export function isEnumValue<E extends EnumObject>(enumObject: E, value: unknown): value is E[keyof E] {
  return getEnumValues(enumObject).some((item) => item === value);
}
