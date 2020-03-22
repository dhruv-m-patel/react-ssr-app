import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={loadable(() => import('./components/HomePage'))} />
      <Route exact path="/redux-example" component={loadable(() => import('./components/ReduxExamplePage'))} />
      <Route component={loadable(() => import('./components/NotFound'))} />
    </Switch>
  );
}
