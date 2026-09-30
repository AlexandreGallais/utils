import { NavigationHistory } from './navigation-history';

describe(NavigationHistory, () => {
  let history: NavigationHistory<string>;

  beforeEach(() => {
    history = new NavigationHistory<string>(Infinity);
  });

  it('starts empty', () => {
    expect(history.current).toBeUndefined();
    expect(history.index).toBe(-1);
    expect(history.entries).toStrictEqual([]);
    expect([history.canGoBack, history.canGoForward]).toStrictEqual([false, false]);
    expect(history.back()).toBeUndefined();
  });

  it('pushes entries and moves back and forward', () => {
    history.push('home');
    history.push('engine');
    history.push('alarms');
    expect(history.back()).toBe('engine');
    expect(history.back()).toBe('home');
    expect(history.back()).toBeUndefined();
    expect(history.forward()).toBe('engine');
    expect(history.canGoForward).toBe(true);
  });

  it('drops the forward entries on push', () => {
    history.push('home');
    history.push('engine');
    history.push('alarms');
    history.back();
    history.push('radar');
    expect(history.entries).toStrictEqual(['home', 'engine', 'radar']);
    expect(history.canGoForward).toBe(false);
  });

  it('ignores a push of the current entry', () => {
    history.push('home');
    history.push('home');
    expect(history.entries).toStrictEqual(['home']);
  });

  it('moves by several entries', () => {
    history.push('a');
    history.push('b');
    history.push('c');
    expect(history.go(-2)).toBe('a');
    expect(history.go(5)).toBeUndefined();
    expect(history.go(0.5)).toBeUndefined();
    expect(history.current).toBe('a');
  });

  it('replaces the current entry', () => {
    expect(history.replace('login')).toBe('login');
    history.replace('home');
    history.push('engine');
    expect(history.entries).toStrictEqual(['home', 'engine']);
  });

  it('keeps the latest entries within maxSize', () => {
    const bounded = new NavigationHistory<number>(3);
    for (const view of [1, 2, 3, 4, 5]) {
      bounded.push(view);
    }
    expect(bounded.entries).toStrictEqual([3, 4, 5]);
    expect(bounded.index).toBe(2);
    expect(bounded.maxSize).toBe(3);
  });

  it('empties on clear', () => {
    history.push('home');
    history.clear();
    expect(history.current).toBeUndefined();
    expect(history.index).toBe(-1);
  });

  it.for([0, -1, 1.5, NaN])('throws a RangeError for maxSize %s', (maxSize) => {
    expect(() => new NavigationHistory(maxSize)).toThrow(RangeError);
  });
});
