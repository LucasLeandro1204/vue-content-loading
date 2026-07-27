import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const destination = new URL('node_modules/.cache/package-check/', root);
await mkdir(destination, { recursive: true });

const pack = spawnSync('pnpm', ['pack', '--pack-destination', destination.pathname], {
  cwd: root,
  stdio: 'inherit',
});
if (pack.status !== 0) process.exit(pack.status ?? 1);

const filename = `${packageJson.name.replace('@', '').replace('/', '-')}-${packageJson.version}.tgz`;
const tarball = join(destination.pathname, filename);
const check = spawnSync('attw', [tarball], {
  cwd: root,
  stdio: 'inherit',
});
process.exit(check.status ?? 1);
