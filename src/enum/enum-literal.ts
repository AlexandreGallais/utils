/**
 * Turns an enum type into the union of its literal values: `'idle' | 'running'` for a string enum, `0 | 1`
 * for a numeric enum. Accept plain literals where an enum is expected (JSON, templates, tests) while staying
 * checked, and compare with strings or numbers without an enum cast.
 *
 * @template E - The enum type, such as `Status` (the type, not `typeof Status`).
 * @example
 * enum Status { Idle = 'idle', Running = 'running' }
 * type StatusValue = EnumLiteral<Status>; // 'idle' | 'running'
 * function setStatus(status: Status | EnumLiteral<Status>): void {}
 * setStatus('idle'); // accepted, and 'stopped' is rejected
 */
export type EnumLiteral<E extends number | string> = E extends string
  ? `${E}`
  : `${E}` extends `${infer N extends number}`
    ? N
    : never;
