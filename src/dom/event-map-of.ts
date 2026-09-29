/**
 * The events a target can emit, by name, for the common DOM targets; any `Event` for the others.
 *
 * @template T - The event target.
 */
export type EventMapOf<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : T extends SVGElement
        ? SVGElementEventMap
        : T extends MediaQueryList
          ? MediaQueryListEventMap
          : Record<string, Event>;
