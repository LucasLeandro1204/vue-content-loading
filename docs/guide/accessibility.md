# Accessibility

Loading placeholders should not make assistive-technology users listen to a description of every visual block. Loaders are therefore decorative by default:

```html
<svg aria-hidden="true" focusable="false">...</svg>
```

Put loading state on the content region instead:

```vue
<section :aria-busy="loading" aria-live="polite">
  <VclText v-if="loading" />
  <ArticleBody v-else />
</section>
```

Use `ariaLabel` only when the graphic itself carries useful loading context:

```vue
<VclTable aria-label="Loading portfolio positions" />
```

That changes the SVG to an image role and connects the label through a `<title>` element.

## Motion

The shimmer runs by default, but an inline media rule disables it under `prefers-reduced-motion: reduce`. This works without a watcher, event listener, or hydration-only branch.

Disable motion for every user when animation adds no value:

```vue
<VclText :animate="false" />
```

Set `:respect-reduced-motion="false"` only when the product has an equivalent motion policy elsewhere.
