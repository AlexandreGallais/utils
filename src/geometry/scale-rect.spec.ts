import { scaleRect } from './scale-rect.ts';

describe(scaleRect, () => {
  it('scales towards the anchor', () => {
    expect(scaleRect({ x: 0, y: 0, width: 20, height: 100 }, 1, 0.3, 'bottom')).toStrictEqual({
      x: 0,
      y: 70,
      width: 20,
      height: 30,
    });
  });

  it('scales uniformly around the center by default', () => {
    expect(scaleRect({ x: 0, y: 0, width: 10, height: 10 }, 2)).toStrictEqual({ x: -5, y: -5, width: 20, height: 20 });
  });
});
