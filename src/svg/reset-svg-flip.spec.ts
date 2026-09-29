import { resetSvgFlip } from './reset-svg-flip.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(resetSvgFlip, () => {
  it('unmirrors on screen without moving, keeping the rotation', () => {
    // The twisted parent mirrors: the element is flipped on screen.
    const element = createTwistedElement('rotate(40)');
    const before = describeOnScreen(element);
    resetSvgFlip(asSvgElement(element));
    const after = describeOnScreen(element);
    expect(before.isFlipped).toBe(true);
    expect([after.isFlipped, after.center, after.rotation]).toStrictEqual([false, before.center, before.rotation]);
  });
});
