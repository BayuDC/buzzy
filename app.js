const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const expressWs = require('express-ws');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const buzzy = require('./lib/buzzy');

const app = express();
const port = process.env.PORT || 3000;
expressWs(app);

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
app.ws('/app/(:buzzyId)', async (ws, req) => {
    const id = req.params.buzzyId;
    const music = buzzy.collection.get(id);

    buzzy
        .create(music.url)
        .then(file => {
            const destroy = () => {
                buzzy.collection.delete(id);
                file?.destroy();
            };

            if (ws.readyState > 1) return destroy();

            music.file = file;
            ws.send('ready');
            ws.on('close', () => {
                setTimeout(destroy, 30000);
            });
        })
        .catch(() => {
            ws.send('error');
            ws.close();
        });
});
app.get('/d/(:buzzyId)', (req, res, next) => {
    const id = req.params.buzzyId;
    const file = buzzy.collection.get(id).file;

    if (!file) return next();

    res.download(file.path, file.name);
});
app.get('/guide', (req, res) => {
    res.render('guide');
});
app.use((req, res) => {
    res.render('error', { layout: 'layouts/template-clear' });
});

app.listen(port, () => {
    console.log('Listening at port', port);
});
