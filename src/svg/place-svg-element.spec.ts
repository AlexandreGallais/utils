import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { placeSvgElement } from './place-svg-element';
import { asSvgElement, createFakeSvgElementIn, createTwistedElement, describeOnScreen, isSamePoint } from './testing';

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

  it('takes the center anchors for null or undefined', () => {
    const reference = asSvgElement(createTwistedElement('translate(30 5)'));
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    placeSvgElement(asSvgElement(omitted), undefined, reference);
    placeSvgElement(asSvgElement(nulled), null, reference, null);
    placeSvgElement(asSvgElement(explicit), 'center', reference, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
