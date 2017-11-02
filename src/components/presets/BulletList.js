import VueContentLoading from '../VueContentLoading';

export default {
  components: {
    VueContentLoading,
  },

  data () {
    return {
      range: [0, 1, 2, 3, 4],
    };
  },

  computed: {
    height () {
      return this.range.length * 21;
    },
  },

  template: `
    <vue-content-loading v-bind="$attrs" :width="230" :height="height">
      <template v-for="i in range">
        <circle cx="8" :cy="8 + (i * 22)" r="8" />
        <rect x="22" :y="3 + (i * 22)" rx="3" ry="3" width="200" height="9" />
      </template>
    </vue-content-loading>
  `,
};
