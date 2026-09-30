import { sampleSimple } from './sample-simple';

describe(sampleSimple, () => {
  it('picks an item', () => {
    expect(['a', 'b']).toContain(sampleSimple(['a', 'b']));
    expect(sampleSimple<string>([])).toBeUndefined();
  });
});
