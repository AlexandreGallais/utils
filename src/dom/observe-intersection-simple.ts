import { observeIntersection } from './observe-intersection';

/**
 * Watches whether an element is on screen like `observeIntersection`, against the viewport.
 *
 * @param element - The element to watch.
 * @param onChange - Called with the visibility and the entry of each change.
 * @returns A function that stops the observer.
 * @simple The viewport as root, no margin, a call as soon as one pixel shows or hides.
 * @example
 * destroyRef.onDestroy(observeIntersectionSimple(host, (isVisible) => isOnScreen.set(isVisible)));
 */
export function observeIntersectionSimple(
  element: Element,
  onChange: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
): () => void {
  return observeIntersection(element, onChange, {});
}
