import { matchesShortcut } from './matches-shortcut.ts';

function keyEvent(
  key: string,
  modifiers: { alt?: boolean; ctrl?: boolean; meta?: boolean; shift?: boolean } = {},
): {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
} {
  return {
    key,
    altKey: modifiers.alt ?? false,
    ctrlKey: modifiers.ctrl ?? false,
    metaKey: modifiers.meta ?? false,
    shiftKey: modifiers.shift ?? false,
  };
}

describe(matchesShortcut, () => {
  it.for([
    { event: keyEvent('z', { ctrl: true }), shortcut: 'Ctrl+Z', expected: true },
    { event: keyEvent('K', { ctrl: true, shift: true }), shortcut: 'ctrl+shift+k', expected: true },
    { event: keyEvent('Escape'), shortcut: 'Escape', expected: true },
    { event: keyEvent('ArrowUp', { alt: true }), shortcut: 'Alt+ArrowUp', expected: true },
    { event: keyEvent('+', { ctrl: true }), shortcut: 'Ctrl++', expected: true },
    { event: keyEvent('s', { meta: true }), shortcut: 'Meta+S', expected: true },
  ])('matches $shortcut', ({ event, shortcut, expected }) => {
    expect(matchesShortcut(event, shortcut)).toBe(expected);
  });

  it.for([
    { event: keyEvent('k', { ctrl: true }), shortcut: 'Ctrl+Shift+K' },
    { event: keyEvent('k', { ctrl: true, shift: true }), shortcut: 'Ctrl+K' },
    { event: keyEvent('y', { ctrl: true }), shortcut: 'Ctrl+Z' },
    { event: keyEvent('Escape', { alt: true }), shortcut: 'Escape' },
  ])('does not match $shortcut', ({ event, shortcut }) => {
    expect(matchesShortcut(event, shortcut)).toBe(false);
  });
});
