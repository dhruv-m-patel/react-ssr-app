import { DEFAULT_STATE } from '../../client/redux/reducers';

export default function preloadDefaultState(req) {
  if (!req.initialState) {
    req.initialState = DEFAULT_STATE;
  }
}
