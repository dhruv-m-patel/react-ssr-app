import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import createStore from '../../client/store';
import { DEFAULT_STATE } from '../../client/redux/reducers';
import Router from '../../common/router';

export default function () {
  return function renderPage (req, res) {
    // Redirect to secure url in production
    if (req.config.get('env:env') === 'production' && req.protocol === 'http') {
      res.redirect(`https://${req.headers.host}${req.originalUrl}`);
      return;
    }

    const statsFile = path.join(process.cwd(), './build-static/loadable-stats.json');
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    const context = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const store = createStore(req.initialState || DEFAULT_STATE);
    const preloadedState = req.initialState || store.getState();
    if (!req.initialState) {
      req.initialState = preloadedState;
    }

    const application = extractor.collectChunks(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <Router />
        </Provider>
      </StaticRouter>
    );
    const html = ReactDOMServer.renderToString(application);

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta name="ie-compat" content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
          <title>${req.config.get('title')}</title>
          ${extractor.getLinkTags()}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous" />
          <script id="stateData">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
          ${extractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
          <script async src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
        </body>
      </html>
    `);
  }
}
