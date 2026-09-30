import { createPiePath } from './create-pie-path';
import { drawSvgPie } from './draw-svg-pie';
import { asSvgElement, createGaugeScene } from './testing';

describe(drawSvgPie, () => {
  it('draws a slice joined to the center of the element', () => {
    const { hub, path } = createGaugeScene();
    drawSvgPie(asSvgElement(path), { center: asSvgElement(hub), radius: 30, startAngle: 0, sweepAngle: 90 });
    expect(path.attributes.get('d')).toBe(createPiePath({ x: 50, y: 50 }, 30, 0, 90));
  });
});
