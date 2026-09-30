/**
 * The union of the value types of an object type, such as a `const` object used as an enum.
 *
 * @template T - The object type.
 * @example
 * const STATUS = { idle: 'idle', running: 'running' } as const;
 * type Status = ValueOf<typeof STATUS>; // 'idle' | 'running'
 */
export type ValueOf<T> = T[keyof T];
