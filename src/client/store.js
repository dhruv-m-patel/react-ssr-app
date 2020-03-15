import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './redux/reducers';

export default function configureStore(preloadedState) {
  let composeEnhancers = compose;
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  return createStore(
    rootReducer,
    preloadedState || rootReducer.initialState,
    composeEnhancers(applyMiddleware(apiMiddleware)),
  );
}
