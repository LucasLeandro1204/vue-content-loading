import type { PropType } from 'vue';

const isPositiveNumber = (value: number): boolean => Number.isFinite(value) && value > 0;
const isOpacity = (value: number): boolean => Number.isFinite(value) && value >= 0 && value <= 1;

export const contentLoadingProps = {
  _id: String,
  animate: {
    type: Boolean,
    default: true,
  },
  ariaLabel: String,
  baseUrl: {
    type: String,
    default: '',
  },
  gradientRatio: {
    type: Number,
    default: 2,
    validator: isPositiveNumber,
  },
  height: [Number, String] as PropType<number | string>,
  preserveAspectRatio: {
    type: String,
    default: 'xMidYMid meet',
  },
  primary: {
    type: String,
    default: '#f0f0f0',
  },
  primaryOpacity: {
    type: Number,
    default: 1,
    validator: isOpacity,
  },
  respectReducedMotion: {
    type: Boolean,
    default: true,
  },
  rtl: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: String,
    default: '#e0e0e0',
  },
  secondaryOpacity: {
    type: Number,
    default: 1,
    validator: isOpacity,
  },
  speed: {
    type: Number,
    default: 2,
    validator: isPositiveNumber,
  },
  uniqueKey: String,
  viewBox: String,
  width: [Number, String] as PropType<number | string>,
} as const;
