// An `eslint-disable` comment says why after `--`: `// eslint-disable-next-line no-console -- CLI output.`.

export default {
  meta: {
    type: 'suggestion',
    docs: { description: 'Require a reason after `--` in `eslint-disable` comments.' },
    schema: [],
    messages: {
      missing: 'Say why the rule does not apply here: `eslint-disable-next-line <rule> -- <reason>`.',
    },
  },
  create(context) {
    return {
      Program() {
        for (const directive of context.sourceCode.getDisableDirectives().directives) {
          if (directive.type !== 'enable' && directive.justification.trim() === '') {
            context.report({ loc: directive.node.loc, messageId: 'missing' });
          }
        }
      },
    };
  },
};
