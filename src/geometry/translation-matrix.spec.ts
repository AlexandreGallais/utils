import { translationMatrix } from './translation-matrix.ts';

describe(translationMatrix, () => {
  it('creates a translation', () => {
    expect(translationMatrix(10, 20)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 });
  });

  it('translates horizontally only by default, like translate(tx)', () => {
    expect(translationMatrix(5)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 5, f: 0 });
  });
});
