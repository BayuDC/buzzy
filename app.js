const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const buzzy = require('./lib/buzzy');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/template');

app.use(
    webpackMiddleware(webpack(webpackConfig), {
        publicPath: '/js',
    })
);
app.use(
    sass({
        src: './assets/scss',
        dest: './public/css',
        prefix: '/css',
        outputStyle: 'expanded',
        indentWidth: 4,
    })
);
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', async (req, res) => {
    const url = req.body.url;
    res.json(await buzzy.info(url));
});
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log('Listening at port', port);
});
