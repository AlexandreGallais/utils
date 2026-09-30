import type { SvgTransformOrder } from '../svg-transform-order';
import type { OrderState } from './order-states';
import { orderStates } from './order-states';

// An order whose effect is the screen change `toChange(element, screen, ...args)`, `screen` being the screen
// matrix of the element without this order.
export function createOrder<TArguments extends unknown[]>(
  initialArguments: TArguments,
  toChange: (element: SVGGraphicsElement, screen: DOMMatrix, ...args: TArguments) => DOMMatrix,
): SvgTransformOrder<TArguments> {
  let currentArguments = initialArguments;
  const state: OrderState = {
    toChange: (element, screen) => toChange(element, screen, ...currentArguments),
    update: undefined,
  };
  const order: SvgTransformOrder<TArguments> = {
    set(...args: TArguments): void {
      currentArguments = args;
      state.update?.();
    },
  };
  orderStates.set(order, state);
  return order;
}
