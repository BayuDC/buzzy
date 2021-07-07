const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './assets/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/assets/'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'bundle.css' },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                ],
            },
        ],
    },
};
