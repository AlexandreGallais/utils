import { getRectUnion } from './get-rect-union.ts';

describe(getRectUnion, () => {
  it.for([
    [
      { x: 0, y: 0, width: 10, height: 10 },
      { x: 20, y: 5, width: 10, height: 10 },
      { x: 0, y: 0, width: 30, height: 15 },
    ],
    [
      { x: 0, y: 0, width: 10, height: 10 },
      { x: 2, y: 2, width: 2, height: 2 },
      { x: 0, y: 0, width: 10, height: 10 },
    ],
    [
      { x: 5, y: 5, width: 1, height: 1 },
      { x: -5, y: -5, width: 1, height: 1 },
      { x: -5, y: -5, width: 11, height: 11 },
    ],
  ] as const)('encloses %j and %j', ([a, b, expected]) => {
    expect(getRectUnion(a, b)).toStrictEqual(expected);
  });
});
