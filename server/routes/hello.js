export default async function hello(router) {
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
          <div id="container" style="text-align: center">
            <p>
              <img src="/images/web.png" alt="web" style="max-width: 300px" />
            </p>
            <br />
            Hello World!
          </div>
          <script src="/app.bundle.js"></script>
        </body>
      </html>
    `);
  });
}
