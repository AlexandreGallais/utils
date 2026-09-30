/**
 * Marks a code path as unreachable. In the `default` branch of a `switch` over a union, TypeScript refuses
 * to compile when a member is not handled; at run time, an unexpected value throws.
 *
 * @param value - The value that should have been narrowed to `never`.
 * @param message - Message of the thrown error. Defaults to `'Unexpected value'`.
 * @throws {Error} Always, with the given message.
 * @example
 * switch (level) {
 *   case 'AA': return 4.5;
 *   case 'AAA': return 7;
 *   default: return assertNever(level, `Unknown level: ${String(level)}`);
 * }
 */
export function assertNever(value: never, message?: string | null): never {
  const resolvedMessage = message ?? 'Unexpected value';
  throw new Error(resolvedMessage);
}
