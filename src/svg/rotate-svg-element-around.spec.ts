import { rotateSvgElementAround } from './rotate-svg-element-around';
import { asSvgElement, createFakeSvgElementIn, screenPoint, createTwistedElement, describeOnScreen } from './testing';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(rotateSvgElementAround, () => {
  it('turns around an anchor of an element of another group', () => {
    const hub = createFakeSvgElementIn({ ...IDENTITY, e: 100, f: 100 }, undefined, {
      x: -5,
      y: -5,
      width: 10,
      height: 10,
    });
    const pointer = createFakeSvgElementIn({ ...IDENTITY, a: -1, e: 60 }, undefined, {
      x: 0,
      y: 0,
      width: 2,
      height: 2,
    });
    // The pointer origin is drawn at (60, 0), the hub center at (100, 100): a quarter turn clockwise on screen.
    rotateSvgElementAround(asSvgElement(pointer), 90, asSvgElement(hub), 'center');
    expect(screenPoint(pointer, { x: 0, y: 0 })).toStrictEqual({ x: 200, y: 60 });
  });

  it('takes the defaults for null or undefined', () => {
    const pivot = asSvgElement(createTwistedElement('translate(30 5)'));
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    rotateSvgElementAround(asSvgElement(omitted), undefined, pivot);
    rotateSvgElementAround(asSvgElement(nulled), null, pivot, null);
    rotateSvgElementAround(asSvgElement(explicit), 0, pivot, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
