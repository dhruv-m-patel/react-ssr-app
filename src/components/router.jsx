import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from '../client/store';
import HomePage from './HomePage';
import HelloPage from './HelloPage';
import NotFound from './NotFound';

export default function Router(props) {
  const reduxStore = configureStore();
  return (
    <Provider store={reduxStore}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hello" component={HelloPage} />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
}
