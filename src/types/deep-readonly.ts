/**
 * Makes every property and array read-only, at every depth: a frozen configuration, a state snapshot that
 * must not be changed in place.
 *
 * @template T - The type to protect.
 * @example
 * const DEFAULTS: DeepReadonly<Settings> = { chart: { series: [] } };
 */
export type DeepReadonly<T> = T extends (...arguments_: readonly never[]) => unknown
  ? T
  : T extends readonly (infer Item)[]
    ? readonly DeepReadonly<Item>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;
