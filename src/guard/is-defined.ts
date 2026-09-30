/**
 * Checks whether a value is neither `null` nor `undefined`. `isNotUndefined` lets `null` through.
 *
 * @template T - The type of the value.
 * @param value - The value to check.
 * @returns `true` when the value is present, `0`, `''` and `false` included.
 * @example
 * [1, null, undefined].filter(isDefined); // [1], typed number[]
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  // eslint-disable-next-line sonarjs/different-types-comparison -- `T` may include `undefined`.
  return value !== null && value !== undefined;
}
