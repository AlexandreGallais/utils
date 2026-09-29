import { drawSvgArcTicks } from './draw-svg-arc-ticks.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(drawSvgArcTicks, () => {
  it('draws count + 1 ticks from the radius towards the center', () => {
    const { hub, path } = createGaugeScene();
    drawSvgArcTicks(
      asSvgElement(path),
      { center: asSvgElement(hub), radius: 40, startAngle: 0, sweepAngle: 180 },
      2,
      10,
    );
    expect(path.attributes.get('d')).toBe('M 50 10 L 50 20 M 90 50 L 80 50 M 50 90 L 50 80');
  });

  it('draws outwards with a negative length', () => {
    const { hub, path } = createGaugeScene();
    drawSvgArcTicks(
      asSvgElement(path),
      { center: asSvgElement(hub), radius: 40, startAngle: 0, sweepAngle: 90 },
      1,
      -5,
    );
    expect(path.attributes.get('d')).toBe('M 50 10 L 50 5 M 90 50 L 95 50');
  });

  it.for([0, -1, 1.5])('throws a RangeError for %s intervals', (count) => {
    const { hub, path } = createGaugeScene();
    expect(() => {
      drawSvgArcTicks(
        asSvgElement(path),
        { center: asSvgElement(hub), radius: 40, startAngle: 0, sweepAngle: 90 },
        count,
        5,
      );
    }).toThrow(RangeError);
  });
});
