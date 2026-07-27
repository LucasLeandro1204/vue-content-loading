# Vue Content Loading

Tiny, accessible SVG content loaders for Vue 3. Build an exact skeleton with SVG shapes or use one of the included presets.

- Vue 3.5+, TypeScript declarations, ESM, CommonJS, and a browser build
- SSR- and hydration-safe IDs powered by Vue's `useId()`
- One lightweight SVG animation per loader, with reduced-motion support
- Responsive sizing, RTL, `<base>` URL support, opacity controls, and CSS colors
- Tree-shakable functional presets and no runtime dependency beyond the Vue peer

## Install

```bash
pnpm add vue-content-loading
```

Vue 2 applications should stay on `vue-content-loading@1.6.0`.

## Use a preset

```vue
<script setup lang="ts">
import { VclCard } from 'vue-content-loading';
</script>

<template>
  <VclCard width="100%" height="auto" />
</template>
```

Available presets are `VclFacebook`, `VclInstagram`, `VclCode`, `VclList`, `VclBulletList`, `VclTable`, `VclTwitch`, `VclText`, and `VclCard`.

## Build a custom loader

```vue
<script setup lang="ts">
import { VueContentLoading } from 'vue-content-loading';
</script>

<template>
  <VueContentLoading
    width="100%"
    height="auto"
    viewBox="0 0 320 96"
    primary="var(--skeleton-base, #e8eaed)"
    secondary="var(--skeleton-highlight, #f4f5f6)"
  >
    <circle cx="32" cy="32" r="32" />
    <rect x="80" y="14" width="210" height="14" rx="7" />
    <rect x="80" y="42" width="150" height="10" rx="5" />
    <rect x="0" y="80" width="280" height="10" rx="5" />
  </VueContentLoading>
</template>
```

`ContentLoader` is provided as a named alias of `VueContentLoading`; the default export remains `VueContentLoading`.

## Core props

| Prop                   | Type               | Default         | Purpose                                                      |
| ---------------------- | ------------------ | --------------- | ------------------------------------------------------------ |
| `width`                | `number \| string` | `400`           | Rendered SVG width                                           |
| `height`               | `number \| string` | `130`           | Rendered SVG height                                          |
| `viewBox`              | `string`           | derived         | SVG coordinate system                                        |
| `speed`                | `number`           | `2`             | Animation duration in seconds                                |
| `primary`              | `string`           | `#f0f0f0`       | Base color; any CSS color is accepted                        |
| `secondary`            | `string`           | `#e0e0e0`       | Highlight color                                              |
| `primaryOpacity`       | `number`           | `1`             | Base opacity from `0` to `1`                                 |
| `secondaryOpacity`     | `number`           | `1`             | Highlight opacity from `0` to `1`                            |
| `animate`              | `boolean`          | `true`          | Enables the shimmer                                          |
| `respectReducedMotion` | `boolean`          | `true`          | Stops animation for reduced-motion users                     |
| `rtl`                  | `boolean`          | `false`         | Mirrors the loader                                           |
| `uniqueKey`            | `string`           | Vue-generated   | Stable explicit ID for snapshots or shared markup            |
| `baseUrl`              | `string`           | `''`            | Prefix for fragment references when a document uses `<base>` |
| `ariaLabel`            | `string`           | none            | Gives the SVG an accessible name; otherwise it is decorative |
| `preserveAspectRatio`  | `string`           | `xMidYMid meet` | SVG aspect-ratio behavior                                    |
| `gradientRatio`        | `number`           | `2`             | Shimmer travel distance                                      |

Unknown attributes, classes, styles, and `data-*` attributes fall through to the root `<svg>`.

## Accessibility

Skeletons are decorative by default and render with `aria-hidden="true"`. Mark the region whose content is loading with `aria-busy`, then clear it when the real content arrives:

```vue
<section :aria-busy="loading">
  <VclText v-if="loading" />
  <ArticleBody v-else />
</section>
```

Set `ariaLabel` only when the loader itself must be announced. Animation automatically stops under `prefers-reduced-motion: reduce`; `:animate="false"` disables it unconditionally.

## Documentation

The complete guide covers [custom loaders](https://lucasleandro1204.github.io/vue-content-loading/guide/custom-loaders), [presets](https://lucasleandro1204.github.io/vue-content-loading/presets), [accessibility](https://lucasleandro1204.github.io/vue-content-loading/guide/accessibility), and the [v1 migration](https://lucasleandro1204.github.io/vue-content-loading/guide/migration).

## Development

Use Node 22.12 or newer for development and pnpm via Corepack. Node 20.19 remains supported and is exercised in CI.

```bash
corepack enable
pnpm install
pnpm verify
pnpm dev
```

`pnpm verify` checks Oxfmt, Oxlint, TypeScript, unit and SSR behavior, all distribution formats, package exports, declarations, and the VitePress documentation build.

## License

[MIT](./LICENSE) © Lucas Leandro
