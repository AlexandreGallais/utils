declare const brand: unique symbol;

/**
 * Nominal type: a `T` that cannot be mixed up with another `T` of a different brand.
 *
 * @template T - The underlying type.
 * @template TBrand - The brand name.
 * @example
 * type UserId = Brand<string, 'UserId'>;
 * function toUserId(value: string): UserId {
 *   return value as UserId;
 * }
 */
export type Brand<T, TBrand extends string> = T & { readonly [brand]: TBrand };
