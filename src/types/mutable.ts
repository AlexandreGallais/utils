/**
 * Removes `readonly` from the properties of a type, one level deep: a builder filling an object before
 * handing it out as read-only.
 *
 * @template T - The read-only type.
 * @example
 * const draft: Mutable<Point> = { x: 0, y: 0 };
 * draft.x = 10;
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
