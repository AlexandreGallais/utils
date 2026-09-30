export function getScreenMatrix(element: SVGGraphicsElement): DOMMatrix {
  const matrix = element.getScreenCTM();
  if (matrix === null) {
    throw new TypeError('The SVG element is not rendered: it has no screen matrix');
  }
  return matrix;
}
