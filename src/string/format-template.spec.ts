import { formatTemplate } from './format-template';

describe(formatTemplate, () => {
  it('replaces the placeholders', () => {
    expect(formatTemplate('Heading {heading}°, speed {speed} kn', { heading: 270, speed: 12.5 })).toBe(
      'Heading 270°, speed 12.5 kn',
    );
    expect(formatTemplate('{a}{a}{b}', { a: 'x', b: true })).toBe('xxtrue');
  });

  it('keeps the placeholders without a value', () => {
    expect(formatTemplate('Hello {name}', {})).toBe('Hello {name}');
    expect(formatTemplate('Hello {name}', { name: undefined })).toBe('Hello {name}');
    expect(formatTemplate('{toString}', {})).toBe('{toString}');
  });

  it('accepts dotted keys and ignores malformed placeholders', () => {
    expect(formatTemplate('{user.name} { } {}', { 'user.name': 'Ada' })).toBe('Ada { } {}');
  });
});
