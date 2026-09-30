import { scaleSvgElementSimple } from './scale-svg-element-simple';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(scaleSvgElementSimple, () => {
  it('shrinks around the center', () => {
    const element = createTwistedElement('');
    const before = describeOnScreen(element);
    scaleSvgElementSimple(asSvgElement(element), 0.5);
    expect(describeOnScreen(element).center).toStrictEqual(before.center);
    expect(describeOnScreen(element).width).toBeCloseTo(before.width / 2, 3);
  });
});
