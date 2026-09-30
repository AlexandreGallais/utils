import { setSvgTransform } from './set-svg-transform';
import { asSvgElement, createFakeSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(setSvgTransform, () => {
  it('writes the matrix attribute', () => {
    const element = createFakeSvgElement(undefined, { x: 0, y: 0, width: 1, height: 1 });
    setSvgTransform(asSvgElement(element), { a: 0.5, b: 0, c: 0, d: 2, e: 1 / 3, f: -4 });
    expect(element.attributes.get('transform')).toBe('matrix(0.5 0 0 2 0.333333 -4)');
  });

  it('takes the defaults for null or undefined', () => {
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    setSvgTransform(asSvgElement(omitted));
    setSvgTransform(asSvgElement(nulled), null);
    setSvgTransform(asSvgElement(explicit), { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
