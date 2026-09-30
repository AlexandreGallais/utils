/**
 * Moves an item to another position, such as a row dropped at a new place in a reorderable list.
 *
 * @template T - The item type.
 * @param items - The list. Defaults to `[]`.
 * @param fromIndex - Current index of the item.
 * @param toIndex - Index of the item in the result.
 * @returns A new array; the input is not modified.
 * @throws {RangeError} When an index is not an integer within the list.
 * @example
 * moveItem(['a', 'b', 'c', 'd'], 0, 2); // ['b', 'c', 'a', 'd']
 */
export function moveItem<T>(items: readonly T[] | null | undefined, fromIndex: number, toIndex: number): T[] {
  const resolvedItems = items ?? [];
  for (const index of [fromIndex, toIndex]) {
    if (!Number.isSafeInteger(index) || index < 0 || index >= resolvedItems.length) {
      throw new RangeError(`index must be an integer in [0, ${resolvedItems.length - 1}], got ${index}`);
    }
  }
  return resolvedItems.toSpliced(fromIndex, 1).toSpliced(toIndex, 0, ...resolvedItems.slice(fromIndex, fromIndex + 1));
}
