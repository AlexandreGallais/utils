/**
 * Checks whether a value is not `undefined`; `null` passes.
 *
 * Differs from `isDefined`, which also excludes `null`.
 *
 * @template T - Type of the value.
 * @param value - The value to check.
 * @returns `true` for anything but `undefined`.
 * @example
 * [1, null, undefined].filter(isNotUndefined); // [1, null], typed (number | null)[]
 */
export function isNotUndefined<T>(value: T): value is Exclude<T, undefined> {
  return value !== undefined;
}
