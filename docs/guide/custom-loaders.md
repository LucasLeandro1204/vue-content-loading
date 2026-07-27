# Custom loaders

`VueContentLoading` has one primary seam: its default slot. Put ordinary SVG shapes in that slot; the loader owns IDs, clipping, gradients, animation, RTL, accessibility, and browser edge cases.

```vue
<script setup lang="ts">
import { VueContentLoading } from 'vue-content-loading';
</script>

<template>
  <VueContentLoading viewBox="0 0 400 120" width="100%" height="auto">
    <circle cx="48" cy="48" r="48" />
    <rect x="116" y="16" width="220" height="16" rx="8" />
    <rect x="116" y="48" width="160" height="12" rx="6" />
    <rect x="0" y="108" width="320" height="12" rx="6" />
  </VueContentLoading>
</template>
```

## SVG shape guidance

- Prefer `rect`, `circle`, `ellipse`, and simple `path` elements.
- Keep the `viewBox` aligned with the final layout's aspect ratio.
- Use stable geometry. Skeleton movement should come from the gradient, not the shapes.
- Keep loaders near the content they represent; a large generic page skeleton usually drifts from the real layout.

## Documents with a base URL

An HTML `<base>` element can change how SVG fragment references resolve. Prefix the references with the current path:

```vue
<VueContentLoading :base-url="$route.path" unique-key="account-card">
  <!-- shapes -->
</VueContentLoading>
```

## Snapshot tests

Vue-generated IDs are SSR-safe. Pass `uniqueKey` when a test requires deterministic markup independent of component order:

```vue
<VclTable unique-key="portfolio-table" />
```

Keys must be unique within a document.
