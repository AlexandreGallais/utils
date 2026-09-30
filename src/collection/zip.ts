/**
 * Pairs the items of two lists by position: labels with values, timestamps with samples. The result is as
 * long as the shorter list.
 *
 * @template A - Type of the first list's items.
 * @template B - Type of the second list's items.
 * @param first - The first list (any iterable). Defaults to `[]`.
 * @param second - The second list (any iterable). Defaults to `[]`.
 * @returns `[first[i], second[i]]` pairs.
 * @example
 * zip(['rpm', 'temperature'], [800, 72]); // [['rpm', 800], ['temperature', 72]]
 */
export function zip<A, B>(first?: Iterable<A> | null, second?: Iterable<B> | null): [A, B][] {
  const resolvedFirst = first ?? [];
  const resolvedSecond = second ?? [];
  const pairs: [A, B][] = [];
  const secondIterator = resolvedSecond[Symbol.iterator]();
  for (const item of resolvedFirst) {
    const next = secondIterator.next();
    if (next.done === true) {
      break;
    }
    pairs.push([item, next.value]);
  }
  return pairs;
}
