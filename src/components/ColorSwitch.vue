<script>
  export default {
    data () {
      return {
        colors: [
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
        ],
        background: {
          primary: '#bdc3c7',
          secondary: '#95a5a6',
        },
      };
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
    <slot :primary="background.primary" :secondary="background.secondary"></slot>
    <button :style="{ backgroundColor: color.primary }" v-for="(color, index) in colors" :key="index" @click.prevent="change(color)"></button>
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
    margin-left: 5px;
    border-radius: 50%;
    box-shadow: 1px 2px 5px #767676;
  }
</style>
