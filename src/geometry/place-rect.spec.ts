import { placeRect } from './place-rect';

const TARGET = { x: 100, y: 50, width: 40, height: 20 };
const BADGE = { width: 10, height: 10 };

describe(placeRect, () => {
  it('places the box inside the target corner by default', () => {
    expect(placeRect(BADGE, TARGET, { targetAnchor: 'top-right' })).toStrictEqual({
      x: 130,
      y: 50,
      width: 10,
      height: 10,
    });
  });

  it('centers the box on the anchor', () => {
    expect(placeRect(BADGE, TARGET, { targetAnchor: 'top-right', selfAnchor: 'center' })).toMatchObject({
      x: 135,
      y: 45,
    });
  });

  it('puts the box outside with the opposite anchor and an offset', () => {
    expect(
      placeRect(BADGE, TARGET, { targetAnchor: 'top-right', selfAnchor: 'bottom-left', offset: { x: 4, y: -4 } }),
    ).toMatchObject({ x: 144, y: 36 });
  });

  it('places a label under the target', () => {
    expect(placeRect({ width: 30, height: 8 }, TARGET, { targetAnchor: 'bottom', selfAnchor: 'top' })).toMatchObject({
      x: 105,
      y: 70,
    });
  });

  it('centers the box on the center of the target for null or undefined options', () => {
    const target = { x: 0, y: 0, width: 100, height: 50 };
    const expected = { x: 44, y: 19, width: 12, height: 12 };
    expect(placeRect({ width: 12, height: 12 }, target)).toStrictEqual(expected);
    expect(placeRect({ width: 12, height: 12 }, target, null)).toStrictEqual(expected);
    expect(placeRect({ width: 12, height: 12 }, target, { targetAnchor: null })).toStrictEqual(expected);
  });
});
