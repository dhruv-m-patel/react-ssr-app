import {getTestData} from '../models/test-data'
import preloadDefaultState from '../../lib/utils/preloadDefaultState'

export default async function hello(router) {
  router.get('/', async (req, res, next) => {
    const data = getTestData();

    preloadDefaultState(req);

    req.initialState = {
      ...req.initialState,
      test: {
        ...req.initialState.test,
        data,
      },
    };

    next();
  });
}
