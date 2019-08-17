import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from './HomePage';
import HelloPage from './HelloPage';
import NotFound from './NotFound';

export default function Router(props) {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/hello" component={HelloPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
