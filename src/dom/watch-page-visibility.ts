import { listen } from './listen.ts';

/**
 * Follows whether the page is visible: calls back at once with the current state, then each time the tab is
 * hidden or shown again, until the returned function is called. Pause a simulation or a polling loop in a
 * hidden tab, where the browser throttles timers anyway.
 *
 * @param onChange - Called with `true` when the page is visible, `false` when it is hidden.
 * @returns A function that stops following the visibility.
 * @example
 * destroyRef.onDestroy(watchPageVisibility((isVisible) => (isVisible ? clock.start() : clock.stop())));
 */
export function watchPageVisibility(onChange: (isVisible: boolean) => void): () => void {
  onChange(document.visibilityState === 'visible');
  return listen(
    document,
    'visibilitychange',
    () => {
      onChange(document.visibilityState === 'visible');
    },
    {},
  );
}
