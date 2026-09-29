// Checks that the lint profiles enforce the Sonar way profile of SonarQube: every recommended SonarJS rule is
// on, or off only as a duplicate of a rule that is on (SonarQube still runs it, and the code already passes).

import fs from 'node:fs';
import path from 'node:path';
import { ESLint } from 'eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import { readRuleComments } from '../wiki/read-lint-blocks.mjs';

/** Files whose resolved config is checked: Angular code, and a spec of this repository. */
const SONAR_FILES = ['examples/design-system/src/atoms/button/button.component.ts', 'src/math/clamp.spec.ts'];
const DUPLICATE_PATTERN = /^Off: duplicate of (?<targets>.+)$/v;
const RULE_NAME_PATTERN = /[\w\-@]+(?:\/[\w\-]+)*/gv;

/** Core rules the TypeScript compiler checks (turned off by typescript-eslint), plus `noFallthroughCasesInSwitch`. */
const COMPILER_CHECKED = new Set([
  ...Object.keys(tseslint.configs.eslintRecommended.rules ?? {}),
  'no-fallthrough',
  'no-delete-var',
]);

/**
 * Reads the reason of every rule of the blocks of lint/eslint.
 *
 * @returns {Map<string, string>} The reasons, by rule.
 */
function readAllRuleComments() {
  const comments = new Map();
  const files = fs.readdirSync('lint/eslint', { recursive: true }).filter((file) => String(file).endsWith('.mjs'));
  for (const file of files) {
    const fileComments = readRuleComments(fs.readFileSync(path.join('lint/eslint', String(file)), 'utf8'));
    for (const [rule, comment] of fileComments) {
      comments.set(rule, comments.get(rule) ?? comment);
    }
  }
  return comments;
}

/**
 * Lists the rules of the Sonar way profile. The AWS rules only apply to AWS CDK code.
 *
 * @returns {string[]} The rule names.
 */
function listSonarWayRules() {
  return Object.entries(sonarjs.configs.recommended.rules)
    .filter(([rule, value]) => !['off', 0].includes([value].flat()[0]) && !rule.startsWith('sonarjs/aws-'))
    .map(([rule]) => rule);
}

/**
 * Tells whether a rule is checked for a file: on, checked by the compiler, or replaced by its TS version.
 *
 * @param {Record<string, unknown>} rules - The resolved rules of the file.
 * @param {string} rule - The rule name.
 * @returns {boolean} Whether the rule is checked.
 */
function isChecked(rules, rule) {
  if (COMPILER_CHECKED.has(rule)) {
    return true;
  }
  const value = rules[rule] ?? rules[`@typescript-eslint/${rule}`];
  return value !== undefined && ![0, 'off'].includes([value].flat()[0]);
}

/**
 * Tells whether a Sonar way rule that is off is covered for a file.
 *
 * @param {Record<string, unknown>} rules - The resolved rules of the file.
 * @param {string} file - The file.
 * @param {string} comment - The reason written above the rule.
 * @returns {boolean} Whether another rule, the compiler, or the scope of the Vitest block covers it.
 */
function isCovered(rules, file, comment) {
  const targets = (DUPLICATE_PATTERN.exec(comment)?.groups?.targets ?? '').match(RULE_NAME_PATTERN) ?? [];
  // The Vitest rules only apply to the specs; a compiler error needs no rule.
  const isTestRule = targets.some((name) => name.startsWith('vitest/')) && !file.endsWith('.spec.ts');
  return isTestRule || comment.includes('TypeScript compiler') || targets.some((name) => isChecked(rules, name));
}

/**
 * Checks that every rule of the Sonar way profile is checked on the sample files.
 *
 * @returns {Promise<string[]>} The failures.
 */
export async function checkSonarWay() {
  const comments = readAllRuleComments();
  const sonarWay = listSonarWayRules();
  const eslint = new ESLint();
  const configs = await Promise.all(SONAR_FILES.map((file) => eslint.calculateConfigForFile(file)));
  return SONAR_FILES.flatMap((file, index) => {
    const rules = configs[index]?.rules ?? {};
    return sonarWay
      .filter((rule) => !isChecked(rules, rule) && !isCovered(rules, file, comments.get(rule) ?? ''))
      .map((rule) => `${file}: the Sonar way rule ${rule} is off and no rule covers it`);
  });
}
