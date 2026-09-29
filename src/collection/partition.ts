/**
 * Splits a list in two, in a single pass: the items that pass the predicate, then the others. With a type
 * guard as predicate, both lists are narrowed.
 *
 * @template T - Type of the items.
 * @template S - Type narrowed by the type guard.
 * @param items - The list to split.
 * @param predicate - Decides which list an item goes to.
 * @returns The items that passed, then the items that failed, both in their original order.
 * @example
 * const [strings, numbers] = partition(['a', 1, 'b'], isString); // ['a', 'b'] (string[]), [1] (number[])
 */
export function partition<T, S extends T>(
  items: readonly T[],
  predicate: (item: T) => item is S,
): [passed: S[], failed: Exclude<T, S>[]];

/**
 * Splits a list in two, in a single pass: the items that pass the predicate, then the others.
 *
 * @template T - Type of the items.
 * @param items - The list to split.
 * @param predicate - Decides which list an item goes to.
 * @returns The items that passed, then the items that failed, both in their original order.
 * @example
 * partition([1, 2, 3, 4], (value) => value % 2 === 0); // [[2, 4], [1, 3]]
 */
export function partition<T>(items: readonly T[], predicate: (item: T) => boolean): [passed: T[], failed: T[]];
export function partition<T>(items: readonly T[], predicate: (item: T) => boolean): [passed: T[], failed: T[]] {
  const passed: T[] = [];
  const failed: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  }
  return [passed, failed];
}
