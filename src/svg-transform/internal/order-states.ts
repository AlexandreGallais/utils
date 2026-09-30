import type { SvgTransformOrder } from '../svg-transform-order';

export interface OrderState {
  update: (() => void) | undefined;
  toChange(element: SVGGraphicsElement, screen: DOMMatrix): DOMMatrix;
}

export const orderStates = new WeakMap<SvgTransformOrder<never>, OrderState>();
