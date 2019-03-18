/**
 * https://gist.github.com/gordonbrander/2230317
 */
const generateId = () => Math.random().toString(36).substr(2, 9);
const validateColor = color => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color);

export default {
  functional: true,

  name: 'VueContentLoading',

  props: {
    _id: {
      type: String,
      required: false,
      default: generateId,
    },

    rtl: {
      type: Boolean,
      required: false,
      default: false,
    },

    speed: {
      type: Number,
      required: false,
      default: 2,
    },

    width: {
      type: Number,
      required: false,
      default: 400,
    },

    height: {
      type: Number,
      required: false,
      default: 130,
    },

    primary: {
      type: String,
      required: false,
      default: '#f0f0f0',
      validator: validateColor,
    },

    secondary: {
      type: String,
      required: false,
      default: '#e0e0e0',
      validator: validateColor,
    },
  },

  render (h, {
    data,
    props,
    children,
  } = {}) {
    const {
      _id,
      rtl,
      speed,
      width,
      height,
      primary,
      secondary,
    } = props;

    const clipPathId = `clip-${_id}`;
    const gradientId = `gradient-${_id}`;

    const formatedSpeed = `${speed}s`;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={
          rtl ? {
            transform: 'rotateY(180deg)',
          } : null
        }
        preserveAspectRatio='xMidYMid meet'
      >

        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          style={{
            fill: `url(#${gradientId})`,
          }}
          clip-path={`url(#${clipPathId})`}
        />

        <defs>
          {
            children
              ? (
                <clipPath id={clipPathId}>
                  {(
                    children
                  )}
                </clipPath>
              )
              : (
                <clipPath id={clipPathId}>
                  <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                  <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                  <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                  <rect x="0" y="80" rx="3" ry="3" width="350" height="10" />
                  <rect x="0" y="100" rx="3" ry="3" width="400" height="10" />
                  <rect x="0" y="120" rx="3" ry="3" width="360" height="10" />
                </clipPath>
              )
          }

          <linearGradient id={gradientId}>
            <stop offset="0%" stop-color={primary}>
              <animate attributeName="offset" values="-2; 1" dur={formatedSpeed} repeatCount="indefinite" />
            </stop>

            <stop offset="50%" stop-color={secondary}>
              <animate attributeName="offset" values="-1.5; 1.5" dur={formatedSpeed} repeatCount="indefinite" />
            </stop>

            <stop offset="100%" stop-color={primary}>
              <animate attributeName="offset" values="-1; 2" dur={formatedSpeed} repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>
    );
  },
};
