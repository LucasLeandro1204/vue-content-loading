# Guide

## Installation

Simple installation via NPM

``$ npm install vue-content-loading --save``

## Usage

Firstly, import it:

```javascript
  import { VclFacebook, VclInstagram } from 'vue-content-loading';
```

Then define it as a component

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

Now you can use it just like you use any other vue component =)

```vue
  <template>
    <vcl-facebook></vcl-facebook>
    <vcl-instagram></vcl-instagram>
  </template>
```

*You may as well bind custom attrs to presets xd*

## Options

All presets accept the props below, but they *may* have other custom props

| Prop      | Type    | Default | Description      |
|:---------:|:-------:|:-------:|:----------------:|
| rtl       | Boolean | false   | RTL version      |
| speed     | Number  | 2       | Animation speed  |
| width     | Number  | 400     | Width component  |
| height    | Number  | 150     | Height component |
| primary   | String  | #f0f0f0 | SVG Background   |
| secondary | String  | #e0e0e0 | Animation color  |

Color props are required to be *HEX* with a proper pound sign ('#') as its prefix.

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

*If you do not specify a vue-content-loading component, Facebook's preset will be used as default*
