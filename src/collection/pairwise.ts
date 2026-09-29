/**
 * Lists the pairs of consecutive items: the segments of a route, the differences between measurements.
 *
 * @template T - Type of the items.
 * @param items - The list to walk.
 * @returns `[items[0], items[1]]`, `[items[1], items[2]]`…; empty for fewer than two items.
 * @example
 * pairwise([1, 4, 9]).map(([previous, next]) => next - previous); // [3, 5]
 */
export function pairwise<T>(items: readonly T[]): [previous: T, next: T][] {
  const pairs: [T, T][] = [];
  // Wrapped, so an `undefined` item is not mistaken for "no previous item".
  let previous: { readonly item: T } | undefined;
  for (const item of items) {
    if (previous) {
      pairs.push([previous.item, item]);
    }
    previous = { item };
  }
  return pairs;
}
