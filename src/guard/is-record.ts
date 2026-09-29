/**
 * Checks whether a value is a plain object: an object literal or `Object.create(null)`. Arrays, class
 * instances, dates and maps are excluded.
 *
 * @param value - The value to check.
 * @returns `true` for a plain object.
 * @example
 * isRecord({ a: 1 }); // true
 * isRecord([]); // false
 * isRecord(new Date()); // false
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
