---
layout: home

hero:
  name: Vue Content Loading
  text: Precise skeletons. Tiny Vue surface.
  tagline: Accessible, SSR-safe SVG content loaders for Vue 3, with modern presets and no CSS dependency.
  image:
    src: /logo.svg
    alt: Vue Content Loading
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Browse presets
      link: /presets

features:
  - title: Fast by construction
    details: Functional presets, one SVG animation, stable computed values, and tree-shakable exports.
  - title: Modern Vue
    details: Vue 3.5, TypeScript declarations, SSR-safe useId, Vite 8, Vitest, Oxlint, and Oxfmt.
  - title: Respectful defaults
    details: Decorative accessibility semantics and automatic reduced-motion behavior without app-level wiring.
---

<LoaderGallery />

## Exact when it matters

CSS skeleton blocks are excellent for generic text and cards. Vue Content Loading is for the cases where the placeholder should match the final composition precisely: avatars, tables, media, dashboards, custom illustrations, and product-specific layouts.

```vue
<VueContentLoading width="100%" height="auto" viewBox="0 0 320 96">
  <circle cx="32" cy="32" r="32" />
  <rect x="80" y="14" width="210" height="14" rx="7" />
  <rect x="80" y="42" width="150" height="10" rx="5" />
</VueContentLoading>
```
