import path from 'path';
import http from 'http';
import confit from 'confit';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import meddleware from 'meddleware';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import bodyParser from 'body-parser';
import enrouten from 'express-enrouten';
import 'fetch-everywhere';

import Router from '../components/router';
import getInitialHtml from '../lib/utils/getInitialHtml';
import { DEFAULT_STATE } from '../reducers/rootReducer';
import createStore from '../client/store';

function betterRequire(basePath) {
  const baseRequire = handlers.require(basePath);
  return function hashRequire(v) {
    const [moduleName, func] = v.split('#');
    const module = baseRequire(moduleName);
    if (func) {
      if (module[func]) {
        return module[func];
      }
      return baseRequire(v);
    }
    return module;
  };
}

const getConfiguration = configFactory => new Promise((resolve, reject) => {
  configFactory.create((err, config) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(config);
  });
});

export default class ExpressServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.addConfiguration(process.cwd());
  }

  configurations = []

  async configure() {
    let lastConfig;
    for (const config of this.configurations.reverse()) {
      if (lastConfig) {
        config.addOverride(lastConfig._store);
      }
      lastConfig = await getConfiguration(config);
    }
    return lastConfig;
  }

  addConfiguration(rootDirectory, sourceDirectory = path.join(rootDirectory, 'src')) {
    const configFactory = confit({
      basedir: path.join(rootDirectory, 'config'),
      protocols: {
        path: handlers.path(rootDirectory),
        sourcepath: handlers.path(sourceDirectory),
        require: betterRequire(rootDirectory),
        regex: shortstopRegex()
      }
    });
    this.configurations.push(configFactory);
  }

  async start() {
    const BUILD_DIRECTORY = `${process.cwd()}/dist`;
    const manifest = require(`${BUILD_DIRECTORY}/webpack/manifest.json`);

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('static'));
    this.app.use(express.static(`${BUILD_DIRECTORY}/webpack`));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(enrouten({ directory: 'routes' }));

    const config = this.config = await this.configure();
    if (config.get('trustProxy')) {
      this.app.enable('trust proxy');
    }

    this.app.use((req, res, next) => {
      req.config = config;
      next();
    });

    const middleware = config.get('meddleware');
    if (middleware) {
      this.app.use(meddleware(middleware));
    }

    this.app.get('*', async (req, res, next) => {
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

    return new Promise((resolve, reject) => {
      this.server.listen(config.get('port'), resolve);
    });
  }

  stop(callback) {
    this.server.close(callback);
  }
}
