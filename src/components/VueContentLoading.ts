import { computed, defineComponent, h, mergeProps, useId } from 'vue';

import { contentLoadingProps } from './props.js';

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 130;
const DEFAULT_SPEED = 2;
const DEFAULT_GRADIENT_RATIO = 2;

const normalizeId = (value: string): string => value.replaceAll(/[^a-zA-Z0-9_-]/g, '-');

const normalizePositiveNumber = (value: number, fallback: number): number =>
  Number.isFinite(value) && value > 0 ? value : fallback;

const normalizeOpacity = (value: number): number =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 1;

const toViewBoxCoordinate = (value: number | string | undefined, fallback: number): number => {
  if (typeof value === 'number') return normalizePositiveNumber(value, fallback);
  if (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value)) {
    return normalizePositiveNumber(Number(value), fallback);
  }
  return fallback;
};

const createDefaultShapes = () => [
  h('rect', { x: 0, y: 0, rx: 5, ry: 5, width: 70, height: 70 }),
  h('rect', { x: 80, y: 17, rx: 4, ry: 4, width: 300, height: 13 }),
  h('rect', { x: 80, y: 40, rx: 3, ry: 3, width: 250, height: 10 }),
  h('rect', { x: 0, y: 80, rx: 3, ry: 3, width: 350, height: 10 }),
  h('rect', { x: 0, y: 100, rx: 3, ry: 3, width: 400, height: 10 }),
  h('rect', { x: 0, y: 120, rx: 3, ry: 3, width: 360, height: 10 }),
];

export const VueContentLoading = defineComponent({
  name: 'VueContentLoading',
  inheritAttrs: false,
  props: contentLoadingProps,
  setup(props, { attrs, slots }) {
    const generatedId = useId();
    const id = computed(() => {
      const candidate = props.uniqueKey || props._id || generatedId;
      return normalizeId(candidate) || normalizeId(generatedId);
    });
    const clipPathId = computed(() => `vcl-${id.value}-clip`);
    const gradientId = computed(() => `vcl-${id.value}-gradient`);
    const shimmerId = computed(() => `vcl-${id.value}-shimmer`);
    const keyframesName = computed(() => `vcl-${id.value}-keyframes`);
    const titleId = computed(() => `vcl-${id.value}-title`);
    const width = computed(() => props.width ?? DEFAULT_WIDTH);
    const height = computed(() => props.height ?? DEFAULT_HEIGHT);
    const viewBox = computed(
      () =>
        props.viewBox ??
        `0 0 ${toViewBoxCoordinate(props.width, DEFAULT_WIDTH)} ${toViewBoxCoordinate(
          props.height,
          DEFAULT_HEIGHT,
        )}`,
    );

    return () => {
      const speed = normalizePositiveNumber(props.speed, DEFAULT_SPEED);
      const ratio = normalizePositiveNumber(props.gradientRatio, DEFAULT_GRADIENT_RATIO);
      const from = ratio * -1;
      const to = ratio;
      const hasAccessibleName = Boolean(props.ariaLabel);
      const clipReference = `url(${props.baseUrl}#${clipPathId.value})`;
      const gradientReference = `url(${props.baseUrl}#${gradientId.value})`;
      const shapes = slots.default ? slots.default() : createDefaultShapes();
      const fromPercentage = from * 100;
      const toPercentage = to * 100;
      const reducedMotionRule = props.respectReducedMotion
        ? ` @media (prefers-reduced-motion: reduce) { #${shimmerId.value} { animation: none; transform: translateX(${fromPercentage}%); } }`
        : '';
      const animationStyle = props.animate
        ? h(
            'style',
            null,
            `@keyframes ${keyframesName.value} { from { transform: translateX(${fromPercentage}%); } to { transform: translateX(${toPercentage}%); } } #${shimmerId.value} { animation: ${keyframesName.value} ${speed}s linear infinite; transform-box: fill-box; }${reducedMotionRule}`,
          )
        : null;

      const rootProps = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: width.value,
        height: height.value,
        viewBox: viewBox.value,
        preserveAspectRatio: props.preserveAspectRatio,
        role: hasAccessibleName ? 'img' : undefined,
        'aria-labelledby': hasAccessibleName ? titleId.value : undefined,
        'aria-hidden': hasAccessibleName ? undefined : 'true',
        focusable: 'false',
        style: props.rtl
          ? {
              transform: 'scaleX(-1)',
              transformOrigin: 'center',
            }
          : undefined,
      };

      return h('svg', mergeProps(rootProps, attrs), [
        hasAccessibleName ? h('title', { id: titleId.value }, props.ariaLabel) : null,
        h('rect', {
          role: 'presentation',
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          fill: props.primary,
          'fill-opacity': normalizeOpacity(props.primaryOpacity),
          'clip-path': clipReference,
        }),
        props.animate
          ? h('rect', {
              id: shimmerId.value,
              class: 'vcl-animation',
              role: 'presentation',
              x: 0,
              y: 0,
              width: '100%',
              height: '100%',
              fill: gradientReference,
              'clip-path': clipReference,
            })
          : null,
        h('defs', null, [
          animationStyle,
          h('clipPath', { id: clipPathId.value }, shapes),
          props.animate
            ? h('linearGradient', { id: gradientId.value }, [
                h('stop', {
                  offset: '0%',
                  'stop-color': props.secondary,
                  'stop-opacity': 0,
                }),
                h('stop', {
                  offset: '50%',
                  'stop-color': props.secondary,
                  'stop-opacity': normalizeOpacity(props.secondaryOpacity),
                }),
                h('stop', {
                  offset: '100%',
                  'stop-color': props.secondary,
                  'stop-opacity': 0,
                }),
              ])
            : null,
        ]),
      ]);
    };
  },
});

export default VueContentLoading;
