import { getOwnerSvg } from './get-owner-svg';

type MatrixValues = readonly [a: number, b: number, c: number, d: number, e: number, f: number];

export function createMatrix(element: SVGGraphicsElement, values: MatrixValues = [1, 0, 0, 1, 0, 0]): DOMMatrix {
  const matrix = getOwnerSvg(element).createSVGMatrix();
  [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f] = values;
  return matrix;
}
