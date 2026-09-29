import { placeRect } from './place-rect.ts';

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
});
