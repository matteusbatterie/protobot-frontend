const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV == 'production') {
    app.use(createProxyMiddleware("/api", { target: "https://protobot-backend.herokuapp.com" }));
}
else if(process.env.NODE_ENV == 'development') {
    module.exports = (app) => {
        app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" }));
    };
}