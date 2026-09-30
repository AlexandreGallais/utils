import type { SvgTransformOrder } from '../svg-transform-order';
import type { OrderState } from './order-states';
import { orderStates } from './order-states';

export function getOrderState(order: SvgTransformOrder<never>): OrderState {
  const state = orderStates.get(order);
  if (state === undefined) {
    throw new TypeError(
      'Not an order: create it with svgRotateBy, svgFlipTo, svgScaleBy, svgTranslateBy, svgMove or svgPlaceOn',
    );
  }
  return state;
}
