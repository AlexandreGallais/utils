import { getSvgTransform } from './get-svg-transform';
import { asSvgElement, createFakeSvgElement } from './testing';

const BOX = { x: 0, y: 0, width: 10, height: 10 };

describe(getSvgTransform, () => {
  it('reads the transform attribute', () => {
    expect(getSvgTransform(asSvgElement(createFakeSvgElement('translate(3 4)', BOX)))).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 3,
      f: 4,
    });
  });

  it('reads the identity without attribute', () => {
    expect(getSvgTransform(asSvgElement(createFakeSvgElement(undefined, BOX)))).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0,
    });
  });

  it('throws a TypeError for an invalid attribute', () => {
    expect(() => getSvgTransform(asSvgElement(createFakeSvgElement('spin(3)', BOX)))).toThrow(TypeError);
  });
});
