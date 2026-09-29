import { getSvgLocalCenter } from './get-svg-local-center.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';

describe(getSvgLocalCenter, () => {
  it('returns the center of the bounding box', () => {
    const element = createFakeSvgElement(undefined, { x: 10, y: -20, width: 40, height: 10 });
    expect(getSvgLocalCenter(asSvgElement(element))).toStrictEqual({ x: 30, y: -15 });
  });
});
