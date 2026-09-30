import { resetSvgRotation } from './reset-svg-rotation';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

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
