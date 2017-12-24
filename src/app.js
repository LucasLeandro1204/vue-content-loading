import Vue from 'vue';
import * as VclComponents from './core/components';
import ColorSwitch from './components/ColorSwitch.vue';

Object.keys(VclComponents).forEach(c => Vue.component(c, VclComponents[c]));

Vue.component('ColorSwitch', ColorSwitch);

window.Vue = Vue;
