import { createCirclePath } from './create-circle-path';
import { drawSvgCircle } from './draw-svg-circle';
import { asSvgElement, createGaugeScene } from './testing';

describe(drawSvgCircle, () => {
  it('draws a circle around the element', () => {
    const { hub, path } = createGaugeScene();
    drawSvgCircle(asSvgElement(path), asSvgElement(hub), 30);
    expect(path.attributes.get('d')).toBe(createCirclePath({ x: 50, y: 50 }, 30));
  });
});
