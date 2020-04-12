import ExpressApp from '@dhruv-m-patel/express-app';
import { connectMysqlDb } from '../lib/clients/mysql';
import { connectPostgresDb } from '../lib/clients/postgres';

const server = new ExpressApp();

// Add hot-reloading support in development environment
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const compiler = webpack(require('../../webpack.config.js'));
  server.app.use(require('webpack-dev-middleware')(compiler, {
    stats: { colors: true },
  }));
  server.app.use(require('webpack-hot-middleware')(compiler));
}

// start the app
server.start().then((port) => {
  // Add database support if config sets it
  const dbType = server.config.get('db:dbType');
  if (['mysql', 'pg'].includes(dbType)) {
    const connectDb = dbType === 'mysql' ? connectMysqlDb : connectPostgresDb;
    connectDb()
      .then((database) => {
        server.app.db = database;
        console.log(`${dbType === 'mysql' ? 'MySQL' : 'Postgres'} database connected...`);
      })
      .catch((err) => {
        console.log(`Error connecting to database: ${err.message}`, err.stack);
      });
  }

  console.log(`App has started on port ${port}`);
});
