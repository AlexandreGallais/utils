import type { Simplify } from './simplify.ts';

/**
 * Makes some properties optional: the input of a factory that fills them with defaults.
 *
 * @template T - The object type.
 * @template K - The keys to make optional.
 * @example
 * function createUser(input: PartialKeys<User, 'id' | 'createdAt'>): User;
 */
export type PartialKeys<T, K extends keyof T> = Simplify<Omit<T, K> & Partial<Pick<T, K>>>;
