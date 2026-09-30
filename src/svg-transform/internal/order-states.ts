import type { SvgTransformOrder } from '../svg-transform-order';

export interface OrderState {
  toChange(element: SVGGraphicsElement, screen: DOMMatrix): DOMMatrix;
  update: (() => void) | undefined;
}

export const orderStates = new WeakMap<SvgTransformOrder<never>, OrderState>();
