/**
 * Splits a list into consecutive chunks of the same size; the last chunk may be shorter.
 *
 * @template T - Type of the items.
 * @param items - The list to split. Defaults to `[]`.
 * @param size - Number of items per chunk, a positive integer.
 * @returns The chunks, in order (an empty array for an empty list).
 * @throws {RangeError} When `size` is not a positive integer.
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(items: readonly T[] | null | undefined, size: number): T[][] {
  const resolvedItems = items ?? [];
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new RangeError(`size must be a positive integer, got ${size}`);
  }
  const chunks: T[][] = [];
  for (let index = 0; index < resolvedItems.length; index += size) {
    chunks.push(resolvedItems.slice(index, index + size));
  }
  return chunks;
}
