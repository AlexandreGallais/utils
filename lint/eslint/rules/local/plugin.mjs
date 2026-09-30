// The rules of this repository, written by hand where no plugin does what the presets need: file names, one
// function or class per file, imports of folders, and the policy of the `eslint-disable` comments (only
// warnings, with a reason).

import disableNextLineOnly from './disable-next-line-only.mjs';
import disableOnlyWarnings from './disable-only-warnings.mjs';
import disableReason from './disable-reason.mjs';
import exportMatchesFilename from './export-matches-filename.mjs';
import importFolders from './import-folders.mjs';
import kebabCasePath from './kebab-case-path.mjs';

/** The `local` plugin: register it as `plugins: { local }` and name its rules `local/<rule>`. */
const local = {
  meta: { name: 'local' },
  rules: {
    'disable-next-line-only': disableNextLineOnly,
    'disable-only-warnings': disableOnlyWarnings,
    'disable-reason': disableReason,
    'export-matches-filename': exportMatchesFilename,
    'import-folders': importFolders,
    'kebab-case-path': kebabCasePath,
  },
};

export default local;
