/**
 * Makes every property optional, at every depth: a patch of a nested settings object, read-only since a
 * patch is only read. Functions are kept whole; array items are deeply partial.
 *
 * @template T - The type to loosen.
 * @example
 * type SettingsPatch = DeepPartial<Settings>;
 * const patch: SettingsPatch = { chart: { grid: { isVisible: false } } };
 */
export type DeepPartial<T> = T extends (...arguments_: readonly never[]) => unknown
  ? T
  : T extends readonly (infer Item)[]
    ? readonly DeepPartial<Item>[]
    : T extends object
      ? { readonly [K in keyof T]?: DeepPartial<T[K]> }
      : T;
