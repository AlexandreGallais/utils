import type { EnumObject } from './enum-object.ts';
import { getEnumValues } from './get-enum-values.ts';

/** Values of each enum object; entries disappear with their enum. */
const cache = new WeakMap<object, ReadonlySet<unknown>>();

/**
 * Checks whether a value is one of the values of a TypeScript enum, like `isEnumValue`, with the values of
 * each enum computed once: checks are then an O(1) lookup.
 *
 * @template E - Type of the enum object.
 * @param enumObject - The enum to search, such as `Direction`.
 * @param value - The value to look for.
 * @returns `true` when the value is one of the enum's values.
 * @cached The set of values of each enum object, in a `WeakMap` (no memory kept once the enum is unused).
 * @example
 * enum Direction { Up, Down }
 * isEnumValueCached(Direction, 1); // true
 */
export function isEnumValueCached<E extends EnumObject>(enumObject: E, value: unknown): value is E[keyof E] {
  let values = cache.get(enumObject);
  if (!values) {
    values = new Set(getEnumValues(enumObject));
    cache.set(enumObject, values);
  }
  return values.has(value);
}
