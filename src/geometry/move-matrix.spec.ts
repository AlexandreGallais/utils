import { moveMatrix } from './move-matrix';

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

  it('takes the defaults for null or undefined', () => {
    expect(moveMatrix()).toStrictEqual(moveMatrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, 0, 0));
    expect(moveMatrix(null, null, null)).toStrictEqual(moveMatrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, 0, 0));
  });
});
