import { isObject } from '../guard';

/**
 * Compares two values at the first level, with `Object.is`: skips an update when a new object carries the
 * same values as the previous one.
 *
 * @param a - A value.
 * @param b - Another value.
 * @returns `true` when both values are shallowly equal; nested objects are compared by reference.
 * @example
 * shallowEqual({ x: 1, y: 2 }, { y: 2, x: 1 }); // true
 * shallowEqual({ p: { x: 1 } }, { p: { x: 1 } }); // false
 */
export function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true;
  }
  if (!isObject(a) || !isObject(b) || Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.hasOwn(b, key) && Object.is(Reflect.get(a, key), Reflect.get(b, key)))
  );
}
