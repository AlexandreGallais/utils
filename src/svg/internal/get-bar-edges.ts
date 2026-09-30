import type { SvgBar } from '../svg-bar';
import { getScreenMatrix } from './get-screen-matrix';

/** The start edge of the bar (`start0 → start1`) and its end edge, in the coordinates of `target`. */
export function getBarEdges(
  bar: SvgBar,
  target: SVGGraphicsElement,
): readonly [DOMPoint, DOMPoint, DOMPoint, DOMPoint] {
  const matrix = getScreenMatrix(target).inverse().multiply(getScreenMatrix(bar.element));
  const { x, y, width, height } = bar.element.getBBox();
  const topLeft = new DOMPoint(x, y).matrixTransform(matrix);
  const topRight = new DOMPoint(x + width, y).matrixTransform(matrix);
  const bottomLeft = new DOMPoint(x, y + height).matrixTransform(matrix);
  const bottomRight = new DOMPoint(x + width, y + height).matrixTransform(matrix);
  switch (bar.direction) {
    case 'up': {
      return [bottomLeft, bottomRight, topLeft, topRight];
    }
    case 'down': {
      return [topLeft, topRight, bottomLeft, bottomRight];
    }
    case 'right': {
      return [topLeft, bottomLeft, topRight, bottomRight];
    }
    case 'left': {
      return [topRight, bottomRight, topLeft, bottomLeft];
    }
  }
}
