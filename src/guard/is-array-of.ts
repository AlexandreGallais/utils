/**
 * Checks whether a value is an array whose every item passes a type guard.
 *
 * @template T - Type of the items.
 * @param value - The value to check.
 * @param guard - The type guard applied to each item.
 * @returns `true` for an array of `T` (an empty array included).
 * @example
 * isArrayOf([1, 2], isNumber); // true
 * isArrayOf([1, '2'], isNumber); // false
 */
export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every((item: unknown) => guard(item));
}
