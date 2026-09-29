import { createIdentityMatrix } from './create-identity-matrix.ts';

describe(createIdentityMatrix, () => {
  it('creates the identity transform', () => {
    expect(createIdentityMatrix()).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
  });

  it('returns a new object at each call', () => {
    expect(createIdentityMatrix()).not.toBe(createIdentityMatrix());
  });
});
