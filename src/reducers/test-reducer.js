import { Actions } from './actions';

export const defaultState = {
  isFetching: false,
  error: undefined,
  data: [],
};

export default function testReducer(state = defaultState, action) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Test.FetchData.pending:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case Actions.Test.FetchData.completed:
      return {
        ...state,
        isFetching: false,
        data: payload,
      };

    case Actions.Test.FetchData.failed:
      return {
        ...state,
        isFetching: false,
        error: 'There was an error retrieving chapters',
      };

    default:
      return state;
  }
}
