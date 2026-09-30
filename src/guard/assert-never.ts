/**
 * Marks a code path as unreachable: in the `default` of a `switch` over a union, TypeScript fails when a
 * member is not handled, and an unexpected value throws at run time.
 *
 * @param value - The value narrowed to `never`.
 * @param message - The message of the error. Defaults to `'Unexpected value'`.
 * @throws {Error} Always.
 * @example
 * switch (mode) {
 *   case 'day': return light;
 *   case 'night': return dark;
 *   default: return assertNever(mode);
 * }
 */
export function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(message);
}
