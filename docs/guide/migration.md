# Migrate from v1

Version 2 is a Vue 3 and TypeScript rewrite. It preserves the package name, the default export, the `VueContentLoading` name, existing `Vcl*` preset names, and the core `rtl`, `speed`, `width`, `height`, `primary`, and `secondary` props.

## Requirements

- Upgrade the application to Vue 3.5 or newer.
- Remove Vue 2 global plugin registration; import loaders where they are used.
- Replace any checked-in v1 bundle references with package imports.

```diff
- import Vue from 'vue';
- import VueContentLoading from 'vue-content-loading';
- Vue.component('VueContentLoading', VueContentLoading);
+ import { VueContentLoading } from 'vue-content-loading';
```

## Sizing

Version 2 writes `width` and `height` to the root SVG. Presets also use an explicit `viewBox`. For fluid layouts, opt in clearly:

```vue
<VclFacebook width="100%" height="auto" />
```

## IDs and SSR

Random IDs are gone. Vue's `useId()` supplies hydration-safe IDs, and `uniqueKey` gives snapshots an explicit stable value. The legacy `_id` prop still works but is deprecated.

## Colors

The old HEX-only validator is gone. `primary` and `secondary` now accept all CSS colors, including variables, `rgb()`, `hsl()`, and `oklch()`.

## Fixed preset behavior

- `VclBulletList` now renders exactly `rows` items instead of one extra item.
- `VclTable` now supports numeric column counts and weighted column arrays correctly.
- `VclTable`'s `header` prop now controls a real header row.
- `VclCard` and `VclText` cover common modern card and content layouts.
