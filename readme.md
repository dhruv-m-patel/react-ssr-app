# react-app

React app with SSR / Redux / Configuration / Code Splitting support

![CI Status](https://github.com/dhruv-m-patel/react-app/workflows/Continuous%20Integration/badge.svg)

### Setup

```
$ git clone git@github.com:dhruv-m-patel/react-app.git
$ npm install
$ npm start
```

### Using this app

#### Configuration

- Edit `config/config.json` to setup default configuration for including the middleware to intercept request or app startup
- To add environment-specific overrides, edit `config/production.json`, `config/development.json`, `config/staging.json` or `config/test.json`

#### Adding new request middleware

- Add your middleware in `src/server/middleware` (Reference: [`renderPage` middleware](https://github.com/dhruv-m-patel/react-app/blob/master/src/server/middleware/renderPage.js))
- Add configuration for loading middleware with an appropriate order in `config/config.json` (Reference: [`renderPage` middleware configuration entry](https://github.com/dhruv-m-patel/react-app/blob/master/config/config.json#L73))

#### Adding MySQL database support

- Add environment variables in `.env` file referring to `.env.example` required for database connection
- Set `DB_DRIVER=mysql` with your database credentials
- Make sure the environment variables are loaded
- Make sure to refer to `src/lib/clients/mysql.js` and use `executeQuery` to run your database queries in the application. You can directly access database with request object using `req.app.db`.
- Run the app

#### Adding Postgres database support

- Add environment variables in `.env` file referring to `.env.example` required for database connection
- Set `DB_DRIVER=pg` with your database credentials
- Make sure the environment variables are loaded
- Make sure to refer to `src/lib/clients/postgres.js` and use `executeQuery` to run your database queries in the application. You can directly access database with request object using `req.app.db`.
- Run the app

#### Setting up database

- Run `npm run migration:create` to create a new migration
- Run `npm run migration:apply` to apply migration to local database
- Run `npm run migration:apply:stage` to apply migration to staging database
- Run `npm run migration:apply:prod` to apply migration to production database
- Run `npm run migration:undo` to undo a previously ran migration, one at a time.

### Made with:
- React v16.8
- Webpack v4
- Babel v7
- Express v4
- Storybook
- Jest
- ESLint
- StyleLint

Used `Husky` to run linter on every commit, runs test before pushing commits

Supports Configuration (using confit / meddleware), Code splitting (using loadable components), React Bootstrap (For bootstrap style react components)
