/**
 * Reads the item type of an array or tuple, such as the type of a `const` list of options.
 *
 * @template T - The array type.
 * @example
 * const UNITS = ['kn', 'km/h', 'm/s'] as const;
 * type Unit = ElementOf<typeof UNITS>; // 'kn' | 'km/h' | 'm/s'
 */
export type ElementOf<T extends readonly unknown[]> = T[number];
