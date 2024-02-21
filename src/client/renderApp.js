import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store';
import Router from '../common/router';

export default function renderApp() {
  const supportsHistory = 'pushState' in window.history;
  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  const store = createStore(preloadedState);

  hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}
