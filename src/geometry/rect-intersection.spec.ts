import { rectIntersection } from './rect-intersection.ts';

const A = { x: 0, y: 0, width: 10, height: 10 };

describe(rectIntersection, () => {
  it.for([
    [
      { x: 5, y: 5, width: 10, height: 10 },
      { x: 5, y: 5, width: 5, height: 5 },
    ],
    [
      { x: 2, y: 2, width: 3, height: 3 },
      { x: 2, y: 2, width: 3, height: 3 },
    ],
    [
      { x: 10, y: 0, width: 5, height: 5 },
      { x: 10, y: 0, width: 0, height: 5 },
    ],
    [{ x: -5, y: -5, width: 30, height: 30 }, A],
  ] as const)('intersects with %j', ([b, expected]) => {
    expect(rectIntersection(A, b)).toStrictEqual(expected);
  });

  it.for([
    { x: 11, y: 0, width: 5, height: 5 },
    { x: 0, y: -6, width: 5, height: 5 },
  ])('returns undefined without overlap with %j', (b) => {
    expect(rectIntersection(A, b)).toBeUndefined();
  });
});
