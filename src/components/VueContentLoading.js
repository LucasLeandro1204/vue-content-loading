const colorRegex = new RegExp('^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$');

export default {
  props: {
    speed: {
      default: 2,
      type: Number,
    },

    width: {
      default: 400,
      type: Number,
    },

    height: {
      default: 130,
      type: Number,
    },

    primary: {
      type: String,
      default: '#f0f0f0',
      validator (color) {
        return colorRegex.test(color);
      },
    },

    secondary: {
      type: String,
      default: '#e0e0e0',
      validator (color) {
        return colorRegex.test(color);
      },
    },
  },

  computed: {
    viewbox () {
      return `0 0 ${this.width} ${this.height}`;
    },

    formatedSpeed () {
      return `${this.speed}s`;
    },

    gradientId () {
      return `gradient-${this._uid}`;
    },

    clipPathId () {
      return `clipPath-${this._uid}`;
    },
  },

  template: `
    <svg :viewBox="viewbox" preserveAspectRatio="xMidYMid meet">
      <rect
        :style="{ fill: 'url(#' + gradientId + ')' }" 
        :clip-path="'url(#' + clipPathId + ')'"
        x="0" 
        y="0" 
        :width="width" 
        :height="height" 
      />

      <defs>
        <clipPath :id="clipPathId">
          <slot>
            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            <rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
            <rect x="0" y="100" rx="3" ry="3" width="400" height="10" />
            <rect x="0" y="120" rx="3" ry="3" width="360" height="10" />
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
