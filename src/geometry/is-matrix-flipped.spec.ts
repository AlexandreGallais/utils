import { isMatrixFlipped } from './is-matrix-flipped';

describe(isMatrixFlipped, () => {
  it.for([
    [{ a: -1, b: 0, c: 0, d: 1, e: 0, f: 0 }, true],
    [{ a: 1, b: 0, c: 0, d: -1, e: 0, f: 0 }, true],
    [{ a: -1, b: 0, c: 0, d: -1, e: 0, f: 0 }, false],
    [{ a: 0, b: 1, c: -1, d: 0, e: 0, f: 0 }, false],
  ] as const)('tells whether %j mirrors', ([matrix, expected]) => {
    expect(isMatrixFlipped(matrix)).toBe(expected);
  });
});
