import { getTestData } from '../../models/test-data';

export default async function test(router) {
  router.get('/', async (req, res) => {
    res.json(getTestData());
  });
}
