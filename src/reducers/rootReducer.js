import { combineReducers } from 'redux';

import testReducer from './test-reducer';

const defaultState = {
  test: testReducer.defaultState,
};

export const initialState = typeof window !== 'undefined' && Object.keys(window.__PRELOADED_STATE__) > 0
  ? JSON.parse(window.__PRELOADED_STATE__)
  : defaultState;

export default combineReducers({
  test: testReducer,
});
