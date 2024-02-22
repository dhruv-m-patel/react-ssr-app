import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Router from '../common/router';

export default function App({ url, context, store }) {
  return (
    <StaticRouter location={url} context={context}>
      <Provider store={store}>
        <Router />
      </Provider>
    </StaticRouter>
  );
}

App.propTypes = {
  url: PropTypes.string,
  context: PropTypes.shape({}),
  store: PropTypes.shape({}),
};

App.defaultProps = {
  url: undefined,
  context: undefined,
  store: undefined,
};
