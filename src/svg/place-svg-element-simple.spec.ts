import { placeSvgElementSimple } from './place-svg-element-simple';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(placeSvgElementSimple, () => {
  it('centers the element on the reference', () => {
    const reference = createTwistedElement('translate(40 0)');
    const element = createTwistedElement('rotate(90)');
    placeSvgElementSimple(asSvgElement(element), asSvgElement(reference));
    expect(describeOnScreen(element).center).toStrictEqual(describeOnScreen(reference).center);
  });
});
