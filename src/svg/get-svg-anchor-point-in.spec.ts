import { getSvgAnchorPointIn } from './get-svg-anchor-point-in.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { createGaugeScene } from './testing/gauge-scene.ts';

describe(getSvgAnchorPointIn, () => {
  it('converts the anchor into the coordinates of the target', () => {
    const { hub, path } = createGaugeScene();
    expect(getSvgAnchorPointIn(asSvgElement(hub), 'center', asSvgElement(path))).toStrictEqual({ x: 50, y: 50 });
    expect(getSvgAnchorPointIn(asSvgElement(hub), 'top-left', asSvgElement(path))).toStrictEqual({ x: 47.5, y: 47.5 });
  });

  it('throws a TypeError for a flattened target', () => {
    const { hub } = createGaugeScene();
    const flat = createFakeSvgElementIn({ a: 0, b: 0, c: 0, d: 1, e: 0, f: 0 }, undefined, {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
    expect(() => getSvgAnchorPointIn(asSvgElement(hub), 'center', asSvgElement(flat))).toThrow(TypeError);
  });
});
