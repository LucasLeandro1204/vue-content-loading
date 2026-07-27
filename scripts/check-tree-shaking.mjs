import { build } from 'vite';

const virtualModuleId = 'virtual:vue-content-loading-consumer';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const presetExportNames = [
  'VclBulletList',
  'VclCard',
  'VclCode',
  'VclFacebook',
  'VclInstagram',
  'VclList',
  'VclTable',
  'VclText',
  'VclTwitch',
];

const result = await build({
  configFile: false,
  logLevel: 'silent',
  root: new URL('../', import.meta.url).pathname,
  plugins: [
    {
      name: 'vue-content-loading-consumer',
      resolveId(id) {
        if (id === virtualModuleId) return resolvedVirtualModuleId;
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return "import { VueContentLoading } from 'vue-content-loading'; globalThis.Loader = VueContentLoading;";
        }
      },
    },
  ],
  build: {
    minify: false,
    rolldownOptions: {
      input: virtualModuleId,
      external: ['vue'],
      output: {
        format: 'es',
      },
    },
    write: false,
  },
});

const outputs = Array.isArray(result)
  ? result.flatMap((buildResult) => buildResult.output)
  : result.output;
const code = outputs
  .filter((output) => output.type === 'chunk')
  .map((output) => output.code)
  .join('\n');
const retainedPresets = presetExportNames.filter((name) => code.includes(name));

if (!code.includes('VueContentLoading')) {
  throw new Error('The consumer bundle did not retain the imported base loader.');
}

if (retainedPresets.length > 0) {
  throw new Error(`Unused presets remained in the consumer bundle: ${retainedPresets.join(', ')}`);
}

console.log(`Consumer tree-shaking passed (${Buffer.byteLength(code)} byte unminified bundle).`);
