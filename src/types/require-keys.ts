import type { Simplify } from './simplify.ts';

/**
 * Makes some optional properties required: the result of filling in defaults.
 *
 * @template T - The object type.
 * @template K - The keys to require.
 * @example
 * type ResolvedOptions = RequireKeys<Options, 'duration' | 'easing'>;
 */
export type RequireKeys<T, K extends keyof T> = Simplify<Omit<T, K> & Required<Pick<T, K>>>;
