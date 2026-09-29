import { resetSvgRotation } from './reset-svg-rotation.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';
import { screenCenter } from './testing/screen-center.ts';

describe(resetSvgRotation, () => {
  it('straightens the element without moving its center', () => {
    const element = createFakeSvgElement('translate(100 50) rotate(45) scale(-1 1)', {
      x: 0,
      y: 0,
      width: 20,
      height: 10,
    });
    const before = screenCenter(element);
    resetSvgRotation(asSvgElement(element));
    expect(element.attributes.get('transform')).toMatch(/^matrix\(-1 0 0 1 /v);
    expect(screenCenter(element)).toStrictEqual(before);
  });
});
