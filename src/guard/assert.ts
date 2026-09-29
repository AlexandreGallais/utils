/**
 * Throws when a condition is falsy, and narrows its type otherwise: an invariant check that also informs
 * TypeScript.
 *
 * @param condition - The value that must be truthy.
 * @param message - Message of the thrown error.
 * @throws {Error} When `condition` is falsy (`false`, `0`, `''`, `null`, `undefined`, `NaN`).
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
