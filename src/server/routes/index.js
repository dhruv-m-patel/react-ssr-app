import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Router from '../../components/router';
import getInitialHtml from '../../lib/utils/getInitialHtml';
import { DEFAULT_STATE } from '../../reducers/rootReducer';
import createStore from '../../client/store';

export default async function index(router) {
  router.get('*', async (req, res, next) => {
    if (req.method.toLowerCase() === 'get' && req.headers['Content-Type'] !== 'application/json') {
      const BUILD_DIRECTORY = `${process.cwd()}/dist`;
      const manifest = require(`${BUILD_DIRECTORY}/webpack/manifest.json`);

      const context = {};
      if (context.url) {
        res.redirect(context.url);
        return;
      }

      const store = createStore(DEFAULT_STATE);
      const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <Router />
          </Provider>
        </StaticRouter>
      );

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(getInitialHtml(content, manifest, store.getState()));
      }
    }

    next();
  });

  router.get('/', async (req, res, next) => {
    next();
  });
}
