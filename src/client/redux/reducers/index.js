import { combineReducers } from 'redux';

import testReducer from './test-reducer';

let DEFAULT_STATE = {
  test: testReducer(),
};

if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
  DEFAULT_STATE = window.__PRELOADED_STATE__;
  const stateData = document.getElementById('stateData');
  document.head.removeChild(stateData);
}

export default combineReducers({
  test: testReducer,
});
export { DEFAULT_STATE };
