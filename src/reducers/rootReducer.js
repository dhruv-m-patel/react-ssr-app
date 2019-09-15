import { combineReducers } from 'redux';

import testReducer, { defaultState as testReducerState } from './test-reducer';

const DEFAULT_STATE = {
  test: testReducerState,
};

export const initialState = typeof window !== 'undefined' && Object.keys(window.__PRELOADED_STATE__) > 0
  ? JSON.parse(window.__PRELOADED_STATE__)
  : DEFAULT_STATE;

export default combineReducers({
  test: testReducer,
});
