// Stylelint rule: cascade layers only from the list declared by the design system, so that no file creates a
// layer outside the agreed order (`@layer reset, tokens, base, layout, components, utilities, overrides;`).

import stylelint from 'stylelint';

const RULE_NAME = 'design-system/layer-name-allowed-list';
const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  rejected: (name) => `Unexpected layer "${name}": use a layer of the design system order`,
});

/**
 * Checks the names of `@layer` statements and blocks.
 *
 * @param {string[]} allowedNames - The layer names of the design system, such as `['reset', 'tokens', 'base']`.
 * @returns {import('stylelint').Rule} The rule.
 */
function rule(allowedNames) {
  return (root, result) => {
    const isValid = stylelint.utils.validateOptions(result, RULE_NAME, {
      actual: allowedNames,
      possible: [(value) => typeof value === 'string'],
    });
    if (!isValid) {
      return;
    }
    root.walkAtRules('layer', (atRule) => {
      // `@layer a, b;` declares an order, `@layer a { … }` fills a layer; sub-layers are `a.b`.
      for (const part of atRule.params.split(',')) {
        const [name = ''] = part.trim().split('.', 1);
        if (name !== '' && !allowedNames.includes(name)) {
          stylelint.utils.report({ result, ruleName: RULE_NAME, message: messages.rejected(name), node: atRule });
        }
      }
    });
  };
}

rule.ruleName = RULE_NAME;
rule.messages = messages;

export default stylelint.createPlugin(RULE_NAME, rule);
