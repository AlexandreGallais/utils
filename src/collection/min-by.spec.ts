import { minBy } from './min-by';

const CONTACTS = [
  { id: 'a', distance: 5 },
  { id: 'b', distance: 2 },
  { id: 'c', distance: 2 },
  { id: 'd', distance: NaN },
];

describe(minBy, () => {
  it('finds the item with the smallest key, the first on a tie', () => {
    expect(minBy(CONTACTS, (contact) => contact.distance)?.id).toBe('b');
  });

  it('ignores NaN keys', () => {
    expect(minBy([NaN, 3, NaN], (value) => value)).toBe(3);
    expect(minBy([NaN], (value) => value)).toBeUndefined();
  });

  it('accepts infinite keys', () => {
    expect(minBy([Infinity, Infinity], (value) => value)).toBe(Infinity);
    expect(minBy([-Infinity, 0], (value) => value)).toBe(-Infinity);
  });

  it('returns undefined for no item', () => {
    expect(minBy([], (value: number) => value)).toBeUndefined();
  });

  it('takes the defaults for null or undefined', () => {
    expect(minBy(undefined, (item: number) => item)).toStrictEqual(minBy([], (item: number) => item));
    expect(minBy(null, (item: number) => item)).toStrictEqual(minBy([], (item: number) => item));
  });
});
