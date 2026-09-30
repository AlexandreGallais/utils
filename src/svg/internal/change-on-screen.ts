import { appendTransform } from './append-transform';
import { createMatrix } from './create-matrix';
import { getScreenMatrix } from './get-screen-matrix';

/**
 * Sets a transform of the list so that the screen matrix of the element becomes `change(screen)`, whatever
 * the transforms before and after it. The list returns a new object at each read, so the transform is found
 * by a zero matrix that no real transform has.
 */
export function changeOnScreen(
  element: SVGGraphicsElement,
  change: (screen: DOMMatrix) => DOMMatrix,
  transform: SVGTransform = appendTransform(element),
): SVGTransform {
  transform.setMatrix(createMatrix(element, [0, 0, 0, 0, 0, 0]));
  let after = createMatrix(element);
  let isAfter = false;
  for (const { matrix } of element.transform.baseVal) {
    if (isAfter) {
      after = after.multiply(matrix);
    }
    isAfter ||= matrix.a === 0 && matrix.b === 0 && matrix.c === 0 && matrix.d === 0;
  }
  transform.setMatrix(createMatrix(element));
  const screen = getScreenMatrix(element);
  transform.setMatrix(after.multiply(screen.inverse()).multiply(change(screen)).multiply(after.inverse()));
  return transform;
}
