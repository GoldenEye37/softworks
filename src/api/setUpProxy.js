// const proxy = require("http-proxy-middleware");
//
// module.exports = app => {
//   app.use(
//     "/api",
//     proxy({
//       target: "https://app.signalgas.io",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "/api/v1"
//       }
//     })
//   );
// };