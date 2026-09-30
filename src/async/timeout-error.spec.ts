import { TimeoutError } from './timeout-error';

describe(TimeoutError, () => {
  it('is named TimeoutError', () => {
    const error = new TimeoutError('Too slow');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('TimeoutError');
  });
});
