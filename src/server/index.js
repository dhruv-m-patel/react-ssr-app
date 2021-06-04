import dotenv from 'dotenv';
import ExpressServer from './ExpressServer';
import { connectMysqlDb } from '../lib/clients/mysql';
import { connectPostgresDb } from '../lib/clients/postgres';

dotenv.config();
global.Promise = require('bluebird').Promise;

const server = new ExpressServer();
server.start().then((config) => {
  const dbType = config.get('db:dbType');
  if (['mysql', 'pg'].includes(dbType)) {
    const connectDb = dbType === 'mysql' ? connectMysqlDb : connectPostgresDb;
    connectDb()
      .then((database) => {
        server.app.db = database;
        console.log(
          `${dbType === 'mysql' ? 'MySQL' : 'Postgres'} database connected...`
        );
      })
      .catch((err) => {
        console.log(`Error connecting to database: ${err.message}`, err.stack);
      });
  }
  console.log('App has started...');
});
