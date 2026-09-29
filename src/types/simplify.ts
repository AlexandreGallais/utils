/**
 * Flattens intersections and mapped types into a plain object type, so that editor tooltips show the
 * properties instead of `A & Omit<B, 'c'>`. The type itself is unchanged.
 *
 * @template T - The type to display flat.
 * @example
 * type Options = Simplify<BaseOptions & { isAnimated: boolean }>;
 */
export type Simplify<T> = { [K in keyof T]: T[K] } & {};
