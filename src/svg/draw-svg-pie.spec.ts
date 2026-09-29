import { createPiePath } from './create-pie-path.ts';
import { drawSvgPie } from './draw-svg-pie.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(drawSvgPie, () => {
  it('draws a slice joined to the center of the element', () => {
    const { hub, path } = createGaugeScene();
    drawSvgPie(asSvgElement(path), { center: asSvgElement(hub), radius: 30, startAngle: 0, sweepAngle: 90 });
    expect(path.attributes.get('d')).toBe(createPiePath({ x: 50, y: 50 }, 30, 0, 90));
  });
});
