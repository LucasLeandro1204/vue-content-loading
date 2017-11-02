<template>
  <article class="markdown-body">
    <h1>Vue Content Loading</h1>

    <h3>Vue component to easily build (or use presets) SVG loading cards Facebook like.</h3>

    <blockquote>
      Inspired in <a href="https://github.com/danilowoz/react-content-loader" target="_blank">React Content Loader</a>
    </blockquote>

    <h2>Installation</h2>
    <p>Simply install it via NPM</p>
    <code>$ npm install vue-content-loading --save</code>

    <h2>So how it looks like?</h2>

    <div class="row">
      <div>
        <h5>Facebook</h5>
        <vcl-facebook class="loading"></vcl-facebook>

        <h5>Code</h5>
        <vcl-code class="loading"></vcl-code>

        <h5>List</h5>
        <vcl-list class="loading"></vcl-list>

        <h5>Twitch</h5>
        <vcl-twitch class="loading"></vcl-twitch>
      </div>

      <div>
        <h5>Instagram</h5>
        <vcl-instagram class="loading"></vcl-instagram>

        <h5>Bullet List</h5>
        <vcl-bullet-list class="loading"></vcl-bullet-list>
      </div>
    </div>

    <br>
    <br>
    <a href="#">Do you want to read more about? Check out our readme!</a>
  </article>
</template>

<script>
  import * as VclComponents from './core/components';

  export default {
    components: VclComponents,
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
    min-width: 200px;
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
