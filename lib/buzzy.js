const scdl = require('soundcloud-downloader').default;

const artworkUrl = (url, size = 500) => {
    if (!url || typeof url != 'string') return;

    return url.replace(/large\./, `t${size}x${size}.`);
};
const downloadUrl = url => {
    return url.replace('https://soundcloud.com', '/d');
};

module.exports = {
    async info(url) {
        try {
            if (!scdl.isValidUrl(url)) return 'The url is not valid';

            const music = await scdl.getInfo(url);
            return {
                title: music?.title,
                genre: music?.genre,
                artist: music?.publisher_metadata?.artist,
                album: music?.publisher_metadata?.album_title,
                year: (music?.release_date || music?.created_at).slice(0, 4),
                artwork: artworkUrl(music?.artwork_url, 300),
                download: downloadUrl(music.permalink_url),
            };
        } catch {
            return 'Track not found';
        }
    },
};
