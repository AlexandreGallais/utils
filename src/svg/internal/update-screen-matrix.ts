import { invertMatrix, multiplyMatrices } from '../../geometry';
import type { Matrix2D } from '../../geometry';
import { getSvgTransform } from '../get-svg-transform';
import { setSvgTransform } from '../set-svg-transform';
import { getScreenMatrix } from './get-screen-matrix';

/**
 * Changes how an element is drawn on screen, and writes the matching `transform` attribute: the change is
 * computed in screen pixels, then brought back into the coordinates of its parent, whatever the transforms
 * of its groups (rotated, scaled or mirrored).
 *
 * @internal
 * @param element - A rendered SVG element.
 * @param update - Receives the current screen matrix of the element (local → screen pixels) and returns
 * the wanted one.
 * @throws {TypeError} When the element is not rendered, a transform is flattened or its `transform`
 * attribute is invalid.
 */
export function updateScreenMatrix(element: SVGGraphicsElement, update: (screen: Matrix2D) => Matrix2D): void {
  const local = getSvgTransform(element);
  const screen = getScreenMatrix(element);
  // The screen matrix is `parent × local`: the parent part is the screen matrix without the local one.
  const localInverse = invertMatrix(local);
  const parentInverse = localInverse && invertMatrix(multiplyMatrices(screen, localInverse));
  if (parentInverse === undefined) {
    throw new TypeError('A transform is flattened: the element cannot be moved on screen');
  }
  setSvgTransform(element, multiplyMatrices(parentInverse, update(screen)));
}
