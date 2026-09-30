import { setSvgRotation } from './set-svg-rotation';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(setSvgRotation, () => {
  it('sets an absolute angle on screen without accumulating', () => {
    const element = createTwistedElement('rotate(10)');
    const before = describeOnScreen(element);
    setSvgRotation(asSvgElement(element), 45, 'center');
    setSvgRotation(asSvgElement(element), 45, 'center');
    const after = describeOnScreen(element);
    expect(after.rotation).toBeCloseTo(45, 2);
    expect(after.center).toStrictEqual(before.center);
  });

  it('takes the defaults for null or undefined', () => {
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    setSvgRotation(asSvgElement(omitted));
    setSvgRotation(asSvgElement(nulled), null, null);
    setSvgRotation(asSvgElement(explicit), 0, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
