import { combineReducers } from 'redux';

import testReducer, { defaultState as testReducerState } from './test-reducer';

const DEFAULT_STATE = {
  test: testReducerState,
};

let defaultState = DEFAULT_STATE;
if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
  defaultState = JSON.parse(window.__PRELOADED_STATE__);
}

export { defaultState as initialState };

export default combineReducers({
  test: testReducer,
});
