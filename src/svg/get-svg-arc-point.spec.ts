import { getSvgArcPoint } from './get-svg-arc-point';
import { renderSvg } from './testing';

describe(getSvgArcPoint, () => {
  it('finds a point along the arc', () => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><g id="labels"><rect width="1" height="1" /></g>');
    const point = getSvgArcPoint(
      byId('labels'),
      { center: byId('hub'), radius: 40, startAngle: -90, sweepAngle: 180 },
      0.5,
    );
    expect(point.x).toBeCloseTo(50, 6);
    expect(point.y).toBeCloseTo(10, 6);
  });
});
