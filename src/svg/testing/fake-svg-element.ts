import type { Matrix2D } from '../../geometry/matrix-2d.ts';
import { multiplyMatrices } from '../../geometry/multiply-matrices.ts';
import { parseTransform } from '../../geometry/parse-transform.ts';

/** A stand-in for a rendered SVG element in Node: a `transform` attribute and a fixed bounding box. */
export interface FakeSvgElement {
  readonly attributes: Map<string, string>;
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  getBBox(): { x: number; y: number; width: number; height: number };
}

/**
 * Creates a fake SVG element.
 *
 * @param transform - Initial `transform` attribute, or `undefined` for none.
 * @param box - The bounding box returned by `getBBox`.
 * @returns The fake element.
 */
export function createFakeSvgElement(
  transform: string | undefined,
  box: { x: number; y: number; width: number; height: number },
): FakeSvgElement {
  const attributes = new Map<string, string>();
  if (transform !== undefined) {
    attributes.set('transform', transform);
  }
  return {
    attributes,
    getAttribute: (name: string): string | null => attributes.get(name) ?? null,
    setAttribute: (name: string, value: string): void => {
      attributes.set(name, value);
    },
    getBBox: (): { x: number; y: number; width: number; height: number } => box,
  };
}

/**
 * Types a fake element as the SVG element the code under test expects.
 *
 * @param element - The fake element.
 * @returns The same object, typed as an `SVGGraphicsElement`.
 */
export function asSvgElement(element: FakeSvgElement): SVGGraphicsElement {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- test double: only the members above are used.
  return element as unknown as SVGGraphicsElement;
}

/** A fake SVG element inside groups: its screen matrix is its parent's times its own `transform`. */
export interface FakeSvgElementInGroup extends FakeSvgElement {
  getScreenCTM(): Matrix2D;
}

/**
 * Creates a fake SVG element placed in groups whose cumulated transform is `parentMatrix`.
 *
 * @param parentMatrix - The screen matrix of the parent group.
 * @param transform - Initial `transform` attribute, or `undefined` for none.
 * @param box - The bounding box returned by `getBBox`.
 * @returns The fake element.
 */
export function createFakeSvgElementIn(
  parentMatrix: Matrix2D,
  transform: string | undefined,
  box: { x: number; y: number; width: number; height: number },
): FakeSvgElementInGroup {
  const element = createFakeSvgElement(transform, box);
  return Object.assign(element, {
    getScreenCTM: (): Matrix2D =>
      multiplyMatrices(parentMatrix, parseTransform(element.getAttribute('transform') ?? '') ?? parentMatrix),
  });
}
