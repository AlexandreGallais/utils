import { setSvgTransform } from './set-svg-transform';
import { asSvgElement, createFakeSvgElement } from './testing';

describe(setSvgTransform, () => {
  it('writes the matrix attribute', () => {
    const element = createFakeSvgElement(undefined, { x: 0, y: 0, width: 1, height: 1 });
    setSvgTransform(asSvgElement(element), { a: 0.5, b: 0, c: 0, d: 2, e: 1 / 3, f: -4 });
    expect(element.attributes.get('transform')).toBe('matrix(0.5 0 0 2 0.333333 -4)');
  });
});
