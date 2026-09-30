import { randomTextSimple } from './random-text-simple';

describe(randomTextSimple, () => {
  it('has the requested length', () => {
    expect(randomTextSimple(30)).toHaveLength(30);
  });
});
