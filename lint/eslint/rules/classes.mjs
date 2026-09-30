// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Classes: Constructors, members, accessors, `this` and inheritance.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Classes rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function classesBlock() {
  return [
    {
      name: 'rules/classes',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'constructor-super': ['error'],
        'getter-return': ['error'],
        'no-class-assign': ['error'],
        'no-constructor-return': ['error'],
        'no-dupe-class-members': ['error'],
        'no-new-native-nonconstructor': ['error'],
        'no-setter-return': ['error'],
        'no-this-before-super': ['error'],
        'no-unused-private-class-members': ['error'],
        'accessor-pairs': ['info'],
        // Warn: a method may implement an interface without using `this`.
        'class-methods-use-this': ['warn'],
        'consistent-this': ['info'],
        'grouped-accessor-pairs': ['info'],
        // Warn: a size limit: a justified exception (a data table, a state machine) may pass.
        'max-classes-per-file': ['warn'],
        'no-empty-static-block': ['warn'],
        'no-extend-native': ['error'],
        'no-invalid-this': ['warn'],
        'no-new': ['warn'],
        'no-object-constructor': ['info'],
        'no-useless-constructor': ['info'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-built-in-override': ['off'],
        'sonarjs/new-operator-misuse': ['error'],
      },
    },
    {
      name: 'rules/classes/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'constructor-super': ['off'],
        'getter-return': ['off'],
        'no-class-assign': ['off'],
        'no-new-native-nonconstructor': ['off'],
        'no-setter-return': ['off'],
        'no-this-before-super': ['off'],
        '@typescript-eslint/class-literal-property-style': ['error'],
        // Replaced by the TS version.
        'class-methods-use-this': ['off'],
        // Warn: a method may implement an interface without using `this`.
        '@typescript-eslint/class-methods-use-this': ['warn'],
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/member-ordering': ['info'],
        // Replaced by the TS version.
        'no-dupe-class-members': ['off'],
        '@typescript-eslint/no-dupe-class-members': ['error'],
        '@typescript-eslint/no-extraneous-class': ['warn'],
        // Off: the core rule misreads `this:` parameters; the TS version is off by choice.
        'no-invalid-this': ['off'],
        '@typescript-eslint/no-invalid-this': ['off'],
        // Off: no-this-alias forbids aliasing `this` at all.
        'consistent-this': ['off'],
        '@typescript-eslint/no-this-alias': ['warn'],
        // Replaced by the TS version.
        'no-unused-private-class-members': ['off'],
        '@typescript-eslint/no-unused-private-class-members': ['error'],
        // Replaced by the TS version.
        'no-useless-constructor': ['off'],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/parameter-properties': ['error'],
        '@typescript-eslint/related-getter-setter-pairs': ['error'],
        '@typescript-eslint/unbound-method': ['error'],
      },
    },
  ];
}
