import { createEmitter } from './create-emitter';

interface Events extends Record<string, unknown> {
  alarm: { id: string };
  reset: undefined;
  toString: number;
}

describe(createEmitter, () => {
  it('calls the listeners of an event with its payload', () => {
    const events = createEmitter<Events>();
    const first = vi.fn<(payload: { id: string }) => void>();
    const second = vi.fn<(payload: { id: string }) => void>();
    events.on('alarm', first);
    events.on('alarm', second);
    events.emit('alarm', { id: 'P-12' });
    expect(first).toHaveBeenCalledExactlyOnceWith({ id: 'P-12' });
    expect(second).toHaveBeenCalledOnce();
  });

  it('removes a listener', () => {
    const events = createEmitter<Events>();
    const listener = vi.fn<(payload: undefined) => void>();
    const off = events.on('reset', listener);
    off();
    events.emit('reset', undefined);
    expect(listener).not.toHaveBeenCalled();
  });

  it('calls a once listener at the next emission only', () => {
    const events = createEmitter<Events>();
    const listener = vi.fn<(payload: { id: string }) => void>();
    events.once('alarm', listener);
    events.emit('alarm', { id: 'a' });
    events.emit('alarm', { id: 'b' });
    expect(listener).toHaveBeenCalledExactlyOnceWith({ id: 'a' });
  });

  it('ignores events without listener, even named like a prototype member', () => {
    const events = createEmitter<Events>();
    expect(() => {
      events.emit('toString', 1);
    }).not.toThrow();
  });

  it('clears one event or every event', () => {
    const events = createEmitter<Events>();
    const alarm = vi.fn<(payload: { id: string }) => void>();
    const reset = vi.fn<(payload: undefined) => void>();
    events.on('alarm', alarm);
    events.on('reset', reset);
    events.clear('alarm');
    events.emit('alarm', { id: 'a' });
    events.emit('reset', undefined);
    events.clear();
    events.emit('reset', undefined);
    expect(alarm).not.toHaveBeenCalled();
    expect(reset).toHaveBeenCalledOnce();
  });
});
