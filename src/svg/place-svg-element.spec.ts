import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { placeSvgElement } from './place-svg-element.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen, isSamePoint } from './testing/scene.ts';

describe(placeSvgElement, () => {
  it.for([
    ['center', 'top-right'],
    ['top-left', 'top-left'],
    ['bottom', 'top'],
  ] as const)('puts the %s of the element on the %s of a reference in another group', ([anchor, referenceAnchor]) => {
    const reference = createTwistedElement('translate(10 5) rotate(70)');
    const element = createFakeSvgElementIn({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }, 'rotate(15)', {
      x: 0,
      y: 0,
      width: 6,
      height: 6,
    });
    const before = describeOnScreen(element);
    placeSvgElement(asSvgElement(element), anchor, asSvgElement(reference), referenceAnchor);
    const placed = getSvgAnchorPoint(asSvgElement(element), anchor);
    const target = getSvgAnchorPoint(asSvgElement(reference), referenceAnchor);
    expect(isSamePoint(placed, target)).toBe(true);
    expect(describeOnScreen(element).rotation).toBe(before.rotation);
  });
});
