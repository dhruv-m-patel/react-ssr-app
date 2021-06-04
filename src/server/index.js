import dotenv from 'dotenv';
import ExpressServer from './ExpressServer';

dotenv.config();
global.Promise = require('bluebird').Promise;

const server = new ExpressServer();
server.start().then(() => {
  console.log('App has started...');
});
