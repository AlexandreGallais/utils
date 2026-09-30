import { debounce } from './debounce';

describe(debounce, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs once the calls stop, with the latest arguments', () => {
    const callback = vi.fn<(value: string) => void>();
    const debounced = debounce(callback, 100);
    debounced('a');
    vi.advanceTimersByTime(50);
    debounced('b');
    vi.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledExactlyOnceWith('b');
  });

  it('drops the pending call on cancel', () => {
    const callback = vi.fn<(value: string) => void>();
    const debounced = debounce(callback, 100);
    debounced('a');
    debounced.cancel();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the pending call on flush, once', () => {
    const callback = vi.fn<(value: string) => void>();
    const debounced = debounce(callback, 100);
    debounced('a');
    debounced.flush();
    debounced.flush();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledExactlyOnceWith('a');
  });
});
