import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';

import * as Vue from 'vue';

const expectedExports = [
  'ContentLoader',
  'VclBulletList',
  'VclCard',
  'VclCode',
  'VclFacebook',
  'VclInstagram',
  'VclList',
  'VclTable',
  'VclText',
  'VclTwitch',
  'VueContentLoading',
  'default',
];
const require = createRequire(import.meta.url);
const esm = await import(new URL('../dist/index.js', import.meta.url));
const commonJs = require('../dist/index.cjs');
const browserCode = await readFile(new URL('../dist/index.global.js', import.meta.url), 'utf8');
const browserContext = { Vue };
runInNewContext(browserCode, browserContext);
const browser = browserContext.VueContentLoading;

for (const [format, module] of Object.entries({ esm, commonJs, browser })) {
  const actualExports = Object.keys(module).sort();
  if (JSON.stringify(actualExports) !== JSON.stringify(expectedExports)) {
    throw new Error(`${format} exports ${actualExports.join(', ')} instead of the public API.`);
  }
  if (
    module.default !== module.VueContentLoading ||
    module.ContentLoader !== module.VueContentLoading
  ) {
    throw new Error(`${format} does not preserve the default or ContentLoader alias identity.`);
  }
}

console.log('ESM, CommonJS, and browser exports loaded successfully.');
