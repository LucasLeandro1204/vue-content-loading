import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distributionDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

const copyDeclarations = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return copyDeclarations(path);
      if (entry.name.endsWith('.d.ts') && extname(entry.name) === '.ts') {
        const declaration = await readFile(path, 'utf8');
        const commonJsDeclaration = declaration.replaceAll(
          /(['"])(\.\.?\/[^'"]+)\.js\1/g,
          (_, quote, specifier) => `${quote}${specifier}.cjs${quote}`,
        );
        await writeFile(path.replace(/\.d\.ts$/, '.d.cts'), commonJsDeclaration);
      }
    }),
  );
};

await copyDeclarations(distributionDirectory);
