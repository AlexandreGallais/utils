import { setSvgRotationSimple } from './set-svg-rotation-simple.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(setSvgRotationSimple, () => {
  it('sets the angle around the center', () => {
    const element = createTwistedElement('rotate(70)');
    const before = describeOnScreen(element);
    setSvgRotationSimple(asSvgElement(element), 0);
    expect(describeOnScreen(element).rotation).toBeCloseTo(0, 2);
    expect(describeOnScreen(element).center).toStrictEqual(before.center);
  });
});
