import type { DragHandlers } from './drag-handlers.ts';
import { listen } from './listen.ts';

/** `PointerEvent.button` of the primary button (left button, touch, pen contact). */
const PRIMARY_BUTTON = 0;

/**
 * Makes an element draggable with pointer events (mouse, touch and pen alike): the pointer is captured on
 * press so the drag goes on outside the element, and the callbacks receive the distance from the press.
 * Returns the function that stops listening, to pass to `DestroyRef.onDestroy`.
 *
 * @param element - The element to drag from, such as a symbol or a slider thumb; set `touch-action: none`
 * on it in CSS so that touch drags do not scroll the page.
 * @param handlers - What to do at the start, at each move and at the end of a drag.
 * @returns A function that removes the listeners, ending a drag in progress without calling `onEnd`.
 * @example
 * destroyRef.onDestroy(
 *   trackPointerDrag(symbol, {
 *     onMove: (deltaX, deltaY) => position.set({ x: start.x + deltaX, y: start.y + deltaY }),
 *   }),
 * );
 */
export function trackPointerDrag(element: HTMLElement | SVGElement, handlers: DragHandlers): () => void {
  let pointerId: number | undefined;
  let startX = 0;
  let startY = 0;

  function onPointerDown(event: PointerEvent): void {
    if (pointerId !== undefined || event.button !== PRIMARY_BUTTON || handlers.canStart?.(event) === false) {
      return;
    }
    ({ pointerId } = event);
    startX = event.clientX;
    startY = event.clientY;
    element.setPointerCapture(event.pointerId);
    handlers.onStart?.(event);
  }

  function onPointerMove(event: PointerEvent): void {
    if (event.pointerId === pointerId) {
      handlers.onMove(event.clientX - startX, event.clientY - startY, event);
    }
  }

  function onPointerEnd(event: PointerEvent): void {
    if (event.pointerId !== pointerId) {
      return;
    }
    pointerId = undefined;
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    handlers.onEnd?.(event.clientX - startX, event.clientY - startY, event);
  }

  const cleanups = [
    listen(element, 'pointerdown', onPointerDown, {}),
    listen(element, 'pointermove', onPointerMove, {}),
    listen(element, 'pointerup', onPointerEnd, {}),
    listen(element, 'pointercancel', onPointerEnd, {}),
  ];
  return (): void => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
