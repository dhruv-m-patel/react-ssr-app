import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  return createStore(
    rootReducer,
    rootReducer.initialState,
    composeEnhancers(applyMiddleware(apiMiddleware)),
  );
}
