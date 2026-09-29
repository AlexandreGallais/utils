/**
 * Splits a list into consecutive chunks of the same size; the last chunk may be shorter.
 *
 * @template T - Type of the items.
 * @param items - The list to split.
 * @param size - Number of items per chunk, a positive integer.
 * @returns The chunks, in order (an empty array for an empty list).
 * @throws {RangeError} When `size` is not a positive integer.
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new RangeError(`size must be a positive integer, got ${size}`);
  }
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}
