<script>
  import * as Components from '../../../src/core/components';

  const colors = [
    {
      primary: '#bdc3c7',
      secondary: '#95a5a6',
    },
    {
      primary: '#3498db',
      secondary: '#2980b9',
    },
    {
      primary: '#1abc9c',
      secondary: '#16a085',
    },
    {
      primary: '#f1c40f',
      secondary: '#f39c12',
    },
    {
      primary: '#e67e22',
      secondary: '#d35400',
    },
    {
      primary: '#e74c3c',
      secondary: '#c0392b',
    },
    {
      primary: '#9b59b6',
      secondary: '#8e44ad',
    },
  ];

  export default {
    data: () => ({
      background: colors[0],
    }),

    props: {
      type: {
        type: String,
        required: false,
        default: 'VclFacebook',
      },

      rtl: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      colors () {
        return colors;
      },

      loader () {
        return {
          rtl: this.rtl,
          is: Components[this.type],

          ...this.background,
        };
      },
    },

    methods: {
      change (color) {
        this.background = color;
      },
    },
  };
</script>

<template>
  <div>
    <Component v-bind="loader" />

    <button
      :key="index"
      @click.prevent="change(color)"
      v-for="(color, index) in colors"
      :style="{ backgroundColor: color.primary }"
      >
    </button>
  </div>
</template>

<style scoped>
  div {
    max-width: 350px;
  }

  button {
    width: 15px;
    height: 15px;
    border: none;
    cursor: pointer;
    margin-top: 16px;
    margin-right: 8px;
    border-radius: 50%;
    box-shadow: 1px 2px 5px #767676;
  }
</style>
