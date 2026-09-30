import { memoizeSimple } from './memoize-simple';

describe(memoizeSimple, () => {
  it('calls once per key', () => {
    const callback = vi.fn<(value: number) => number>((value) => value * 2);
    const memoized = memoizeSimple(callback);
    memoized(2);
    expect(memoized(2)).toBe(4);
    expect(callback).toHaveBeenCalledOnce();
  });
});
