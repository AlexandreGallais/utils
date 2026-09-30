import { interpolate } from './interpolate';

describe(interpolate, () => {
  it('replaces the placeholders', () => {
    expect(interpolate('Heading {heading}°, speed {speed} kn', { heading: 270, speed: 12.5 })).toBe(
      'Heading 270°, speed 12.5 kn',
    );
    expect(interpolate('{a}{a}{b}', { a: 'x', b: true })).toBe('xxtrue');
  });

  it('keeps the placeholders without a value', () => {
    expect(interpolate('Hello {name}', {})).toBe('Hello {name}');
    expect(interpolate('Hello {name}', { name: undefined })).toBe('Hello {name}');
    expect(interpolate('{toString}', {})).toBe('{toString}');
  });

  it('accepts dotted keys and ignores malformed placeholders', () => {
    expect(interpolate('{user.name} { } {}', { 'user.name': 'Ada' })).toBe('Ada { } {}');
  });
});
