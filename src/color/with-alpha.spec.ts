import { withAlpha } from './with-alpha';

describe(withAlpha, () => {
  it.for([
    { alpha: 0.2, expected: 0.2 },
    { alpha: 2, expected: 1 },
    { alpha: -1, expected: 0 },
  ])('sets an opacity of $alpha', ({ alpha, expected }) => {
    expect(withAlpha({ r: 1, g: 2, b: 3, a: 0.5 }, alpha)).toStrictEqual({ r: 1, g: 2, b: 3, a: expected });
  });

  it('takes the defaults for null or undefined', () => {
    expect(withAlpha({ r: 200, g: 100, b: 50 })).toStrictEqual(withAlpha({ r: 200, g: 100, b: 50 }, 1));
    expect(withAlpha({ r: 200, g: 100, b: 50 }, null)).toStrictEqual(withAlpha({ r: 200, g: 100, b: 50 }, 1));
  });
});
