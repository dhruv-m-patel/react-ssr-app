import { DEFAULT_STATE } from '../../reducers/rootReducer';

export default function preloadDefaultState(req) {
  if (!req.initialState) {
    req.initialState = DEFAULT_STATE;
  }
}
