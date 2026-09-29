/**
 * Lists the keys of the properties whose type matches: the numeric fields of a record to chart, the
 * boolean flags of a settings object.
 *
 * @template T - The object type.
 * @template V - The property type to look for.
 * @example
 * type NumericField = KeysOfType<Sample, number>; // 'speed' | 'heading'
 */
export type KeysOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
