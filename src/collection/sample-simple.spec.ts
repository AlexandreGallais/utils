import { sampleSimple } from './sample-simple.ts';

describe(sampleSimple, () => {
  it('picks an item', () => {
    expect(['a', 'b']).toContain(sampleSimple(['a', 'b']));
    expect(sampleSimple<string>([])).toBeUndefined();
  });
});
