/**
 * A type for any function, for generic constraints such as `F extends AnyFunction` (safer than `Function`, which also
 * accepts classes and has an untyped call).
 *
 * @example
 * function once<F extends AnyFunction>(fn: F): F;
 */
export type AnyFunction = (...arguments_: readonly never[]) => unknown;
