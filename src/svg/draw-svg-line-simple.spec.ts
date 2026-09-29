import { drawSvgLineSimple } from './draw-svg-line-simple.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(drawSvgLineSimple, () => {
  it('joins the centers', () => {
    const { hub, path } = createGaugeScene();
    const other = createFakeSvgElementIn({ a: 1, b: 0, c: 0, d: 1, e: 200, f: 100 }, undefined, {
      x: -1,
      y: -1,
      width: 2,
      height: 2,
    });
    drawSvgLineSimple(asSvgElement(path), asSvgElement(hub), asSvgElement(other));
    expect(path.attributes.get('d')).toBe('M 50 50 L 100 50');
  });
});
