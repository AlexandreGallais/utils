import { setSvgRotationAround } from './set-svg-rotation-around';
import { asSvgElement, createFakeSvgElementIn, describeOnScreen, screenPoint, createTwistedElement } from './testing';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(setSvgRotationAround, () => {
  it('points the needle at an absolute angle around a hub of another group', () => {
    const hub = createFakeSvgElementIn({ ...IDENTITY, e: 50, f: 50 }, undefined, { x: -3, y: -3, width: 6, height: 6 });
    // The needle is drawn from (50, 50) up to (50, 10), in a group scaled by 2.
    const needle = createFakeSvgElementIn({ ...IDENTITY, a: 2, d: 2 }, 'translate(25 25)', {
      x: -1,
      y: -20,
      width: 2,
      height: 20,
    });
    setSvgRotationAround(asSvgElement(needle), 90, asSvgElement(hub), 'center');
    setSvgRotationAround(asSvgElement(needle), 90, asSvgElement(hub), 'center');
    expect(describeOnScreen(needle).rotation).toBeCloseTo(90, 2);
    expect(screenPoint(needle, { x: 0, y: -20 })).toStrictEqual({ x: 90, y: 50 });
  });

  it('takes the defaults for null or undefined', () => {
    const pivot = asSvgElement(createTwistedElement('translate(30 5)'));
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    setSvgRotationAround(asSvgElement(omitted), undefined, pivot);
    setSvgRotationAround(asSvgElement(nulled), null, pivot, null);
    setSvgRotationAround(asSvgElement(explicit), 0, pivot, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
