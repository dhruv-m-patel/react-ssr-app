import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import ReduxExamplePage from './ReduxExamplePage';
import NotFound from './NotFound';

export default function Router(props) {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/redux-example" component={ReduxExamplePage} />
      <Route component={NotFound} />
    </Switch>
  );
}
