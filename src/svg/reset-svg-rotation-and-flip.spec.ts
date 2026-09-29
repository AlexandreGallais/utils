import { resetSvgRotationAndFlip } from './reset-svg-rotation-and-flip.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(resetSvgRotationAndFlip, () => {
  it('shows the element upright and unmirrored, at the same place', () => {
    const element = createTwistedElement('rotate(40)');
    const before = describeOnScreen(element);
    resetSvgRotationAndFlip(asSvgElement(element));
    const after = describeOnScreen(element);
    expect([after.rotation, after.isFlipped, after.center]).toStrictEqual([0, false, before.center]);
  });
});
