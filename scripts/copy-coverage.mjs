// Copies the HTML coverage report into the built wiki, served at /coverage/.

import fs from 'node:fs';

const COVERAGE_DIRECTORY = 'coverage';
const TARGET_DIRECTORY = 'docs/.vitepress/dist/coverage';

fs.cpSync(COVERAGE_DIRECTORY, TARGET_DIRECTORY, { recursive: true });
console.info(`${COVERAGE_DIRECTORY} copied to ${TARGET_DIRECTORY}.`);
