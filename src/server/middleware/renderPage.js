import { renderToString } from 'react-dom/server';
import createStore from '../../client/store';
import { DEFAULT_STATE } from '../../client/redux/reducers';

const isProduction = ['staging', 'production'].includes(process.env.NODE_ENV);

export default function RenderPage() {
  return async function renderPage(req, res) {
    // Redirect to secure url in production
    if (
      req.config.get('env:env') === 'production' &&
      req.protocol === 'http' &&
      process.env.HTTPS_ONLY === true
    ) {
      res.redirect(`https://${req.headers.host}${req.originalUrl}`);
      return;
    }

    const ssrManifest =
      isProduction &&
      (await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8'));
    let vite;
    if (!isProduction) {
      const { createServer } = await import('vite');
      vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base,
      });
      app.use(vite.middlewares);
    }

    const context = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const store = createStore(req.initialState || DEFAULT_STATE);
    const preloadedState = req.initialState || store.getState();
    if (!req.initialState) {
      req.initialState = preloadedState;
    }

    const url = req.originalUrl.replace('/', '');
    let template;
    let render;

    if (!isProduction) {
      template = await fs.readFile('../../index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const rendered = await vite.ssrLoadModule('../App.jsx').default;
      render = rendered({ url, store, context });
    } else {
      template = templateHtml;
      rendered = (await import('../../../build/server/App.jsx')).default;
      render = rendered({ url, store, context });
    }

    const content = await render(url, ssrManifest);
    const jsxHtml = renderToString(content);
    const html = template
      .replace('<!--app-head-->', content.head || '')
      .replace('<!--app-html-->', jsxHtml || '')
      .replace('<!--app-title-->', req.config.get('title'))
      .replace(
        '<!--app.state-->',
        `
          <script id="stateData">window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, '\\u003c')};</script>
      `
      );

    res.status(200).set('Content-Type', 'text/html').send(html);
  };
}
