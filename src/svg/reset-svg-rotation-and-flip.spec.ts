import { resetSvgRotationAndFlip } from './reset-svg-rotation-and-flip.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';
import { screenCenter } from './testing/screen-center.ts';

describe(resetSvgRotationAndFlip, () => {
  it('straightens and unmirrors the element without moving its center', () => {
    const element = createFakeSvgElement('translate(10 10) rotate(90) scale(-2 2)', {
      x: 0,
      y: 0,
      width: 4,
      height: 4,
    });
    const before = screenCenter(element);
    resetSvgRotationAndFlip(asSvgElement(element));
    expect(element.attributes.get('transform')).toMatch(/^matrix\(2 0 0 2 /v);
    expect(screenCenter(element)).toStrictEqual(before);
  });
});
