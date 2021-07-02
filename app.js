const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
const morgan = require('morgan');
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
        publicPath: '/assets',
    })
);
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static('./public'));
app.use(express.json());
app.use(favicon('./public/favicon.ico'));

app.get('/', (req, res) => {
    res.render('landing');
});
app.get('/app', (req, res) => {
    res.render('app');
});
app.post('/app', async (req, res) => {
    const url = req.body.url;
    const music = await buzzy.info(url);
    if (typeof music == 'string') return res.status(404).json({ msg: music });
    res.json({ music });
});
app.get('/guide', (req, res) => {
    res.render('guide');
});
app.get('/d/(:artist)/(:track)', async (req, res, next) => {
    try {
        const url = `https://soundcloud.com/${req.params.artist}/${req.params.track}`;
        const music = await buzzy.download(url);

        res.download(music.path, music.name, music.destroy);
    } catch {
        next();
    }
});
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log('Listening at port', port);
});
