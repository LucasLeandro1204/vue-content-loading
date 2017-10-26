import VueContentLoading from '../VueContentLoading';

export default {
  components: {
    VueContentLoading,
  },

  template: `
    <vue-content-loading v-bind="$attrs" :width="300" :height="225">
      <rect x="0" y="0" rx="3" ry="3" width="300" height="170" />
      <rect x="0" y="180" rx="2" ry="2" width="35" height="45" />
      <rect x="45" y="180" rx="2" ry="2" width="150" height="15" />
      <rect x="45" y="203" rx="2" ry="2" width="100" height="10" />
    </vue-content-loading>
  `,
};
