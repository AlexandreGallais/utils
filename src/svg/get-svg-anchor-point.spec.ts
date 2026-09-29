import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';

describe(getSvgAnchorPoint, () => {
  it('reads the anchors of the visible box', () => {
    const element = asSvgElement(
      createFakeSvgElementIn({ a: 1, b: 0, c: 0, d: 1, e: 100, f: 50 }, undefined, {
        x: 0,
        y: 0,
        width: 20,
        height: 10,
      }),
    );
    expect(getSvgAnchorPoint(element, 'top-right')).toStrictEqual({ x: 120, y: 50 });
    expect(getSvgAnchorPoint(element, 'center')).toStrictEqual({ x: 110, y: 55 });
  });
});
