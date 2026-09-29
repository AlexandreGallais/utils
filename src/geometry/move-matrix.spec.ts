import { moveMatrix } from './move-matrix.ts';

describe(moveMatrix, () => {
  it('moves in the parent coordinates whatever the rotation', () => {
    expect(moveMatrix({ a: 0, b: 1, c: -1, d: 0, e: 5, f: 5 }, 10, -2)).toStrictEqual({
      a: 0,
      b: 1,
      c: -1,
      d: 0,
      e: 15,
      f: 3,
    });
  });
});
