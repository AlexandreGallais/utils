import { formatDuration } from './format-duration';
import { formatDurationSimple } from './format-duration-simple';

describe(formatDurationSimple, () => {
  it('formats to the whole second', () => {
    expect(formatDurationSimple(3_725_400)).toBe(formatDuration(3_725_400, 0));
  });
});
