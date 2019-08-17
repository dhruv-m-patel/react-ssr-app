import express from 'express';
import enrouten from 'express-enrouten';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

global.Promise = require('bluebird').Promise;

// Load environment variables
dotenv.config();

// Setup app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(enrouten({ directory: 'routes' }));
app.use(express.static('static'));

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
