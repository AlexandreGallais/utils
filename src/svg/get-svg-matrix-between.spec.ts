import { getSvgMatrixBetween } from './get-svg-matrix-between.ts';
import { asSvgElement, createFakeSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';

const BOX = { x: 0, y: 0, width: 10, height: 10 };
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(getSvgMatrixBetween, () => {
  it('converts between elements of different groups', () => {
    const from = createFakeSvgElementIn({ ...IDENTITY, e: 100 }, 'translate(5 0)', BOX);
    const to = createFakeSvgElementIn({ ...IDENTITY, a: 2, d: 2 }, undefined, BOX);
    // from (1, 1) → screen (106, 1) → to (53, 0.5)
    expect(getSvgMatrixBetween(asSvgElement(from), asSvgElement(to))).toStrictEqual({
      a: 0.5,
      b: 0,
      c: 0,
      d: 0.5,
      e: 52.5,
      f: 0,
    });
  });

  it('throws a TypeError for an element that is not rendered', () => {
    const rendered = createFakeSvgElementIn(IDENTITY, undefined, BOX);
    const detached = Object.assign(createFakeSvgElement(undefined, BOX), { getScreenCTM: (): null => null });
    expect(() => getSvgMatrixBetween(asSvgElement(detached), asSvgElement(rendered))).toThrow(TypeError);
  });

  it('throws a TypeError for a flattened target', () => {
    const from = createFakeSvgElementIn(IDENTITY, undefined, BOX);
    const to = createFakeSvgElementIn({ ...IDENTITY, a: 0 }, undefined, BOX);
    expect(() => getSvgMatrixBetween(asSvgElement(from), asSvgElement(to))).toThrow(TypeError);
  });
});
