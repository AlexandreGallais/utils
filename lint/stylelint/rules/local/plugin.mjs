// The Stylelint rules written here: the policy of the `stylelint-disable` comments, like the ESLint one. A rule set
// to `warning` may be disabled for one line, with a reason; a rule set to `error` cannot be disabled.

import stylelint from 'stylelint';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const RULE_NAME = 'local/disable-only-warnings';
/** The directives, by their first word. */
const DIRECTIVES = new Map([
  ['stylelint-disable', { kind: 'disable', scope: '' }],
  ['stylelint-disable-line', { kind: 'disable', scope: '-line' }],
  ['stylelint-disable-next-line', { kind: 'disable', scope: '-next-line' }],
  ['stylelint-enable', { kind: 'enable', scope: '' }],
]);
const WHITESPACE = /\s+/v;
const REASON_SEPARATOR = /\s--\s/v;

const messages = ruleMessages(RULE_NAME, {
  error: (rule) => `'${rule}' is an error: it cannot be disabled. Fix the code.`,
  unnamed: 'Name the rules to disable: `stylelint-disable-next-line <rule> -- <reason>`.',
  wide: 'Disable one line only: `stylelint-disable-next-line <rule> -- <reason>`.',
});

/**
 * Reads a disable comment: `stylelint-disable-next-line a, b -- reason`.
 *
 * @param {string} text - The text of the comment.
 * @returns {{ kind: string, scope: string, rest: string } | undefined} The directive, or `undefined` for another
 *   comment.
 */
function readDirective(text) {
  const [head = '', ...rest] = text.trim().split(WHITESPACE);
  const directive = DIRECTIVES.get(head);
  return directive === undefined ? undefined : { ...directive, rest: rest.join(' ') };
}

/**
 * Reads the severity of a rule in the resolved config.
 *
 * @param {unknown} value - The setting of the rule.
 * @param {string} defaultSeverity - The severity of a rule without its own.
 * @returns {string | undefined} `error` or `warning`, or `undefined` when the rule is off.
 */
function severityOf(value, defaultSeverity) {
  if (value === null || value === undefined) {
    return undefined;
  }
  const secondary = Array.isArray(value) ? value[1] : undefined;
  return secondary?.severity ?? defaultSeverity;
}

/**
 * Checks the `stylelint-disable` comments of a file.
 *
 * @param {boolean} primary - `true` to enable the rule.
 * @returns {import('stylelint').RuleBase} The rule.
 */
function disableOnlyWarnings(primary) {
  return (root, result) => {
    if (!validateOptions(result, RULE_NAME, { actual: primary })) {
      return;
    }
    const config = result.stylelint.config ?? {};
    const rules = config.rules ?? {};
    const defaultSeverity = config.defaultSeverity ?? 'error';
    root.walkComments((comment) => {
      const groups = readDirective(comment.text);
      if (groups === undefined || groups.kind === 'enable') {
        return;
      }
      if (groups.scope !== '-next-line') {
        report({ message: messages.wide, node: comment, result, ruleName: RULE_NAME });
      }
      const [names = ''] = groups.rest.split(REASON_SEPARATOR);
      const disabled = names
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name !== '');
      if (disabled.length === 0) {
        report({ message: messages.unnamed, node: comment, result, ruleName: RULE_NAME });
      }
      for (const name of disabled.filter((rule) => severityOf(rules[rule], defaultSeverity) === 'error')) {
        report({ message: messages.error(name), node: comment, result, ruleName: RULE_NAME });
      }
    });
  };
}

disableOnlyWarnings.ruleName = RULE_NAME;
disableOnlyWarnings.messages = messages;

/** The `local` Stylelint plugins, to list in `plugins`. */
const local = [createPlugin(RULE_NAME, disableOnlyWarnings)];

export default local;
