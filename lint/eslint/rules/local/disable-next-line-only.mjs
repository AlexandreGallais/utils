// A rule is disabled for one line only, with `// eslint-disable-next-line`: no `eslint-disable` for a block or
// a file, no `eslint-disable-line`, no `eslint-enable`, and no inline config (`/* eslint rule: off */`,
// `/* global */`, `/* exported */`, `/* eslint-env */`): the config files hold the settings.

const INLINE_CONFIG = /^\s*(?:eslint|eslint-env|exported|globals?)(?:\s|$)/v;

export default {
  meta: {
    type: 'problem',
    docs: { description: 'Allow only `eslint-disable-next-line` comments, and no inline config.' },
    schema: [],
    messages: {
      wide: 'Disable a rule for one line only, with `// eslint-disable-next-line <rule> -- <reason>`.',
      inlineConfig: 'Configure ESLint in the config file, not in a comment.',
    },
  },
  create(context) {
    const { sourceCode } = context;
    return {
      Program() {
        for (const directive of sourceCode.getDisableDirectives().directives) {
          if (directive.type !== 'disable-next-line') {
            context.report({ loc: directive.node.loc, messageId: 'wide' });
          }
        }
        for (const comment of sourceCode.getAllComments()) {
          if (comment.type === 'Block' && INLINE_CONFIG.test(comment.value)) {
            context.report({ loc: comment.loc, messageId: 'inlineConfig' });
          }
        }
      },
    };
  },
};
