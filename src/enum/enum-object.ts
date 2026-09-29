/**
 * Any TypeScript enum (string, numeric or both), or a `const` object used as one: the parameter type of the
 * enum helpers.
 */
export type EnumObject = Readonly<Record<string, number | string>>;
