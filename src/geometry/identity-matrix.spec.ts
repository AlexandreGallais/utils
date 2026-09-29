import { identityMatrix } from './identity-matrix.ts';

describe(identityMatrix, () => {
  it('creates the identity transform', () => {
    expect(identityMatrix()).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
  });

  it('returns a new object at each call', () => {
    expect(identityMatrix()).not.toBe(identityMatrix());
  });
});
