import { getOwnerSvg } from './get-owner-svg';

export function appendTransform(element: SVGGraphicsElement): SVGTransform {
  return element.transform.baseVal.appendItem(getOwnerSvg(element).createSVGTransform());
}
