// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// eslint-plugin-regexp: every rule is listed. Preset rules are errors (warnings count as errors anyway); the others are commented.

import regexp from 'eslint-plugin-regexp';
import { CODE_FILES } from './files.mjs';

/**
 * Regular expression rules (eslint-plugin-regexp), for any project.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function regexpBlock() {
  return [
    {
      name: 'regexp',
      files: CODE_FILES,
      plugins: {
        regexp,
      },
      rules: {
        'regexp/confusing-quantifier': ['error'],
        'regexp/control-character-escape': ['error'],
        // Custom.
        'regexp/grapheme-string-literal': ['error'],
        // Custom.
        'regexp/hexadecimal-escape': ['error'],
        // Custom.
        'regexp/letter-case': ['error'],
        'regexp/match-any': ['error'],
        'regexp/negation': ['error'],
        'regexp/no-contradiction-with-assertion': ['error'],
        // Custom.
        'regexp/no-control-character': ['error'],
        'regexp/no-dupe-characters-character-class': ['error'],
        'regexp/no-dupe-disjunctions': ['error'],
        'regexp/no-empty-alternative': ['error'],
        'regexp/no-empty-capturing-group': ['error'],
        'regexp/no-empty-character-class': ['error'],
        'regexp/no-empty-group': ['error'],
        'regexp/no-empty-lookarounds-assertion': ['error'],
        'regexp/no-empty-string-literal': ['error'],
        'regexp/no-escape-backspace': ['error'],
        'regexp/no-extra-lookaround-assertions': ['error'],
        'regexp/no-invalid-regexp': ['error'],
        'regexp/no-invisible-character': ['error'],
        'regexp/no-lazy-ends': ['error'],
        'regexp/no-legacy-features': ['error'],
        'regexp/no-misleading-capturing-group': ['error'],
        'regexp/no-misleading-unicode-character': ['error'],
        'regexp/no-missing-g-flag': ['error'],
        'regexp/no-non-standard-flag': ['error'],
        'regexp/no-obscure-range': ['error'],
        // Custom.
        'regexp/no-octal': ['error'],
        'regexp/no-optional-assertion': ['error'],
        'regexp/no-potentially-useless-backreference': ['error'],
        // Custom.
        'regexp/no-standalone-backslash': ['error'],
        'regexp/no-super-linear-backtracking': ['error'],
        // Custom: no quadratic scans on long inputs.
        'regexp/no-super-linear-move': ['error'],
        'regexp/no-trivially-nested-assertion': ['error'],
        'regexp/no-trivially-nested-quantifier': ['error'],
        'regexp/no-unused-capturing-group': ['error'],
        'regexp/no-useless-assertions': ['error'],
        'regexp/no-useless-backreference': ['error'],
        'regexp/no-useless-character-class': ['error'],
        'regexp/no-useless-dollar-replacements': ['error'],
        'regexp/no-useless-escape': ['error'],
        'regexp/no-useless-flag': ['error'],
        'regexp/no-useless-lazy': ['error'],
        'regexp/no-useless-non-capturing-group': ['error'],
        'regexp/no-useless-quantifier': ['error'],
        'regexp/no-useless-range': ['error'],
        'regexp/no-useless-set-operand': ['error'],
        'regexp/no-useless-string-literal': ['error'],
        'regexp/no-useless-two-nums-quantifier': ['error'],
        'regexp/no-zero-quantifier': ['error'],
        'regexp/optimal-lookaround-quantifier': ['error'],
        'regexp/optimal-quantifier-concatenation': ['error'],
        'regexp/prefer-character-class': ['error'],
        'regexp/prefer-d': ['error'],
        // Custom.
        'regexp/prefer-escape-replacement-dollar-char': ['error'],
        // Custom.
        'regexp/prefer-lookaround': ['error'],
        // Custom.
        'regexp/prefer-named-backreference': ['error'],
        // Custom: groups are read by name.
        'regexp/prefer-named-capture-group': ['error'],
        // Custom.
        'regexp/prefer-named-replacement': ['error'],
        'regexp/prefer-plus-quantifier': ['error'],
        'regexp/prefer-predefined-assertion': ['error'],
        // Custom.
        'regexp/prefer-quantifier': ['error'],
        'regexp/prefer-question-quantifier': ['error'],
        'regexp/prefer-range': ['error'],
        // Off: duplicate of @typescript-eslint/prefer-regexp-exec.
        'regexp/prefer-regexp-exec': ['off'],
        // Custom.
        'regexp/prefer-regexp-test': ['error'],
        // Custom.
        'regexp/prefer-result-array-groups': ['error'],
        'regexp/prefer-set-operation': ['error'],
        'regexp/prefer-star-quantifier': ['error'],
        'regexp/prefer-unicode-codepoint-escapes': ['error'],
        'regexp/prefer-w': ['error'],
        // Off: require-unicode-sets-regexp asks for the stricter `v` flag.
        'regexp/require-unicode-regexp': ['off'],
        // Custom: `v` flag (ES2024) on every regular expression.
        'regexp/require-unicode-sets-regexp': ['error'],
        'regexp/simplify-set-operations': ['error'],
        // Custom.
        'regexp/sort-alternatives': ['error'],
        // Custom.
        'regexp/sort-character-class-elements': ['error'],
        'regexp/sort-flags': ['error'],
        'regexp/strict': ['error'],
        // Custom.
        'regexp/unicode-escape': ['error'],
        // Custom.
        'regexp/unicode-property': ['error'],
        'regexp/use-ignore-case': ['error'],
      },
    },
  ];
}
