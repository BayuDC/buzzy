const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const sass = require('node-sass-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

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

app.get('/', (req, res) => {
    res.render('index');
});
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log('Listening at port', port);
});
