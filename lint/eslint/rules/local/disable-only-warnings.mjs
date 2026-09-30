// An `eslint-disable` comment names its rules, and only rules set to `warn`: an `error` cannot be disabled, the
// code is fixed instead. The severity of each rule comes from the resolved config of the file, mirrored in
// `settings.local.ruleSeverities` by lint/eslint/setup/rule-severities.mjs (the presets do it).

const ERROR = 2;

export default {
  meta: {
    type: 'problem',
    docs: { description: 'Allow `eslint-disable` comments only for rules set to `warn`.' },
    schema: [],
    messages: {
      unnamed: 'Name the rules to disable: `eslint-disable-next-line <rule> -- <reason>`.',
      error: "'{{rule}}' is an error: it cannot be disabled. Fix the code.",
    },
  },
  create(context) {
    const severities = context.settings.local?.ruleSeverities ?? {};
    return {
      Program() {
        const { directives } = context.sourceCode.getDisableDirectives();
        for (const directive of directives.filter(({ type }) => type !== 'enable')) {
          const rules = directive.value
            .split(',')
            .map((rule) => rule.trim())
            .filter((rule) => rule !== '');
          if (rules.length === 0) {
            context.report({ loc: directive.node.loc, messageId: 'unnamed' });
          }
          for (const rule of rules.filter((name) => severities[name] === ERROR)) {
            context.report({ loc: directive.node.loc, messageId: 'error', data: { rule } });
          }
        }
      },
    };
  },
};
