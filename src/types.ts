import type { VNode } from 'vue';

export type SvgDimension = number | string;

export interface ContentLoadingProps {
  /** @deprecated Use `uniqueKey` instead. */
  _id?: string;
  animate?: boolean;
  ariaLabel?: string;
  baseUrl?: string;
  gradientRatio?: number;
  height?: SvgDimension;
  preserveAspectRatio?: string;
  primary?: string;
  primaryOpacity?: number;
  respectReducedMotion?: boolean;
  rtl?: boolean;
  secondary?: string;
  secondaryOpacity?: number;
  speed?: number;
  uniqueKey?: string;
  viewBox?: string;
  width?: SvgDimension;
}

export interface ContentLoadingSlots {
  default?: () => VNode[];
}

export interface VclRowsProps extends ContentLoadingProps {
  rows?: number;
}

export interface VclTextProps extends VclRowsProps {
  lastLineWidth?: number;
  lineGap?: number;
  lineHeight?: number;
}

export type TableColumns = number | readonly number[];

export interface VclTableProps extends VclRowsProps {
  columns?: TableColumns;
  header?: boolean;
}
