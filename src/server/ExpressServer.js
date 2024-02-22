import path from 'path';
import http from 'http';
import confit from 'confit';
import express from 'express';
import meddleware from 'meddleware';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import 'fetch-everywhere';
import getConfiguration from '../lib/utils/getConfiguration';
import betterRequire from '../lib/utils/betterRequire';

export default class ExpressServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.addConfiguration(process.cwd());
  }

  configurations = [];

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
        sourcepath: handlers.path(
          path.join(
            rootDirectory,
            process.env.NODE_ENV === 'development' ? 'src' : 'build'
          )
        ),
        require: betterRequire(rootDirectory),
        regex: shortstopRegex(),
        env: handlers.env(),
      },
    });
    this.configurations.push(configFactory);
  }

  async start() {
    const config = (this.config = await this.configure());
    if (config.get('trustProxy')) {
      this.app.enable('trust proxy');
    }

    // disable X-Powered-By header
    this.app.disable('x-powered-by');

    this.app.use((req, res, next) => {
      req.config = config;
      next();
    });

    // NOTE: configure using webpack-dev-middleware and webpack-hot-middleware earlier than other middlewares
    // for hot- reloading to work. Changing order may not guarantee live browser refresh.
    if (process.env.NODE_ENV === 'development') {
      // Hot reloading here
    }

    const middleware = config.get('meddleware');
    if (middleware) {
      this.app.use(meddleware(middleware));
    }

    return new Promise((resolve, reject) => {
      const port = ['staging', 'production'].includes(process.env.NODE_ENV)
        ? process.env.PORT
        : config.get('port');
      this.server.listen(port, () => {
        resolve(config);
      });
    });
  }

  stop(callback) {
    this.server.close(callback);
  }
}
