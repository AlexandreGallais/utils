import { resetSvgFlip } from './reset-svg-flip.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';
import { screenCenter } from './testing/screen-center.ts';

describe(resetSvgFlip, () => {
  it('unmirrors the element without moving its center', () => {
    const element = createFakeSvgElement('translate(100 50) scale(-1 1)', { x: 0, y: 0, width: 20, height: 10 });
    const before = screenCenter(element);
    resetSvgFlip(asSvgElement(element));
    expect(element.attributes.get('transform')).toBe('matrix(1 0 0 1 80 50)');
    expect(screenCenter(element)).toStrictEqual(before);
  });
});
