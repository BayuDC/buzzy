const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './assets/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/js/'),
        clean: true,
    },
};
