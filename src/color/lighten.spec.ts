import { lighten } from './lighten';

describe(lighten, () => {
  it('raises the lightness', () => {
    expect(lighten({ r: 51, g: 102, b: 153 }, 0.1)).toStrictEqual({ r: 64, g: 128, b: 191, a: 1 });
  });

  it('stops at white and keeps the opacity', () => {
    expect(lighten({ r: 200, g: 10, b: 10, a: 0.4 }, 1)).toStrictEqual({ r: 255, g: 255, b: 255, a: 0.4 });
  });

  it('darkens with a negative amount', () => {
    expect(lighten({ r: 255, g: 0, b: 0 }, -0.25)).toStrictEqual({ r: 128, g: 0, b: 0, a: 1 });
  });
});
