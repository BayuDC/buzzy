module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-combine-media-query'),
        require('postcss-sort-media-queries')({
            sort: 'desktop-first',
        }),
    ],
};
