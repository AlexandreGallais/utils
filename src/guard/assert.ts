/**
 * Throws when a condition is falsy, and narrows its type otherwise.
 *
 * @param condition - The value that must be truthy.
 * @param message - The message of the error. Defaults to `'Assertion failed'`.
 * @throws {Error} When `condition` is falsy.
 * @example
 * assert(user !== undefined, 'User not loaded');
 * user.name; // `user` is no longer `undefined`
 */
export function assert(condition: unknown, message = 'Assertion failed'): asserts condition {
  const isTruthy = Boolean(condition);
  if (!isTruthy) {
    throw new Error(message);
  }
}
