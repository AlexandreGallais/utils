import { memoizeLast } from './memoize-last';

describe(memoizeLast, () => {
  it('reuses the result for the same arguments', () => {
    const callback = vi.fn<(a: number, b: number) => number[]>((a, b) => [a, b]);
    const memoized = memoizeLast(callback);
    const first = memoized(1, 2);
    expect(memoized(1, 2)).toBe(first);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('recomputes when an argument changes', () => {
    const callback = vi.fn<(a: number, b?: number) => number>((a, b = 0) => a + b);
    const memoized = memoizeLast(callback);
    memoized(1, 2);
    expect(memoized(1, 3)).toBe(4);
    expect(memoized(1)).toBe(1);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('compares with Object.is', () => {
    const callback = vi.fn<(value: number) => number>((value) => value);
    const memoized = memoizeLast(callback);
    memoized(NaN);
    memoized(NaN);
    memoized(-0);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
