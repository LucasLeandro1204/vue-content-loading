import { h, mergeProps } from 'vue';
import type { ComponentPropsOptions, FunctionalComponent, PropType, VNodeChild } from 'vue';

import type {
  ContentLoadingProps,
  TableColumns,
  VclRowsProps,
  VclTableProps,
  VclTextProps,
} from '../types.js';
import { contentLoadingProps } from './props.js';
import { VueContentLoading } from './VueContentLoading.js';

interface Canvas {
  height: number;
  width: number;
}

interface PresetDefinition<Props extends ContentLoadingProps> {
  canvas: Canvas | ((props: Props) => Canvas);
  name: string;
  props?: Record<string, unknown>;
  shapes: (props: Props) => VNodeChild;
}

const contentLoadingPropNames = [
  '_id',
  'animate',
  'ariaLabel',
  'baseUrl',
  'gradientRatio',
  'height',
  'preserveAspectRatio',
  'primary',
  'primaryOpacity',
  'respectReducedMotion',
  'rtl',
  'secondary',
  'secondaryOpacity',
  'speed',
  'uniqueKey',
  'viewBox',
  'width',
] as const satisfies readonly (keyof ContentLoadingProps)[];

const normalizeCount = (value: number | undefined, fallback: number, maximum = 100): number => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(maximum, Math.max(1, Math.floor(value ?? fallback)));
};

const normalizePositiveNumber = (value: number | undefined, fallback: number): number =>
  Number.isFinite(value) && (value ?? 0) > 0 ? (value as number) : fallback;

const forwardContentLoadingProps = (props: ContentLoadingProps): Record<string, unknown> => {
  const forwarded: Record<string, unknown> = {};
  for (const name of contentLoadingPropNames) {
    const value = props[name];
    if (value !== undefined) forwarded[name] = value;
  }
  return forwarded;
};

const createPreset = <Props extends ContentLoadingProps>(
  definition: PresetDefinition<Props>,
): FunctionalComponent<Props> => {
  const component: FunctionalComponent<Props> = (props, { attrs }) => {
    const canvas =
      typeof definition.canvas === 'function' ? definition.canvas(props) : definition.canvas;

    return h(
      VueContentLoading,
      mergeProps(forwardContentLoadingProps(props), attrs, {
        width: props.width ?? canvas.width,
        height: props.height ?? canvas.height,
        viewBox: props.viewBox ?? `0 0 ${canvas.width} ${canvas.height}`,
      }),
      {
        default: () => definition.shapes(props),
      },
    );
  };

  component.displayName = definition.name;
  component.inheritAttrs = false;
  component.props = {
    ...contentLoadingProps,
    ...definition.props,
  } as unknown as ComponentPropsOptions<Props>;

  return component;
};

const staticRect = (
  key: string,
  x: number,
  y: number,
  width: number | string,
  height: number,
  radius = 3,
) => h('rect', { key, x, y, width, height, rx: radius, ry: radius });

export const VclFacebook = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclFacebook',
  canvas: { width: 400, height: 130 },
  shapes: () => [
    staticRect('avatar', 0, 0, 70, 70, 5),
    staticRect('title', 80, 17, 300, 13, 4),
    staticRect('subtitle', 80, 40, 250, 10),
    staticRect('line-1', 0, 80, 350, 10),
    staticRect('line-2', 0, 100, 400, 10),
    staticRect('line-3', 0, 120, 360, 10),
  ],
});

export const VclInstagram = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclInstagram',
  canvas: { width: 400, height: 480 },
  shapes: () => [
    h('circle', { key: 'avatar', cx: 30, cy: 30, r: 30 }),
    staticRect('title', 75, 13, 100, 13, 4),
    staticRect('subtitle', 75, 37, 50, 8, 4),
    staticRect('media', 0, 70, 400, 400, 5),
  ],
});

export const VclCode = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclCode',
  canvas: { width: 300, height: 80 },
  shapes: () => [
    staticRect('token-1', 0, 0, 70, 10),
    staticRect('token-2', 80, 0, 100, 10),
    staticRect('token-3', 190, 0, 10, 10),
    staticRect('token-4', 15, 20, 130, 10),
    staticRect('token-5', 155, 20, 130, 10),
    staticRect('token-6', 15, 40, 90, 10),
    staticRect('token-7', 115, 40, 60, 10),
    staticRect('token-8', 185, 40, 60, 10),
    staticRect('token-9', 0, 60, 30, 10),
  ],
});

export const VclList = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclList',
  canvas: { width: 300, height: 120 },
  shapes: () => [
    staticRect('line-1', 0, 0, 250, 10),
    staticRect('line-2', 20, 20, 220, 10),
    staticRect('line-3', 20, 40, 170, 10),
    staticRect('line-4', 0, 60, 250, 10),
    staticRect('line-5', 20, 80, 200, 10),
    staticRect('line-6', 20, 100, 80, 10),
  ],
});

export const VclTwitch = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclTwitch',
  canvas: { width: 300, height: 225 },
  shapes: () => [
    staticRect('media', 0, 0, 300, 170),
    staticRect('avatar', 0, 180, 35, 45, 2),
    staticRect('title', 45, 180, 150, 15, 2),
    staticRect('subtitle', 45, 203, 100, 10, 2),
  ],
});

