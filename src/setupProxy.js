const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://contact.mediusware.com/api/contacts/",
      changeOrigin: true,
    })
  );
};
