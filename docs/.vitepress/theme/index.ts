import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import LoaderGallery from './components/LoaderGallery.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LoaderGallery', LoaderGallery);
  },
} satisfies Theme;
