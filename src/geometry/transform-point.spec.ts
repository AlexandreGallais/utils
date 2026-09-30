import { transformPoint } from './transform-point';

describe(transformPoint, () => {
  it.for([
    [
      { a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 },
      { x: 102, y: 2 },
    ],
    [
      { a: 0, b: 1, c: -1, d: 0, e: 0, f: 0 },
      { x: -1, y: 1 },
    ],
    [
      { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      { x: 1, y: 1 },
    ],
  ] as const)('transforms (1, 1) with %j', ([matrix, expected]) => {
    expect(transformPoint({ x: 1, y: 1 }, matrix)).toStrictEqual(expected);
  });
});
