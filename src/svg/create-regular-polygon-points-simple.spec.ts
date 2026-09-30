import { createRegularPolygonPointsSimple } from './create-regular-polygon-points-simple';

describe(createRegularPolygonPointsSimple, () => {
  it('starts at the top', () => {
    const [first] = createRegularPolygonPointsSimple({ x: 0, y: 0 }, 10, 4);
    expect([Math.round(first?.x ?? NaN) + 0, first?.y]).toStrictEqual([0, -10]);
  });
});
