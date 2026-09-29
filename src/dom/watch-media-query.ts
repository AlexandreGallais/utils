import { listen } from './listen.ts';

/**
 * Follows a CSS media query, such as `(prefers-reduced-motion: reduce)` or `(max-width: 600px)`: calls back
 * at once with the current state, then at each change, until the returned function is called.
 *
 * @param query - A CSS media query, with its parentheses.
 * @param onChange - Called with whether the query matches.
 * @returns A function that stops following the query.
 * @example
 * const isReducedMotion = signal(false);
 * destroyRef.onDestroy(watchMediaQuery('(prefers-reduced-motion: reduce)', (isMatching) => isReducedMotion.set(isMatching)));
 */
export function watchMediaQuery(query: string, onChange: (isMatching: boolean) => void): () => void {
  const list = matchMedia(query);
  onChange(list.matches);
  return listen(list, 'change', (event) => {
    onChange(event.matches);
  });
}
