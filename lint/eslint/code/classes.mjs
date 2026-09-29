// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Classes: Constructors, members, accessors, `this` and inheritance.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/classes',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
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
        'accessor-pairs': ['error'],
        'class-methods-use-this': ['error'],
        'consistent-this': ['error'],
        'grouped-accessor-pairs': ['error'],
        'max-classes-per-file': ['error'],
        'no-empty-static-block': ['error'],
        'no-extend-native': ['error'],
        'no-invalid-this': ['error'],
        'no-new': ['error'],
        'no-object-constructor': ['error'],
        'no-useless-constructor': ['error'],
        // ---- SonarJS ----
        'sonarjs/no-built-in-override': ['error'],
        'sonarjs/new-operator-misuse': ['error'],
        // ---- Unicorn ----
        'unicorn/class-reference-in-static-methods': ['error'],
        // Off: duplicate of @typescript-eslint/member-ordering.
        'unicorn/consistent-class-member-order': ['off'],
        'unicorn/no-accessor-recursion': ['error'],
        'unicorn/no-instanceof-builtins': ['error'],
        'unicorn/no-shorthand-property-overrides': ['error'],
        // Off: duplicate of @typescript-eslint/no-extraneous-class.
        'unicorn/no-static-only-class': ['off'],
        // Off: duplicate of @typescript-eslint/no-this-alias.
        'unicorn/no-this-assignment': ['off'],
        'unicorn/no-this-outside-of-class': ['error'],
        'unicorn/no-uncalled-method': ['error'],
        'unicorn/no-undeclared-class-members': ['error'],
        // Off: duplicate of sonarjs/no-ignored-return.
        'unicorn/no-unused-builtin-method-return': ['off'],
        'unicorn/no-useless-override': ['error'],
        'unicorn/prefer-class-fields': ['error'],
        'unicorn/prefer-private-class-fields': ['error'],
        'unicorn/prefer-short-arrow-method': ['off'],
      },
    },
    {
      name: 'code/classes/typescript',
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
        '@typescript-eslint/class-methods-use-this': ['error'],
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/member-ordering': ['error'],
        // Replaced by the TS version.
        'no-dupe-class-members': ['off'],
        '@typescript-eslint/no-dupe-class-members': ['error'],
        '@typescript-eslint/no-extraneous-class': ['error'],
        // Off: the core rule misreads `this:` parameters; the TS version is off by choice.
        'no-invalid-this': ['off'],
        '@typescript-eslint/no-invalid-this': ['off'],
        // Off: no-this-alias forbids aliasing `this` at all.
        'consistent-this': ['off'],
        '@typescript-eslint/no-this-alias': ['error'],
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
