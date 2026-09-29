import { createCirclePath } from './create-circle-path.ts';
import { drawSvgCircle } from './draw-svg-circle.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(drawSvgCircle, () => {
  it('draws a circle around the element', () => {
    const { hub, path } = createGaugeScene();
    drawSvgCircle(asSvgElement(path), asSvgElement(hub), 30);
    expect(path.attributes.get('d')).toBe(createCirclePath({ x: 50, y: 50 }, 30));
  });
});
