import { RSAA } from 'redux-api-middleware';

export const Actions = {
  Test: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
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

export const fetchTestData = () =>
  generateRequest({
    endpoint: '/api/test-data',
    types: [
      Actions.Test.FetchDataPending,
      Actions.Test.FetchDataCompleted,
      Actions.Test.FetchDataFailed,
    ],
  });
