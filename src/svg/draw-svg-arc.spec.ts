import { createArcPath } from './create-arc-path';
import { drawSvgArc } from './draw-svg-arc';
import { asSvgElement, createGaugeScene } from './testing';

describe(drawSvgArc, () => {
  it('draws the arc around the element, in the coordinates of the path', () => {
    const { hub, path } = createGaugeScene();
    drawSvgArc(asSvgElement(path), { center: asSvgElement(hub), radius: 40, startAngle: -135, sweepAngle: 270 });
    expect(path.attributes.get('d')).toBe(createArcPath({ x: 50, y: 50 }, 40, -135, 135));
  });
});
