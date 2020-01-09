import renderApp from './renderApp';

renderApp();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./renderApp', () => {
    const renderApp = require('./renderApp').default;
    renderApp();
  });
}
