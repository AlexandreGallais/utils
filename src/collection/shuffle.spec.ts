import { shuffle } from './shuffle.ts';

describe(shuffle, () => {
  it('keeps the same items and leaves the input untouched', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input, Math.random);
    expect(result.toSorted((a, b) => a - b)).toStrictEqual(input);
    expect(input).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('follows the random source', () => {
    expect(shuffle(['a', 'b', 'c'], () => 0)).toStrictEqual(['b', 'c', 'a']);
    expect(shuffle(['a', 'b', 'c'], () => 0.999)).toStrictEqual(['a', 'b', 'c']);
  });

  it('gives every order a similar frequency', () => {
    const counts = new Map<string, number>();
    for (let run = 0; run < 6000; run++) {
      const order = shuffle(['a', 'b', 'c'], Math.random).join('');
      counts.set(order, (counts.get(order) ?? 0) + 1);
    }
    expect(counts.size).toBe(6);
    expect(Math.min(...counts.values())).toBeGreaterThan(800);
  });

  it('handles empty and single-item lists', () => {
    expect(shuffle([], Math.random)).toStrictEqual([]);
    expect(shuffle([1], Math.random)).toStrictEqual([1]);
  });
});
