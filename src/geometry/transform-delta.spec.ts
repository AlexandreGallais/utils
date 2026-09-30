import { transformDelta } from './transform-delta';

describe(transformDelta, () => {
  it('ignores the translation', () => {
    expect(transformDelta({ x: 10, y: 0 }, { a: 0, b: 1, c: -1, d: 0, e: 500, f: 500 })).toStrictEqual({
      x: 0,
      y: 10,
    });
  });

  it('applies scales and flips', () => {
    expect(transformDelta({ x: 3, y: 4 }, { a: -2, b: 0, c: 0, d: 0.5, e: 1, f: 1 })).toStrictEqual({
      x: -6,
      y: 2,
    });
  });

  it('takes the defaults for null or undefined', () => {
    expect(transformDelta()).toStrictEqual(transformDelta({ x: 0, y: 0 }, { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }));
    expect(transformDelta(null, null)).toStrictEqual(
      transformDelta({ x: 0, y: 0 }, { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
    );
  });
});
