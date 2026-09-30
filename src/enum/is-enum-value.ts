import type { EnumObject } from './enum-object';
import { getEnumValues } from './get-enum-values';

const valuesByEnum = new WeakMap<object, ReadonlySet<unknown>>();

/**
 * Checks whether a value is one of the values of an enum, in O(1): the values of each enum are read once.
 *
 * @template E - The type of the enum object.
 * @param enumObject - The enum to search, such as `Direction`.
 * @param value - The value to look for.
 * @returns `true` when the value is one of the enum's values.
 * @cached The values of each enum, in a `WeakMap`: nothing is kept once the enum is unused.
 * @example
 * enum Direction { Up, Down }
 * isEnumValue(Direction, 0); // true
 * isEnumValue(Direction, 'Up'); // false (a name, not a value)
 */
export function isEnumValue<E extends EnumObject>(enumObject: E, value: unknown): value is E[keyof E] {
  let values = valuesByEnum.get(enumObject);
  if (!values) {
    values = new Set(getEnumValues(enumObject));
    valuesByEnum.set(enumObject, values);
  }
  return values.has(value);
}
