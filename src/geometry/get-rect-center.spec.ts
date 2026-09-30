import { getRectCenter } from './get-rect-center';

describe(getRectCenter, () => {
  it.for([
    [
      { x: 10, y: 20, width: 100, height: 50 },
      { x: 60, y: 45 },
    ],
    [
      { x: -10, y: -10, width: 20, height: 20 },
      { x: 0, y: 0 },
    ],
    [
      { x: 5, y: 5, width: 0, height: 0 },
      { x: 5, y: 5 },
    ],
  ] as const)('finds the center of %j', ([rect, expected]) => {
    expect(getRectCenter(rect)).toStrictEqual(expected);
  });
});
