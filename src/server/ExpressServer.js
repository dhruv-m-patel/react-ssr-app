import path from 'path';
import http from 'http';
import confit from 'confit';
import express from 'express';
import meddleware from 'meddleware';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import 'fetch-everywhere';

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

  addConfiguration(rootDirectory) {
    const configFactory = confit({
      basedir: path.join(rootDirectory, 'config'),
      protocols: {
        path: handlers.path(rootDirectory),
        buildpath: handlers.path(path.join(rootDirectory, 'build')),
        require: betterRequire(rootDirectory),
        regex: shortstopRegex()
      }
    });
    this.configurations.push(configFactory);
  }

  async start() {
    const config = this.config = await this.configure();
    if (config.get('trustProxy')) {
      this.app.enable('trust proxy');
    }

    // disable X-Powered-By header
    this.app.disable('x-powered-by')

    this.app.use((req, res, next) => {
      req.config = config;
      next();
    });

    // NOTE: configure using webpack-dev-middleware and webpack-hot-middleware earlier than other middlewares
    // for hot- reloading to work. Changing order may not guarantee live browser refresh.
    if (process.env.NODE_ENV === 'development') {
      const webpack = require('webpack');
      const compiler = webpack(require('../../webpack.config.js'));
      this.app.use(require('webpack-dev-middleware')(compiler, {
        stats: { colors: true },
      }));
      this.app.use(require('webpack-hot-middleware')(compiler));
    }

    const middleware = config.get('meddleware');
    if (middleware) {
      this.app.use(meddleware(middleware));
    }

    return new Promise((resolve, reject) => {
      const port = ['staging', 'production'].includes(process.env.NODE_ENV) ? process.env.PORT : config.get('port');
      this.server.listen(port, resolve);
    });
  }

  stop(callback) {
    this.server.close(callback);
  }
}
