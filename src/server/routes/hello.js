export default async function hello(router) {
  router.get('/', async (req, res, next) => {
    next();
  });
}
