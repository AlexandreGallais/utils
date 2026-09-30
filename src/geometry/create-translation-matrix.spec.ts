import { createTranslationMatrix } from './create-translation-matrix';

describe(createTranslationMatrix, () => {
  it('creates a translation', () => {
    expect(createTranslationMatrix(10, 20)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 });
  });

  it('translates horizontally only, like translate(tx)', () => {
    expect(createTranslationMatrix(5, 0)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 5, f: 0 });
  });
});
