import renderApp from './renderApp';

renderApp();

if (module.hot) {
  module.hot.accept('./renderApp', () => {
    const renderApp = require('./renderApp').default;
    renderApp();
  });
}
