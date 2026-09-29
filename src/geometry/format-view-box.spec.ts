import { formatViewBox } from './format-view-box.ts';

describe(formatViewBox, () => {
  it.for([
    [{ x: 0, y: 0, width: 200, height: 100 }, '0 0 200 100'],
    [{ x: -10.5, y: 2, width: 0.25, height: 1e3 }, '-10.5 2 0.25 1000'],
  ] as const)('formats %j', ([rect, expected]) => {
    expect(formatViewBox(rect)).toBe(expected);
  });
});
