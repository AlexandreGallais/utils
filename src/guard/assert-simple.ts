import { assert } from './assert.ts';

/**
 * Throws when a condition is false, like `assert`, with a standard message and a strict boolean condition.
 *
 * @param isTrue - The condition that must hold, as a strict boolean.
 * @throws {Error} When `isTrue` is `false`.
 * @simple Message `Assertion failed`; the condition must be a boolean (no truthy values).
 * @example
 * assertSimple(values.length > 0);
 */
export function assertSimple(isTrue: boolean): asserts isTrue {
  assert(isTrue, 'Assertion failed');
}
