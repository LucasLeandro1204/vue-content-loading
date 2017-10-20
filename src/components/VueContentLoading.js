import VclRect from './custom/Rect.js';
import VclCircle from './custom/Circle.js';

export default {
  components: {
    VclRect, VclCircle,
  },

  props: {
    type: {
      default: 'facebook',
      type: String,
    },
    speed: {
      default: 2,
      type: Number,
    },
    width: {
      default: 150,
      type: Number,
    },
    height: {
      default: 150,
      type: Number,
    },
    custom: Object,
    primary: {
      type: String,
      default: '#f00',
    },
    secondary: {
      type: String,
      default: '#0f0',
    },
  },

  computed: {
    viewbox () {
      return `0 0 ${this.width} ${this.height}`;
    },

    formatedSpeed () {
      return this.speed + 's';
    },
  },

  template: `
    <svg :viewBox="viewbox" :style="custom" preserveAspectRatio="xMidYMid meet">
      <rect style="fill: url(#gradient)" clip-path="url(#path)" x="0" y="0" :width="width" :height="height" />

      <defs>
        <clipPath id="path">
          <slot>
            <circle cx="30" cy="30" r="20" />
          </slot>
        </clipPath>

        <linearGradient id="gradient">
          <stop offset="0%" :stop-color="primary">
            <animate attributeName="offset" values="-2; 1" :dur="formatedSpeed" repeatCount="indefinite" />
          </stop>

          <stop offset="50%" :stop-color="secondary">
            <animate attributeName="offset" values="-1.5; 1.5" :dur="formatedSpeed" repeatCount="indefinite" />
          </stop>

          <stop offset="100%" :stop-color="primary">
            <animate attributeName="offset" values="-1; 2" :dur="formatedSpeed" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  `,
};

export {
  Rect,
  Circle,
};