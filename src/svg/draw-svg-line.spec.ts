import { drawSvgLine } from './draw-svg-line';
import { asSvgElement, createFakeSvgElementIn, createGaugeScene, createTwistedElement } from './testing';

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

  it('takes the defaults for null or undefined', () => {
    const other = asSvgElement(createTwistedElement('translate(90 0)'));
    const drawn = [createGaugeScene(), createGaugeScene(), createGaugeScene()] as const;
    drawSvgLine(asSvgElement(drawn[0].path), asSvgElement(drawn[0].hub), undefined, other);
    drawSvgLine(asSvgElement(drawn[1].path), asSvgElement(drawn[1].hub), null, other, null);
    drawSvgLine(asSvgElement(drawn[2].path), asSvgElement(drawn[2].hub), 'center', other, 'center');
    const paths = drawn.map((scene) => scene.path.attributes.get('d'));
    expect(paths[0]).toBe(paths[2]);
    expect(paths[1]).toBe(paths[2]);
  });
});
