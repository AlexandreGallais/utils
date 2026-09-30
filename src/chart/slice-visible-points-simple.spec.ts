import { sliceVisiblePointsSimple } from './slice-visible-points-simple';

describe(sliceVisiblePointsSimple, () => {
  it('keeps the neighbours', () => {
    const series = [0, 10, 20, 30].map((x) => ({ x, y: 0 }));
    expect(sliceVisiblePointsSimple(series, 12, 18).map(({ x }) => x)).toStrictEqual([10, 20]);
  });
});
