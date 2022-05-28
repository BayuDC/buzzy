const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

module.exports = app => {
    app.use(
        webpackMiddleware(webpack(webpackConfig), {
            publicPath: '/assets',
        })
    );
};
