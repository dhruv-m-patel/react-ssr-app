import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ReduxExamplePage from './components/ReduxExamplePage';
import NotFoundPage from './components/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/redux-example" component={ReduxExamplePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
