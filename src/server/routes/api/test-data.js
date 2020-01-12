import { getTestData } from '../../models/test-data';

export default async function test(router) {
  router.get('/', async (req, res) => {
    const data = getTestData();
    res.json(data);
  });
}
