/**
 * Turns an enum type into the union of its literal values, so plain literals are accepted where the enum is
 * expected: `'idle' | 'running'` for a string enum, `0 | 1` for a numeric one.
 *
 * @template E - The enum type, such as `Status` (not `typeof Status`).
 * @example
 * enum Status { Idle = 'idle', Running = 'running' }
 * type StatusValue = EnumLiteral<Status>; // 'idle' | 'running'
 */
export type EnumLiteral<E extends number | string> = E extends string
  ? `${E}`
  : `${E}` extends `${infer N extends number}`
    ? N
    : never;
