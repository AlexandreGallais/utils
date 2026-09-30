import type { DragHandlers } from './track-pointer-drag';
import { createFake } from './testing';
import { trackPointerDrag } from './track-pointer-drag';

interface FakeElement extends EventTarget {
  captured: Set<number>;
}

function createElement(): FakeElement {
  const captured = new Set<number>();
  return Object.assign(new EventTarget(), {
    captured,
    setPointerCapture: (id: number): void => {
      captured.add(id);
    },
    hasPointerCapture: (id: number): boolean => captured.has(id),
    releasePointerCapture: (id: number): void => {
      captured.delete(id);
    },
  });
}

function pointer(element: EventTarget, type: string, clientX: number, clientY: number, options = {}): void {
  element.dispatchEvent(Object.assign(new Event(type), { pointerId: 1, button: 0, clientX, clientY, ...options }));
}

function track(element: FakeElement, handlers: DragHandlers): () => void {
  return trackPointerDrag(createFake<HTMLElement>(element), handlers);
}

describe(trackPointerDrag, () => {
  it('reports the distance from the press, with the pointer captured', () => {
    const element = createElement();
    const onMove = vi.fn<(deltaX: number, deltaY: number) => void>();
    const onEnd = vi.fn<(deltaX: number, deltaY: number) => void>();
    track(element, { onMove, onEnd });
    pointer(element, 'pointerdown', 100, 50);
    expect(element.captured).toStrictEqual(new Set([1]));
    pointer(element, 'pointermove', 110, 45);
    pointer(element, 'pointerup', 120, 60);
    expect(onMove.mock.calls).toStrictEqual([[10, -5, expect.any(Event)]]);
    expect(onEnd.mock.calls).toStrictEqual([[20, 10, expect.any(Event)]]);
  });

  it('ignores other buttons, other pointers and moves without press', () => {
    const element = createElement();
    const onMove = vi.fn<(deltaX: number, deltaY: number) => void>();
    track(element, { onMove });
    pointer(element, 'pointermove', 1, 1);
    pointer(element, 'pointerdown', 0, 0, { button: 2 });
    pointer(element, 'pointerdown', 0, 0);
    pointer(element, 'pointerdown', 0, 0, { pointerId: 2 });
    pointer(element, 'pointermove', 5, 5, { pointerId: 2 });
    pointer(element, 'pointerup', 5, 5, { pointerId: 2 });
    expect(onMove).not.toHaveBeenCalled();
  });

  it('starts only when allowed, and ends on cancel', () => {
    const element = createElement();
    const onStart = vi.fn<(event: PointerEvent) => void>();
    const onEnd = vi.fn<(deltaX: number, deltaY: number, event: PointerEvent) => void>();
    let isAllowed = false;
    track(element, { canStart: () => isAllowed, onStart, onMove: vi.fn<() => void>(), onEnd });
    pointer(element, 'pointerdown', 0, 0);
    expect(onStart).not.toHaveBeenCalled();
    isAllowed = true;
    pointer(element, 'pointerdown', 0, 0);
    element.captured.clear();
    pointer(element, 'pointercancel', 3, 4);
    expect(onStart).toHaveBeenCalledOnce();
    expect(onEnd.mock.calls[0]?.[2].type).toBe('pointercancel');
  });

  it('stops listening after cleanup', () => {
    const element = createElement();
    const onMove = vi.fn<(deltaX: number, deltaY: number) => void>();
    const stop = track(element, { onMove });
    pointer(element, 'pointerdown', 0, 0);
    stop();
    pointer(element, 'pointermove', 5, 5);
    expect(onMove).not.toHaveBeenCalled();
  });
});
