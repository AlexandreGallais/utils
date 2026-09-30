import { drawSvgFrame } from './draw-svg-frame';
import { asSvgElement, createFakeSvgElementIn, createGaugeScene } from './testing';

describe(drawSvgFrame, () => {
  it('frames the visible box with a margin, in the coordinates of the path', () => {
    const { hub, path } = createGaugeScene();
    // The hub covers 95 → 105 on screen; with 5 px of margin, 90 → 110, halved in the path.
    drawSvgFrame(asSvgElement(path), asSvgElement(hub), 5);
    expect(path.attributes.get('d')).toBe('M 45 45 L 55 45 L 55 55 L 45 55 Z');
  });

  it('throws a TypeError for a flattened path', () => {
    const { hub } = createGaugeScene();
    const flat = createFakeSvgElementIn({ a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }, undefined, {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
    expect(() => {
      drawSvgFrame(asSvgElement(flat), asSvgElement(hub), 1);
    }).toThrow(TypeError);
  });
});
