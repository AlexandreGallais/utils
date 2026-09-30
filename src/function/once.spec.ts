import { once } from './once';

describe(once, () => {
  it('runs on the first call only and returns its result', () => {
    const callback = vi.fn<(value: number) => number>((value) => value * 2);
    const onceFunction = once(callback);
    expect(onceFunction(1)).toBe(2);
    expect(onceFunction(5)).toBe(2);
    expect(callback).toHaveBeenCalledOnce();
  });
});
