/**
 * Checks whether a value is callable: a function or a class.
 *
 * @param value - The value to check.
 * @returns `true` for any function.
 * @example
 * isFunction(() => 0); // true
 * isFunction({}); // false
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- The type every function is assignable to.
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
