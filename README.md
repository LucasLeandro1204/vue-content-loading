# Vue Content Loading

### Vue component to easily build (or use presets) SVG loading cards Facebook like.

> Inspired in [React Content Loader](https://github.com/danilowoz/react-content-loader)

## Installation

Simply install it via NPM

``$ npm install vue-content-loading --save``

## So how it looks like?

##### Facebook

![Facebook loading](https://raw.githubusercontent.com/LucasLeandro1204/vue-content-loading/master/static/facebook.gif "Facebook loading")

##### Code

![Code loading](https://raw.githubusercontent.com/LucasLeandro1204/vue-content-loading/master/static/code.gif "Code loading")

[See more here](https://lucasleandro1204.github.io/vue-content-loading/)

## Usage

##### Presets

```javascript
  import { VclFacebook, VclInstagram } from 'vue-content-loading';

  <vcl-facebook></vcl-facebook>

  <vcl-instagram></vcl-instagram>
```

*You can bind custom attrs to presets too xd*

##### Custom

```javascript
  import VueContentLoading from 'vue-content-loading';

  <vue-content-loading :width="300" :height="100">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
  </vue-content-loading>
```

*The default loading is facebook*

## Options

#### Props

| Prop      | Type   | Default | Description      |
|:---------:|:------:|:-------:|:----------------:|
| speed     | Number | 2       | Animation speed  |
| width     | Number | 400     | Width component  |
| height    | Number | 150     | Height component |
| primary   | String | #f0f0f0 | SVG Background   |
| secondary | String | #e0e0e0 | Animation color  |

Color props are required to be HEX with hash prefix.

*Props are validate, so it minimize mistakes xd*

#### Supported presets

* Code *(VclCode)*
* List *(VclList)*
* Facebook *(VclFacebook)*
* Instagram *(VclInstagram)*

## Development

To run for development run

``$ npm run dev``

This will host the application at localhost:8080

To build for production run

``$ npm run build``

The above command bundle the app and also features minification to help reduce file size

#### Linting

``$ npm run lint``

To automatically fix the problems, run

``$ npm run lint:fix``

##### License

MIT
