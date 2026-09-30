import { downsampleMinMax } from './downsample-min-max';

function toPoints(values: readonly number[]): { x: number; y: number }[] {
  return values.map((y, x) => ({ x, y }));
}

describe(downsampleMinMax, () => {
  it('keeps the lowest and highest point of each bucket, in order', () => {
    const result = downsampleMinMax(toPoints([5, 9, 1, 4, 2, 2, 8, 3, 7, 0, 6, 6]), 3);
    expect(result.map(({ x }) => x)).toStrictEqual([1, 2, 4, 6, 8, 9]);
  });

  it('keeps one point for a flat bucket', () => {
    expect(downsampleMinMax(toPoints([1, 1, 1, 1, 1, 1, 1]), 2).map(({ x }) => x)).toStrictEqual([0, 3]);
  });

  it('copies a short series', () => {
    const points = toPoints([1, 2, 3, 4]);
    const result = downsampleMinMax(points, 2);
    expect(result).toStrictEqual(points);
    expect(result).not.toBe(points);
  });

  it.for([0, -1, 1.5])('throws a RangeError for %s buckets', (bucketCount) => {
    expect(() => downsampleMinMax([], bucketCount)).toThrow(RangeError);
  });
});
