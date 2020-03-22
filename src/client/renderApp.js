import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import Router from '../common/router';

export default function renderApp() {
  const supportsHistory = 'pushState' in window.history;
  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  const store = createStore(preloadedState);

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
