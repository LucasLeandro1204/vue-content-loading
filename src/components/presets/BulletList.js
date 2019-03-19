import VueContentLoading from '../VueContentLoading';

const getYPos = (row, plus) => plus + ((row - 1) * 22);

export default {
  functional: true,

  props: {
    rows: {
      type: Number,
      required: false,
      default: 5,
    },
  },

  render: (h, {
    data,
    props,
  } = {}) => {
    const {
      rows,
    } = props;

    const presets = [];

    for (let index = 0; index <= rows; index++) {
      presets.push(
        <circle cx="8" cy={getYPos(index, 8)} r="8" />,
        <rect x="22" y={getYPos(index, 3)} rx="3" ry="3" width="200" height="9" />
      );
    }

    return (
      <VueContentLoading
        {...{
          props,
          attrs: data.attrs,
        }}
        width={230}
        height={rows * 21}
      >
        {presets}
      </VueContentLoading>
    );
  },
};
