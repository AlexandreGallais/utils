import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { scaleSvgElement } from './scale-svg-element';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(scaleSvgElement, () => {
  it('grows on screen around the anchor', () => {
    const element = createTwistedElement('rotate(35)');
    const before = describeOnScreen(element);
    const bottom = getSvgAnchorPoint(asSvgElement(element), 'bottom');
    scaleSvgElement(asSvgElement(element), 2, 'bottom');
    const after = describeOnScreen(element);
    const newBottom = getSvgAnchorPoint(asSvgElement(element), 'bottom');
    expect([after.width, after.height]).toStrictEqual(
      [before.width * 2, before.height * 2].map((value) => Math.round(value * 1000) / 1000),
    );
    expect(Math.hypot(newBottom.x - bottom.x, newBottom.y - bottom.y)).toBeLessThan(1e-4);
  });

  it('takes the defaults for null or undefined', () => {
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    scaleSvgElement(asSvgElement(omitted));
    scaleSvgElement(asSvgElement(nulled), null, null);
    scaleSvgElement(asSvgElement(explicit), 1, 'center');
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
