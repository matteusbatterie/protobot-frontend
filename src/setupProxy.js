const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV == 'production') {
    // TO DO
    app.use(createProxyMiddleware("/api", { target: "https://protobot-backend.herokuapp.com" }));
}
else {
    module.exports = (app) => {
        app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" }));
    };
}