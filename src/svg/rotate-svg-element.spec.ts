import { invertMatrix, transformPoint } from '../geometry';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { rotateSvgElement } from './rotate-svg-element';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(rotateSvgElement, () => {
  it('turns clockwise on screen around its center, even in a mirrored group', () => {
    const element = createTwistedElement('rotate(10)');
    const before = describeOnScreen(element);
    rotateSvgElement(asSvgElement(element), 25, 'center');
    const after = describeOnScreen(element);
    expect(after.center).toStrictEqual(before.center);
    expect(after.rotation).toBeCloseTo((before.rotation + 25) % 360, 2);
  });

  it('keeps the anchor in place', () => {
    const element = createTwistedElement('rotate(10)');
    const pivot = getSvgAnchorPoint(asSvgElement(element), 'bottom');
    const local = transformPoint(pivot, invertMatrix(element.getScreenCTM()) ?? element.getScreenCTM());
    rotateSvgElement(asSvgElement(element), 60, 'bottom');
    const moved = transformPoint(local, element.getScreenCTM());
    expect(Math.hypot(moved.x - pivot.x, moved.y - pivot.y)).toBeLessThan(1e-4);
  });

  it('takes the defaults for null or undefined', () => {
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    rotateSvgElement(asSvgElement(omitted));
    rotateSvgElement(asSvgElement(nulled), null, null);
    rotateSvgElement(asSvgElement(explicit), 0, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
