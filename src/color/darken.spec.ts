import { darken } from './darken';

describe(darken, () => {
  it('lowers the lightness', () => {
    expect(darken({ r: 255, g: 0, b: 0 }, 0.25)).toStrictEqual({ r: 128, g: 0, b: 0, a: 1 });
  });

  it('stops at black', () => {
    expect(darken({ r: 30, g: 60, b: 90, a: 0.5 }, 1)).toStrictEqual({ r: 0, g: 0, b: 0, a: 0.5 });
  });

  it('takes the defaults for null or undefined', () => {
    expect(darken({ r: 200, g: 100, b: 50 })).toStrictEqual(darken({ r: 200, g: 100, b: 50 }, 0));
    expect(darken({ r: 200, g: 100, b: 50 }, null)).toStrictEqual(darken({ r: 200, g: 100, b: 50 }, 0));
  });
});
