import { sample } from './sample';

describe(sample, () => {
  it('picks the item matching the random source', () => {
    expect(sample(['a', 'b', 'c'], () => 0)).toBe('a');
    expect(sample(['a', 'b', 'c'], () => 0.5)).toBe('b');
    expect(sample(['a', 'b', 'c'], () => 0.999)).toBe('c');
  });

  it('picks an item of the list with Math.random', () => {
    expect(['a', 'b']).toContain(sample(['a', 'b'], Math.random));
  });

  it('returns undefined for an empty list', () => {
    expect(sample<string>([], Math.random)).toBeUndefined();
  });

  it('takes an empty list and Math.random for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(sample([1, 2, 3])).toStrictEqual(sample([1, 2, 3], Math.random));
    expect(sample([1, 2, 3], null)).toStrictEqual(sample([1, 2, 3], Math.random));
    expect(sample()).toBeUndefined();
    expect(sample(null, null)).toBeUndefined();
    vi.restoreAllMocks();
  });
});
