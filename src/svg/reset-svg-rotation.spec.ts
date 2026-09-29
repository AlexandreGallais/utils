import { resetSvgRotation } from './reset-svg-rotation.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(resetSvgRotation, () => {
  it('straightens on screen without moving, keeping the flip', () => {
    const element = createTwistedElement('rotate(40)');
    const before = describeOnScreen(element);
    resetSvgRotation(asSvgElement(element));
    const after = describeOnScreen(element);
    expect(after.rotation).toBeCloseTo(0, 2);
    expect([after.center, after.isFlipped]).toStrictEqual([before.center, before.isFlipped]);
  });
});
