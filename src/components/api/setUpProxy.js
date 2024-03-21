const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
      target: 'https://app.signalgas.io',
      changeOrigin: true,
}
module.exports = function(app) {
  app.use(
      '/api/v1',
      createProxyMiddleware(proxy)
  );
};