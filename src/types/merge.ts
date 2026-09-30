import type { Simplify } from './simplify';

/**
 * Combines two object types, the properties of the second replacing those of the first (like an object
 * spread `{ ...a, ...b }`), where an intersection would give `never` for conflicting properties.
 *
 * @template A - The base type.
 * @template B - The overriding type.
 * @example
 * type Row = Merge<Sample, { timestamp: Date }>; // `timestamp` becomes a Date
 */
export type Merge<A, B> = Simplify<Omit<A, keyof B> & B>;
