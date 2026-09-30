/** Falsy values removed by `compact`. */
type Falsy = '' | 0 | 0n | false | null | undefined;

/**
 * Removes the falsy values of a list: `null`, `undefined`, `false`, `0`, `0n`, `''` and `NaN`. The result is
 * typed without them. To keep `0` and `''`, filter with `isDefined` instead.
 *
 * @template T - Type of the items.
 * @param items - The list to clean. Defaults to `[]`.
 * @returns A new list of the truthy items.
 * @example
 * compact(['a', '', undefined, 'b']); // ['a', 'b'], typed string[]
 */
export function compact<T>(items?: readonly T[] | null): Exclude<T, Falsy>[] {
  const resolvedItems = items ?? [];
  return resolvedItems.filter((item): item is Exclude<T, Falsy> => Boolean(item));
}
