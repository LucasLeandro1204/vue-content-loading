# Presets

All presets accept the core loader props. Pass `width="100%" height="auto"` to scale them fluidly.

<LoaderGallery />

## Fixed presets

| Export         | Canvas      | Use case                         |
| -------------- | ----------- | -------------------------------- |
| `VclCard`      | `320 × 260` | Media or product card            |
| `VclFacebook`  | `400 × 130` | Avatar with text lines           |
| `VclInstagram` | `400 × 480` | Profile header with square media |
| `VclCode`      | `300 × 80`  | Code or structured metadata      |
| `VclList`      | `300 × 120` | Nested list lines                |
| `VclTwitch`    | `300 × 225` | Video tile with metadata         |

## `VclText`

```vue
<VclText :rows="5" :line-height="12" :line-gap="9" :last-line-width="62" />
```

| Prop            | Default | Range                   |
| --------------- | ------- | ----------------------- |
| `rows`          | `4`     | `1–100`                 |
| `lineHeight`    | `12`    | positive number         |
| `lineGap`       | `10`    | positive number         |
| `lastLineWidth` | `70`    | percentage from `1–100` |

## `VclBulletList`

```vue
<VclBulletList :rows="6" />
```

`rows` defaults to `5` and is capped at `100` to avoid accidental unbounded SVG output.

## `VclTable`

```vue
<VclTable :rows="5" :columns="[1, 2, 1]" />
```

| Prop      | Default | Purpose                                     |
| --------- | ------- | ------------------------------------------- |
| `rows`    | `5`     | Number of body rows                         |
| `header`  | `true`  | Adds a taller header row                    |
| `columns` | `4`     | Column count or an array of relative widths |

Column arrays are normalized as weights, so `[1, 2, 1]` produces a center column twice as wide as its siblings.
