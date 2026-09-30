export function getOwnerSvg(element: SVGGraphicsElement): SVGSVGElement {
  if (element.ownerSVGElement === null) {
    throw new TypeError('The element is not inside an <svg>');
  }
  return element.ownerSVGElement;
}
