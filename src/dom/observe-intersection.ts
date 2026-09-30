/**
 * Watches whether an element is on screen and returns the function that stops watching: pause the updates
 * of a gauge scrolled out of view, load a list page when its sentinel appears.
 *
 * @param element - The element to watch.
 * @param onChange - Called with the visibility and the entry of each change, and once soon after the start.
 * @param options - The scroll container (`root`), its margin and the visible ratios that trigger a call. Defaults to
 * `{}`.
 * @returns A function that stops the observer.
 * @example
 * const isOnScreen = signal(false);
 * destroyRef.onDestroy(observeIntersection(host, (isVisible) => isOnScreen.set(isVisible), {}));
 */
export function observeIntersection(
  element: Element,
  onChange: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit | null,
): () => void {
  const resolvedOptions = options ?? {};
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      onChange(entry.isIntersecting, entry);
    }
  }, resolvedOptions);
  observer.observe(element);
  return (): void => {
    observer.disconnect();
  };
}
