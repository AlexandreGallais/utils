import { createStepPathSimple } from './create-step-path-simple';

describe(createStepPathSimple, () => {
  it('holds each value until the next point', () => {
    expect(
      createStepPathSimple([
        { x: 0, y: 10 },
        { x: 5, y: 0 },
      ]),
    ).toBe('M 0 10 H 5 V 0');
  });
});
