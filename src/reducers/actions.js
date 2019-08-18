import { RSAA } from 'redux-api-middleware';

const apiCallStates = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
};

export const Actions = {
  Test: {
    FetchData: {...apiCallStates},
  },
};

export function generateRequest({ body, ...options }) {
  return {
    [RSAA]: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body),
      ...options,
    },
  };
}

export const fetchTestData = () => generateRequest({
  endpoint: '/api/test-data',
  types: [
    Actions.Test.FetchData.pending,
    Actions.Test.FetchData.completed,
    Actions.Test.FetchData.failed,
  ],
});
