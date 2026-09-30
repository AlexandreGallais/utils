import { rotateSvgElementSimple } from './rotate-svg-element-simple';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(rotateSvgElementSimple, () => {
  it('turns around its center', () => {
    const element = createTwistedElement('');
    const before = describeOnScreen(element);
    rotateSvgElementSimple(asSvgElement(element), 90);
    expect(describeOnScreen(element).center).toStrictEqual(before.center);
    expect(describeOnScreen(element).rotation).toBeCloseTo((before.rotation + 90) % 360, 2);
  });
});
