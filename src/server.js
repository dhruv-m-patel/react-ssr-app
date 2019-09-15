import express from 'express';
import enrouten from 'express-enrouten';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import 'fetch-everywhere';
import Router from './components/router';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import manifest from '../dist/webpack/manifest.json';
import getInitialHtml from './lib/utils/getInitialHtml';
import { DEFAULT_STATE } from './reducers/rootReducer';
import createStore from './client/store';

global.Promise = require('bluebird').Promise;

// Load environment variables
dotenv.config();

// Setup app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(express.static('dist/webpack'));
app.use(enrouten({ directory: 'routes' }));

app.get('*', async (req, res, next) => {
  if (req.method.toLowerCase() === 'get' && req.headers['Content-Type'] !== 'application/json') {
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

// Setup unhandled error handling
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection', err);
});

// start the app
const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
