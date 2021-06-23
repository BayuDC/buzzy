const scdl = require('soundcloud-downloader').default;

const artworkUrl = (url, size = 500) => {
    if (!url || typeof url != 'string') return;

    const i = url.lastIndexOf('.');
    if (i == -1) return;

    return url.slice(0, i - 5) + `t${size}x${size}` + url.slice(i);
};

module.exports = {
    async info(url) {
        const music = await scdl.getInfo(url);
        return {
            title: music?.title,
            genre: music?.genre,
            artist: music?.publisher_metadata?.artist,
            album: music?.publisher_metadata?.album_title,
            year: (music?.release_date || music?.created_at).slice(0, 4),
            artwork: artworkUrl(music?.artwork_url),
        };
    },
};
