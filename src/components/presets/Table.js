import VueContentLoading from '../VueContentLoading';

export default {
  functional: true,

  props: {
    header: {
      type: Boolean,
      required: false,
      default: true,
    },

    rows: {
      type: Number,
      required: false,
      default: 5,
    },

    columns: {
      type: [
        Number, Array,
      ],
      required: false,
      default: 4,
      validate: columns => typeof columns === 'number' || columns.filter(width => typeof width === 'number'),
    },
  },

  render: (h, {
    data,
    props,
  } = {}) => {
    const {
      rows,
      columns,
    } = props;
    const gutter = 3;
    const is_array = typeof columns === 'array';
    const length = is_array
      ? columns.length
      : columns;
    const height = 5;
    const width = (100 - (length * gutter)) / length;
    const table = [

    ];

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < length; column++) {
        const y = (height + gutter) * row;
        const x = column * (width + gutter);

        table.push(
          <rect x={x} y={y} rx="2" ry="2" height={height} width={is_array ? columns[column] : width}></rect>
        );
      }
    }

    return (
      <VueContentLoading
        {...{
          props,
          attrs: data.attrs,
        }}
        width={100}
        height={((height + gutter) * length) - gutter}
      >
        {table}
      </VueContentLoading>
    );
  },
};
