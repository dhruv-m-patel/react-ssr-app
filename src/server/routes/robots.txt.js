export default async function index(router) {
  router.get('/', async (req, res, next) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /');
  });
}
