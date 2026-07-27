# Development

## Requirements

- Node 22.12 or newer recommended; Node 20.19 is the minimum supported release
- pnpm 11 through Corepack

```bash
corepack enable
pnpm install
```

## Commands

| Command              | Purpose                                                   |
| -------------------- | --------------------------------------------------------- |
| `pnpm dev`           | Run the VitePress docs and component playground           |
| `pnpm test`          | Run unit, preset, and SSR tests with Vitest               |
| `pnpm typecheck`     | Type-check source, tests, config, docs, and Vue templates |
| `pnpm lint`          | Run type-aware Oxlint                                     |
| `pnpm format`        | Check formatting with Oxfmt                               |
| `pnpm build:lib`     | Build ESM, CommonJS, browser, maps, and declarations      |
| `pnpm package:check` | Validate packed types, runtime exports, and tree-shaking  |
| `pnpm docs:build`    | Build the static documentation site                       |
| `pnpm verify`        | Run the complete release gate                             |

## Module shape

`VueContentLoading` owns the SVG machinery. Presets are thin functional modules that supply shapes across the default-slot seam. Keep product-neutral behavior in the base loader, precise geometry in presets, and avoid adding dependencies for behavior the platform already provides.

## Release checklist

1. Run `pnpm verify` on a supported Node version.
2. Inspect `pnpm pack --dry-run` and the generated type declarations.
3. Test the tarball in a clean Vue application before publishing.
4. Publish intentionally; the repository does not publish from a local build command.
