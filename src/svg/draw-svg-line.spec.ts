import { drawSvgLine } from './draw-svg-line.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(drawSvgLine, () => {
  it('joins two anchors in the coordinates of the path', () => {
    const { hub, path } = createGaugeScene();
    const other = createFakeSvgElementIn({ a: 1, b: 0, c: 0, d: 1, e: 200, f: 100 }, undefined, {
      x: 0,
      y: -10,
      width: 20,
      height: 20,
    });
    drawSvgLine(asSvgElement(path), asSvgElement(hub), 'right', asSvgElement(other), 'left');
    expect(path.attributes.get('d')).toBe('M 52.5 50 L 100 50');
  });
});
