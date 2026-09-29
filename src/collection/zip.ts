/**
 * Pairs the items of two lists by position: labels with values, timestamps with samples. The result is as
 * long as the shorter list.
 *
 * @template A - Type of the first list's items.
 * @template B - Type of the second list's items.
 * @param first - The first list (any iterable).
 * @param second - The second list (any iterable).
 * @returns `[first[i], second[i]]` pairs.
 * @example
 * zip(['rpm', 'temperature'], [800, 72]); // [['rpm', 800], ['temperature', 72]]
 */
export function zip<A, B>(first: Iterable<A>, second: Iterable<B>): [A, B][] {
  const pairs: [A, B][] = [];
  const secondIterator = second[Symbol.iterator]();
  for (const item of first) {
    const next = secondIterator.next();
    if (next.done === true) {
      break;
    }
    pairs.push([item, next.value]);
  }
  return pairs;
}
