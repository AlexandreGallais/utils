import { setSvgRotation } from './set-svg-rotation.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

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
});
