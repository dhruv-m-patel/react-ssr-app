export default function () {
  return function renderPage (req, res, next) {
    const manifest = require(`${process.cwd()}/dist/webpack/manifest.json`);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
          <link rel="stylesheet" href="/${manifest['client.css']}" />
          <title>${req.config.get('title')}</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous" />
        </head>
        <body>
          <div id="root"></div>
          <script type="text/javascript" src="/${manifest['vendor.js']}"></script>
          <script type="text/javascript" src="/${manifest['client.js']}"></script>
          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin />
        </body>
      </html>
    `);
  }
}
