import VueContentLoading from '../VueContentLoading';

const getXPos = column => 5 + ((column - 1) * 100) + ((column - 1) * 20);
const getYPos = row => (row - 1) * 30;

export default {
  functional: true,

  props: {
    rows: {
      type: Number,
      required: false,
      default: 5,
    },

    columns: {
      type: Number,
      required: false,
      default: 4,
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

    const table = [];
    const height = (rows * 30) - 20;
    const width = ((columns - 1) * 20) + 10 + (columns * 100);

    for (let row = 0; row <= rows; row++) {
      for (let column = 0; column <= columns; column++) {
        table.push(<rect x={getXPos(column)} y={getYPos(row)} rx="3" ry="3" width="100" height="10" />)
      }

      table.push(<rect y={getYPos(row) + 20} width={width} height="1" />);
    }

    return (
      <VueContentLoading
        {...{
          props,
          attrs: data.attrs,
        }}
        width={width}
        height={height}
      >
        {table}
      </VueContentLoading>
    );
  },
};
