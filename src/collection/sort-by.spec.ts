import { sortBy } from './sort-by';

const ALARMS = [
  { id: 'a', priority: 2 },
  { id: 'b', priority: 1 },
  { id: 'c', priority: 3 },
  { id: 'd', priority: 1 },
];

describe(sortBy, () => {
  it('sorts by increasing key, stably', () => {
    expect(sortBy(ALARMS, (alarm) => alarm.priority, 'asc').map(({ id }) => id)).toStrictEqual(['b', 'd', 'a', 'c']);
  });

  it('sorts by decreasing key, stably', () => {
    expect(sortBy(ALARMS, (alarm) => alarm.priority, 'desc').map(({ id }) => id)).toStrictEqual(['c', 'a', 'b', 'd']);
  });

  it('does not modify the input', () => {
    const input = [3, 1, 2];
    expect(sortBy(input, (value) => value, 'asc')).toStrictEqual([1, 2, 3]);
    expect(input).toStrictEqual([3, 1, 2]);
  });

  it('sorts strings, dates and bigints', () => {
    expect(sortBy(['b', 'C', 'a'], (text) => text.toLowerCase(), 'asc')).toStrictEqual(['a', 'b', 'C']);
    expect(sortBy([new Date(2), new Date(1)], (date) => date, 'asc').map((date) => date.getTime())).toStrictEqual([
      1, 2,
    ]);
    expect(sortBy([2n, 1n], (value) => value, 'asc')).toStrictEqual([1n, 2n]);
  });

  it('puts NaN and undefined keys last, in their order', () => {
    const values = [3, NaN, 1, undefined, 2];
    expect(sortBy(values, (value) => value, 'asc')).toStrictEqual([1, 2, 3, NaN, undefined]);
    expect(sortBy(values, (value) => value, 'desc')).toStrictEqual([3, 2, 1, NaN, undefined]);
  });
});
