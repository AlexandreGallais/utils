import { memoize } from './memoize.ts';

describe(memoize, () => {
  it('runs once per key', () => {
    const callback = vi.fn<(value: number) => number>((value) => value * 2);
    const memoized = memoize(callback);
    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(memoized(3)).toBe(6);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(memoized.cache.size).toBe(2);
  });

  it('caches undefined results too', () => {
    const callback = vi.fn<(key: string) => undefined>();
    const memoized = memoize(callback);
    memoized('a');
    memoized('a');
    expect(callback).toHaveBeenCalledOnce();
  });

  it('uses a custom key', () => {
    const callback = vi.fn<(a: number, b: number) => number>((a, b) => a + b);
    const memoized = memoize(callback, (a, b) => `${a},${b}`);
    memoized(1, 2);
    memoized(1, 2);
    expect(memoized(2, 1)).toBe(3);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('evicts the oldest entry beyond maxSize', () => {
    const callback = vi.fn<(value: number) => number>((value) => value);
    const memoized = memoize(callback, undefined, 2);
    memoized(1);
    memoized(2);
    memoized(3);
    memoized(2);
    memoized(1);
    expect(callback).toHaveBeenCalledTimes(4);
    expect(memoized.cache.size).toBe(2);
  });

  it('empties the cache on clear', () => {
    const callback = vi.fn<(value: number) => number>((value) => value);
    const memoized = memoize(callback);
    memoized(1);
    memoized.clear();
    memoized(1);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it.for([0, -1, 1.5])('throws a RangeError for maxSize %s', (maxSize) => {
    expect(() => memoize((value: number) => value, undefined, maxSize)).toThrow(RangeError);
  });
});
