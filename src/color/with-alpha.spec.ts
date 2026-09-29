import { withAlpha } from './with-alpha.ts';

describe(withAlpha, () => {
  it.for([
    { alpha: 0.2, expected: 0.2 },
    { alpha: 2, expected: 1 },
    { alpha: -1, expected: 0 },
  ])('sets an opacity of $alpha', ({ alpha, expected }) => {
    expect(withAlpha({ r: 1, g: 2, b: 3, a: 0.5 }, alpha)).toStrictEqual({ r: 1, g: 2, b: 3, a: expected });
  });
});
