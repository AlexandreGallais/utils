/**
 * Any class producing a `T`: mixins, dependency injection tokens, `instanceof` helpers.
 *
 * @template T - Type of the instances.
 * @template TArguments - Parameters of the constructor.
 */
// `any[]`: `unknown[]` would reject constructors with typed parameters (contravariance).
export type Constructor<T = object, TArguments extends unknown[] = any[]> = new (...parameters: TArguments) => T;
