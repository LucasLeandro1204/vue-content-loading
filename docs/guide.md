# Guide

## Installation

Simple install it via NPM

``$ npm install vue-content-loading --save``

## Usage

First import it

```javascript
  import { VclFacebook, VclInstagram } from 'vue-content-loading';
```

Then define as component

```vue
  <script>
    export default {
      components: {
        VclFacebook,
        VclInstagram,
      },
    };
  </script>
```

Now you can use it like you use any other else component =)

```vue
  <template>
    <vcl-facebook></vcl-facebook>
    <vcl-instagram></vcl-instagram>
  </template>
```

*You can bind custom attrs to presets too xd*

## Options

Every preset accept the props below, but presets *maybe* have custom props

| Prop      | Type   | Default | Description      |
|:---------:|:------:|:-------:|:----------------:|
| speed     | Number | 2       | Animation speed  |
| width     | Number | 400     | Width component  |
| height    | Number | 150     | Height component |
| primary   | String | #f0f0f0 | SVG Background   |
| secondary | String | #e0e0e0 | Animation color  |

Color props are required to be HEX with hash prefix.

*Props are validate, so it minimize mistakes xd*

## Custom Preset

It's really simple to build a preset, you only need to know the basics of SVG

```vue
  <script>
    import VueContentLoading from 'vue-content-loading';

    export default {
      components: {
        VueContentLoading,
      },
    };
  </script>

  <template>
    <vue-content-loading :width="300" :height="100">
      <circle cx="30" cy="30" r="30" />
      <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
      <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
    </vue-content-loading>
  </template>
```

*If you let vue-content-loading component empty, the default one will be facebook*
