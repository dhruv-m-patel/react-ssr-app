import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import createStore from '../../client/store';
import { DEFAULT_STATE } from '../../reducers/rootReducer';
import Router from '../../components/router';

export default function () {
  return function renderPage (req, res) {
    const statsFile = path.join(process.cwd(), './build-static/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile });

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

    const content = (
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <Router />
        </Provider>
      </StaticRouter>
    );

    const jsx = extractor.collectChunks(content);
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
          <title>${req.config.get('title')}</title>
          ${linkTags}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous" />
          <script id="stateData">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
          ${styleTags}
        </head>
        <body>
          <div id="root">${ReactDOMServer.renderToString(jsx)}</div>
          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
          ${scriptTags}
        </body>
      </html>
    `);
  }
}
