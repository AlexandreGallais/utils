/**
 * Reads the type of the first parameter of a function, such as the event of a handler.
 *
 * @template F - The function type.
 * @example
 * type Event = FirstParameter<typeof onResize>; // ResizeObserverEntry
 */
export type FirstParameter<F extends (...arguments_: readonly never[]) => unknown> = Parameters<F>[0];
