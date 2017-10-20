<template>
  <article class="markdown-body">
    <h1>Vue Content Loading</h1>

    <h3>Vue component to easily build (or use presets) SVG loading cards Facebook like.</h3>

    <blockquote>
      Inspired in <a href="https://github.com/danilowoz/react-content-loader" target="_blank">React Content Loader</a>
    </blockquote>

    <vue-content-loading></vue-content-loading>
  </article>
</template>

<script>
  import VueContentLoading from './components/VueContentLoading.js';

  export default {
    components: {
      VueContentLoading,
    },
  };
</script>

<style lang="scss">
  @import "../node_modules/github-markdown-css/github-markdown.css";

  body {
    padding: 45px;
    margin: 0 auto;
    max-width: 980px;
    min-width: 200px;
    box-sizing: border-box;
  }
</style>
