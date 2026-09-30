import { scaleRect } from './scale-rect';

describe(scaleRect, () => {
  it('scales towards the anchor', () => {
    expect(scaleRect({ x: 0, y: 0, width: 20, height: 100 }, 1, 0.3, 'bottom')).toStrictEqual({
      x: 0,
      y: 70,
      width: 20,
      height: 30,
    });
  });

  it('scales uniformly around the center', () => {
    expect(scaleRect({ x: 0, y: 0, width: 10, height: 10 }, 2, 2, 'center')).toStrictEqual({
      x: -5,
      y: -5,
      width: 20,
      height: 20,
    });
  });

  it('takes the defaults for null or undefined', () => {
    expect(scaleRect({ x: 10, y: 20, width: 100, height: 50 })).toStrictEqual(
      scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 1, 1, 'center'),
    );
    expect(scaleRect({ x: 10, y: 20, width: 100, height: 50 }, null, null, null)).toStrictEqual(
      scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 1, 1, 'center'),
    );
  });
  it('scales uniformly for a null or undefined scaleY', () => {
    expect(scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 2)).toStrictEqual(
      scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 2, 2, 'center'),
    );
    expect(scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 2, null, null)).toStrictEqual(
      scaleRect({ x: 10, y: 20, width: 100, height: 50 }, 2, 2, 'center'),
    );
  });
});
