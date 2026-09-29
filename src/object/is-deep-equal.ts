import { isObject } from '../guard/is-object.ts';

/** Pairs already being compared, to stop on circular references. */
type Visited = WeakMap<object, WeakSet<object>>;

/**
 * Compares two values structurally, at every depth: primitives (`NaN` equals `NaN`, `0` equals `-0`),
 * arrays, plain objects and class instances (same prototype, own enumerable keys), `Date`, `RegExp`, `Map`,
 * `Set` (items compared by identity) and typed arrays. Circular references are supported. For a cheap
 * first-level check, use `shallowEqual`.
 *
 * @param a - A value.
 * @param b - Another value.
 * @returns `true` when both values have the same structure and contents.
 * @example
 * isDeepEqual({ position: { x: 1, y: 2 }, tags: ['a'] }, { position: { x: 1, y: 2 }, tags: ['a'] }); // true
 */
export function isDeepEqual(a: unknown, b: unknown): boolean {
  return equals(a, b, new WeakMap());
}

/**
 * Compares two values, remembering the pairs of objects in progress.
 *
 * @param a - A value.
 * @param b - Another value.
 * @param visited - Pairs of objects being compared.
 * @returns `true` when both values are deeply equal.
 */
function equals(a: unknown, b: unknown, visited: Visited): boolean {
  if (a === b || (Number.isNaN(a) && Number.isNaN(b))) {
    return true;
  }
  if (!isObject(a) || !isObject(b) || Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
    return false;
  }
  const seen = visited.get(a);
  if (seen?.has(b) === true) {
    return true;
  }
  visited.set(a, (seen ?? new WeakSet()).add(b));
  return equalObjects(a, b, visited);
}

/**
 * Compares two objects of the same prototype by kind.
 *
 * @param a - An object.
 * @param b - An object with the same prototype.
 * @param visited - Pairs of objects being compared.
 * @returns `true` when their contents are deeply equal.
 */
function equalObjects(a: object, b: object, visited: Visited): boolean {
  if (a instanceof Date && b instanceof Date) {
    return Object.is(a.getTime(), b.getTime());
  }
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  if (a instanceof Set && b instanceof Set) {
    return a.size === b.size && [...a].every((item: unknown) => b.has(item));
  }
  if (a instanceof Map && b instanceof Map) {
    return (
      a.size === b.size &&
      [...a].every(([key, value]: readonly [unknown, unknown]) => b.has(key) && equals(value, b.get(key), visited))
    );
  }
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    const first = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    const second = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
    return first.length === second.length && first.every((byte, index) => byte === second[index]);
  }
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.hasOwn(b, key) && equals(Reflect.get(a, key), Reflect.get(b, key), visited))
  );
}
