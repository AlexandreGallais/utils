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
});
