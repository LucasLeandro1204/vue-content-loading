<template>
  <svg
    :viewBox="viewbox"
    :style="svg"
    preserveAspectRatio="xMidYMid meet">
    <rect
      :style="rect.style"
      :clip-path="rect.clipPath"
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
</template>

<script>
  const validateColor = color => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);

  export default {
    name: 'VueContentLoading',

    props: {
      rtl: {
        default: false,
        type: Boolean,
      },

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
        validator: validateColor,
      },

      secondary: {
        type: String,
        default: '#e0e0e0',
        validator: validateColor,
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
        return `gradient-${this.uid}`;
      },

      clipPathId () {
        return `clipPath-${this.uid}`;
      },

      svg () {
        if (this.rtl) {
          return {
            transform: 'rotateY(180deg)',
          };
        }
      },

      rect () {
        return {
          style: {
            fill: 'url(#' + this.gradientId + ')',
          },
          clipPath: 'url(#' + this.clipPathId + ')',
        };
      },
    },

    data: () => ({
      uid: null,
    }),

    created () {
      this.uid = this._uid;
    },
  };
</script>