const rowsProp = {
  type: Number,
  default: 5,
  validator: (value: number) => Number.isInteger(value) && value > 0 && value <= 100,
};

export const VclBulletList = /* @__PURE__ */ createPreset<VclRowsProps>({
  name: 'VclBulletList',
  props: { rows: rowsProp },
  canvas: (props) => ({
    width: 230,
    height: normalizeCount(props.rows, 5) * 22 - 6,
  }),
  shapes: (props) => {
    const shapes: VNodeChild[] = [];
    const rows = normalizeCount(props.rows, 5);
    for (let index = 0; index < rows; index += 1) {
      const offset = index * 22;
      shapes.push(
        h('circle', { key: `bullet-${index}`, cx: 8, cy: offset + 8, r: 8 }),
        staticRect(`line-${index}`, 22, offset + 3, 200, 9),
      );
    }
    return shapes;
  },
});

const textRowsProp = {
  type: Number,
  default: 4,
  validator: (value: number) => Number.isInteger(value) && value > 0 && value <= 100,
};

const positiveNumberProp = {
  type: Number,
  validator: (value: number) => Number.isFinite(value) && value > 0,
};

const getTextMetrics = (props: VclTextProps) => {
  const rows = normalizeCount(props.rows, 4);
  const lineHeight = normalizePositiveNumber(props.lineHeight, 12);
  const lineGap = normalizePositiveNumber(props.lineGap, 10);
  return {
    rows,
    lineHeight,
    lineGap,
    height: rows * lineHeight + (rows - 1) * lineGap,
  };
};

export const VclText = /* @__PURE__ */ createPreset<VclTextProps>({
  name: 'VclText',
  props: {
    rows: textRowsProp,
    lineHeight: positiveNumberProp,
    lineGap: positiveNumberProp,
    lastLineWidth: {
      type: Number,
      default: 70,
      validator: (value: number) => Number.isFinite(value) && value > 0 && value <= 100,
    },
  },
  canvas: (props) => ({ width: 400, height: getTextMetrics(props).height }),
  shapes: (props) => {
    const metrics = getTextMetrics(props);
    const lastLineWidth = Math.min(100, Math.max(1, props.lastLineWidth ?? 70));
    return Array.from({ length: metrics.rows }, (_, index) =>
      staticRect(
        `line-${index}`,
        0,
        index * (metrics.lineHeight + metrics.lineGap),
        index === metrics.rows - 1 ? `${lastLineWidth}%` : '100%',
        metrics.lineHeight,
      ),
    );
  },
});

export const VclCard = /* @__PURE__ */ createPreset<ContentLoadingProps>({
  name: 'VclCard',
  canvas: { width: 320, height: 260 },
  shapes: () => [
    staticRect('media', 0, 0, 320, 170, 8),
    staticRect('eyebrow', 0, 190, 90, 8, 4),
    staticRect('title', 0, 210, 280, 14, 4),
    staticRect('summary', 0, 236, 220, 10, 4),
    h('circle', { key: 'action', cx: 304, cy: 244, r: 16 }),
  ],
});

const normalizeColumns = (columns: TableColumns | undefined): number[] => {
  if (Array.isArray(columns)) {
    const validColumns = columns
      .filter((value) => Number.isFinite(value) && value > 0)
      .slice(0, 12);
    if (validColumns.length > 0) return validColumns;
  }
  return Array.from({ length: normalizeCount(columns as number | undefined, 4, 12) }, () => 1);
};

const getTableMetrics = (props: VclTableProps) => {
  const bodyRows = normalizeCount(props.rows, 5);
  const rowHeights = [...(props.header ? [9] : []), ...Array.from({ length: bodyRows }, () => 6)];
  const gutter = 4;
  return {
    gutter,
    rowHeights,
    height:
      rowHeights.reduce((total, rowHeight) => total + rowHeight, 0) +
      (rowHeights.length - 1) * gutter,
  };
};

export const VclTable = /* @__PURE__ */ createPreset<VclTableProps>({
  name: 'VclTable',
  props: {
    rows: rowsProp,
    header: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: [Number, Array] as PropType<TableColumns>,
      default: 4,
      validator: (value: TableColumns) =>
        typeof value === 'number'
          ? Number.isInteger(value) && value > 0 && value <= 12
          : value.length > 0 &&
            value.length <= 12 &&
            value.every((width) => Number.isFinite(width) && width > 0),
    },
  },
  canvas: (props) => ({ width: 100, height: getTableMetrics(props).height }),
  shapes: (props) => {
    const columns = normalizeColumns(props.columns);
    const metrics = getTableMetrics(props);
    const availableWidth = 100 - (columns.length - 1) * metrics.gutter;
    const totalWeight = columns.reduce((total, weight) => total + weight, 0);
    const widths = columns.map((weight) => (weight / totalWeight) * availableWidth);
    const shapes: VNodeChild[] = [];
    let y = 0;

    metrics.rowHeights.forEach((rowHeight, rowIndex) => {
      let x = 0;
      widths.forEach((columnWidth, columnIndex) => {
        shapes.push(staticRect(`cell-${rowIndex}-${columnIndex}`, x, y, columnWidth, rowHeight, 2));
        x += columnWidth + metrics.gutter;
      });
      y += rowHeight + metrics.gutter;
    });

    return shapes;
  },
});
