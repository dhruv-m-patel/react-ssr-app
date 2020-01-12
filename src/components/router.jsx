import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={loadable(() => import('./HomePage'))} />
      <Route exact path="/redux-example" component={loadable(() => import('./ReduxExamplePage'))} />
      <Route component={loadable(() => import('./NotFound'))} />
    </Switch>
  );
}
