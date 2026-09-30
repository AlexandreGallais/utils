export function getBBoxCenter(element: SVGGraphicsElement): DOMPoint {
  const { x, y, width, height } = element.getBBox();
  return new DOMPoint(x + width / 2, y + height / 2);
}
