# Getting started

## Install

```bash
pnpm add vue-content-loading
```

The package requires Vue 3.5 or newer. Nuxt applications do not need a client-only wrapper: IDs are stable across server rendering and hydration.

## Import only what you use

```vue
<script setup lang="ts">
import { VclCard, VclText } from 'vue-content-loading';
</script>

<template>
  <VclCard />
  <VclText :rows="3" />
</template>
```

Every preset is a named ESM export so modern bundlers can remove unused loaders.

## Responsive loaders

Presets have a fixed coordinate system but can scale to their container:

```vue
<VclCard width="100%" height="auto" />
```

For custom loaders, set a `viewBox` describing your SVG coordinates and use CSS-compatible `width` and `height` values for rendering.

## Colors

Any valid CSS color works, including custom properties and modern color functions:

```vue
<VclText
  primary="var(--skeleton-base, oklch(92% 0.01 250))"
  secondary="var(--skeleton-highlight, oklch(97% 0.005 250))"
/>
```

Use `primaryOpacity` and `secondaryOpacity` instead of alpha colors when supporting Safari versions with SVG alpha-color quirks.

## Browser build

The package exposes `dist/index.global.js` for direct script usage. Load Vue first; exports are available on `window.VueContentLoading`. Bundled applications should prefer ESM imports.
