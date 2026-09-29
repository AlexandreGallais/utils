// DOM listeners and observers returning their cleanup, to feed signals without RxJS; idle tasks.

export type { CleanupStack } from './cleanup-stack.ts';
export { createCleanupStack } from './create-cleanup-stack.ts';
export { listen } from './listen.ts';
export { observeIntersection } from './observe-intersection.ts';
export { observeResize } from './observe-resize.ts';
export { watchMediaQuery } from './watch-media-query.ts';
export { watchPageVisibility } from './watch-page-visibility.ts';
export { whenIdle } from './when-idle.ts';
