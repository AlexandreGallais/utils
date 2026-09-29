/** The modifier names accepted in a shortcut, and the event flag each one reads. */
const MODIFIERS = {
  alt: 'altKey',
  ctrl: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
} as const satisfies Readonly<Record<string, keyof KeyboardEvent>>;

/**
 * Checks whether a keyboard event is a given shortcut, written like `'Ctrl+Shift+K'`, `'Alt+ArrowUp'` or
 * `'Escape'`: the key (`event.key`, case-insensitive) and exactly the listed modifiers (`Ctrl+K` does not
 * match `Ctrl+Shift+K`).
 *
 * @param event - The keyboard event, or any object with its `key` and modifier flags.
 * @param shortcut - Modifiers (`Ctrl`, `Shift`, `Alt`, `Meta`) and a key, joined by `+`; `'Ctrl++'` for the
 * plus key.
 * @returns `true` when the event is the shortcut.
 * @example
 * listen(window, 'keydown', (event) => {
 *   if (matchesShortcut(event, 'Ctrl+Z')) undo();
 * });
 */
export function matchesShortcut(
  event: Readonly<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>>,
  shortcut: string,
): boolean {
  const parts = shortcut.toLowerCase().split(/\+(?!$)/v);
  const key = parts.pop();
  const modifiers = new Set(parts);
  for (const [name, flag] of Object.entries(MODIFIERS)) {
    if (event[flag] !== modifiers.has(name)) {
      return false;
    }
  }
  return event.key.toLowerCase() === key;
}
