import { observeResize } from './observe-resize';

/**
 * Watches the size of an element like `observeResize`, measuring its content box.
 *
 * @param element - The element to watch.
 * @param onResize - Called with the entry of each change.
 * @returns A function that stops the observer.
 * @simple Content box (the `ResizeObserver` default).
 * @example
 * destroyRef.onDestroy(observeResizeSimple(host, ({ contentRect }) => size.set(contentRect)));
 */
export function observeResizeSimple(element: Element, onResize: (entry: ResizeObserverEntry) => void): () => void {
  return observeResize(element, onResize, {});
}
