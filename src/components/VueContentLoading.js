import VclRect from './custom/Rect.js';
import VclCircle from './custom/Circle.js';

import VclFacebook from './presets/Facebook.js';

const prefix = 'Vcl';
const components = {
  VclFacebook,
};

export default {
  components,

  props: {
    type: {
      default: 'facebook',
      type: String,
      validator (type) {
        return Object
          .keys(components)
          .filter(key => key.toLowerCase().includes(type))
          .length === 1;
      },
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
      default: '#f0f0f0',
      validator (color) {
        return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);
      },
    },
    secondary: {
      type: String,
      default: '#e0e0e0',
      validator (color) {
        return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);
      },
    },
  },

  computed: {
    viewbox () {
      return `0 0 ${this.width} ${this.height}`;
    },

    formatedSpeed () {
      return this.speed + 's';
    },

    components () {
      return Object
        .keys(components);
    },

    component () {
      return this
        .components
        .find(component => component.toLowerCase().includes(this.type));
    },

    gradientId () {
      return 'gradient-' + this._uid;
    },

    clipPathId () {
      return 'clipPath-' + this._uid;
    },
  },

  template: `
    <svg :viewBox="viewbox" :style="custom" preserveAspectRatio="xMidYMid meet">
      <rect :style="{ fill: 'url(#' + gradientId + ')' }" :clip-path="'url(#' + clipPathId + ')'" x="0" y="0" :width="width" :height="height" />

      <defs>
        <clipPath :id="clipPathId">
          <slot>
            <component :is="component"></component>
          </slot>
        </clipPath>

        <linearGradient :id="gradientId">
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
  VclRect,
  VclCircle,
};
