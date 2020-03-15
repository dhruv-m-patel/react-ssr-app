import PropTypes from 'prop-types';

export const HistoryPropType = {
  propType: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.shape({}), // dynamic data provided with push/pop state
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func,
  }),
  defaultProp: {
    length: undefined,
    action: undefined,
    location: {
      pathname: undefined,
      search: undefined,
      hash: undefined,
      state: undefined,
    },
    push: () => {},
    replace: () => {},
    go: () => {},
    goBack: () => {},
    goForward: () => {},
    block: () => {},
  },
};
