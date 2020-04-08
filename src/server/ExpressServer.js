import ExpressApp from '@dhruv-m-patel/express-app';

const server = new ExpressApp();

// NOTE: configure using webpack-dev-middleware and webpack-hot-middleware earlier than other middlewares
// for hot- reloading to work. Changing order may not guarantee live browser refresh.
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const compiler = webpack(require('../../webpack.config.js'));
  server.app.use(require('webpack-dev-middleware')(compiler, {
    stats: { colors: true },
  }));
  server.app.use(require('webpack-hot-middleware')(compiler));
}

export default server;
