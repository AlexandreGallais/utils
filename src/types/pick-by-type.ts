import type { KeysOfType } from './keys-of-type.ts';

/**
 * Keeps the properties whose type matches.
 *
 * @template T - The object type.
 * @template V - The property type to keep.
 * @example
 * type Flags = PickByType<Settings, boolean>;
 */
export type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;
