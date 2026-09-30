import { flipSvgElement } from './flip-svg-element';
import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(flipSvgElement, () => {
  it.for(['horizontal', 'vertical'] as const)('mirrors %s on screen without moving', (axis) => {
    const element = createTwistedElement('rotate(20)');
    const before = describeOnScreen(element);
    flipSvgElement(asSvgElement(element), axis, 'center');
    const after = describeOnScreen(element);
    expect(after.isFlipped).toBe(!before.isFlipped);
    expect(after.center).toStrictEqual(before.center);
    expect([after.width, after.height]).toStrictEqual([before.width, before.height]);
  });

  it('keeps the anchor in place', () => {
    const element = createTwistedElement('');
    const left = getSvgAnchorPoint(asSvgElement(element), 'left');
    flipSvgElement(asSvgElement(element), 'horizontal', 'left');
    const box = describeOnScreen(element);
    // Mirrored around its left edge, the element now ends there.
    expect(Math.abs(box.center.x + box.width / 2 - left.x)).toBeLessThan(0.01);
  });
});
