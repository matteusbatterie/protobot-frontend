const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV == 'production') {
    module.exports = (app) => {
        app.use(createProxyMiddleware("/api", { target: "https://protobot-backend.herokuapp.com" }));
    };
}
else {
    module.exports = (app) => {
        app.use(createProxyMiddleware("/api", { target: "https://protobot-backend.herokuapp.com" }));
    };
}