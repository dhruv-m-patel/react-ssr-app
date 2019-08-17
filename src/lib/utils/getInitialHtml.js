export default function getInitialHtml(content, manifest) {
  let scriptTags = '';
  if (manifest['client.js'] && manifest['vendor.js']) {
    scriptTags = [
      manifest['vendor.js'], 
      manifest['client.js'],
    ].map(file => `<script type="text/javascript" src="/${file}"></script>`).join('');
  }

  let cssTag = '';
  if (manifest['client.css']) {
    cssTag = `<link rel="stylesheet" href="${manifest['client.css']}" />`;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        ${cssTag}
      </head>
      <body>
        <div id="root">
          ${content}
        </div>
        ${scriptTags}
      </body>
    </html>
  `;
}
