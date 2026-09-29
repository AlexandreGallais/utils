// Function wrappers: rate limiting for high-frequency sources, run once, memoization.

export { debounce } from './debounce.ts';
export { memoizeLast } from './memoize-last.ts';
export { once } from './once.ts';
export { rafThrottle } from './raf-throttle.ts';
export type { RateLimitedFunction } from './rate-limited-function.ts';
export { throttle } from './throttle.ts';
export { memoize } from './memoize.ts';
export type { MemoizedFunction } from './memoized-function.ts';
