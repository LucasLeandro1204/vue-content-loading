<template>
  <article class="markdown-body">
    <h1>Vue Content Loading</h1>

    <h3>Vue component to easily build (or use presets) SVG loading cards Facebook like.</h3>

    <blockquote>
      Inspired in <a href="https://github.com/danilowoz/react-content-loader" target="_blank">React Content Loader</a>
    </blockquote>

    <!-- <vue-content-loading class="loading"></vue-content-loading> -->
    <h2>So how it looks like?</h2>

    <div class="row">
      <div>
        <h5>Facebook</h5>
        <vcl-facebook class="loading"></vcl-facebook>

        <h5>Code</h5>
        <vcl-code class="loading"></vcl-code>
      </div>

      <div>
        <h5>Instagram</h5>
        <vcl-instagram class="loading"></vcl-instagram>
      </div>
    </div>
  </article>
</template>

<script>
  import VueContentLoading, { VclFacebook, VclInstagram, VclCode } from './core/components.js';

  export default {
    components: {
      VclCode,
      VclFacebook,
      VclInstagram,
      VueContentLoading,
    },
  };
</script>

<style lang="scss">
  @import "../node_modules/github-markdown-css/github-markdown.css";

  body {
    margin: 0 auto;
    max-width: 780px;
    padding: 45px 15px;
    box-sizing: border-box;
  }

  .loading {
    min-width: 300px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;

    > div {
      flex: 1;
      padding: 0 10px;

      &:first-of-type {
        padding-left: 0;
        padding-right: 10px;
      }

      &:last-of-type {
        padding-right: 0;
        padding-left: 10px;
      }
    }
  }

  @media screen and (max-width: 650px) {
    .row > div {
      padding: 0 !important;
    }
  }
</style>
