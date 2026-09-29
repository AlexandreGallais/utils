import { getSvgCenter } from './get-svg-center.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';

describe(getSvgCenter, () => {
  it('returns the center of the bounding box', () => {
    const element = createFakeSvgElement(undefined, { x: 10, y: -20, width: 40, height: 10 });
    expect(getSvgCenter(asSvgElement(element))).toStrictEqual({ x: 30, y: -15 });
  });
});
