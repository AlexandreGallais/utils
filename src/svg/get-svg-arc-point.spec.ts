import { getSvgArcPoint } from './get-svg-arc-point';
import { asSvgElement, createGaugeScene } from './testing';

describe(getSvgArcPoint, () => {
  it.for([
    [0, { x: 50, y: 10 }],
    [0.5, { x: 90, y: 50 }],
    [1, { x: 50, y: 90 }],
  ] as const)('places the point at ratio %s', ([ratio, expected]) => {
    const { hub, path } = createGaugeScene();
    const point = getSvgArcPoint(
      asSvgElement(path),
      { center: asSvgElement(hub), radius: 40, startAngle: 0, sweepAngle: 180 },
      ratio,
    );
    expect({ x: Math.round(point.x * 1e9) / 1e9 + 0, y: Math.round(point.y * 1e9) / 1e9 + 0 }).toStrictEqual(expected);
  });

  it('takes the start of the arc for null or undefined', () => {
    const { hub, path } = createGaugeScene();
    const arc = { center: asSvgElement(hub), radius: 40, startAngle: 0, sweepAngle: 180 };
    const expected = getSvgArcPoint(asSvgElement(path), arc, 0);
    expect(getSvgArcPoint(asSvgElement(path), arc)).toStrictEqual(expected);
    expect(getSvgArcPoint(asSvgElement(path), arc, null)).toStrictEqual(expected);
  });
});
