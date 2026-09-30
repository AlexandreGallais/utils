import { downsampleLttb } from './downsample-lttb';

function toPoints(values: readonly number[]): { x: number; y: number }[] {
  return values.map((y, x) => ({ x, y }));
}

describe(downsampleLttb, () => {
  it('keeps the first, the last and the most significant points', () => {
    const result = downsampleLttb(toPoints([0, 1, 0, 10, 0, 1, 0, 1, 0, 0]), 4);
    expect(result.map(({ x }) => x)).toStrictEqual([0, 3, 5, 9]);
  });

  it('returns the requested number of points', () => {
    const points = toPoints(Array.from({ length: 1000 }, (_, index) => Math.sin(index / 20)));
    expect(downsampleLttb(points, 50)).toHaveLength(50);
  });

  it('copies a short series', () => {
    const points = toPoints([1, 2, 3]);
    const result = downsampleLttb(points, 3);
    expect(result).toStrictEqual(points);
    expect(result).not.toBe(points);
  });

  it.for([2, 0, 3.5, NaN])('throws a RangeError for a target of %s', (targetCount) => {
    expect(() => downsampleLttb([], targetCount)).toThrow(RangeError);
  });
});
