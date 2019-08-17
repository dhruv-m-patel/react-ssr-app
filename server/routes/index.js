export default async function index(router) {
  router.get('/', async (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>${process.env.APP_NAME}</title>
      </head>
      <body>
        <div id="container">
          Welcome to index page
        </div>
        <script src="/app.bundle.js"></script>
      </body>
    </html>
  `);
  });
}
