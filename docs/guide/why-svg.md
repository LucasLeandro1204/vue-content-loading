# Why SVG

Skeleton loaders generally follow two useful models:

| Model                                      | Best for                                                      | Trade-off                                                 |
| ------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------- |
| CSS blocks that inherit surrounding layout | Generic text, avatars, and adaptive design-system primitives  | Harder to reproduce product-specific compositions exactly |
| One clipped SVG canvas                     | Precise cards, tables, media, charts, and custom compositions | The author maintains SVG coordinates                      |

Vue Content Loading intentionally chooses the second model. The base loader keeps the interface small while handling the machinery that every custom SVG would otherwise repeat.

## Performance choices

- Presets are functional Vue modules, avoiding state and lifecycle work.
- A loader moves one CSS-transformed shimmer instead of animating three gradient stops.
- Vue remains a peer dependency and is external to all distribution bundles.
- There is no runtime CSS import or third-party dependency.
- IDs and derived values are stable and computed once until their inputs change.

For a generic line skeleton, use `VclText`. For a skeleton that must automatically inherit arbitrary live layout, a CSS-based package may be a better fit.
