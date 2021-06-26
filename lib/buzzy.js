const fs = require('fs');
const tmp = require('tmp');
const scdl = require('soundcloud-downloader').default;
const Lame = require('node-lame').Lame;

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
    download(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const source = tmp.fileSync({ postfix: '.mp3' });
                const build = tmp.fileSync({ postfix: '.mp3' });
                const stream = await scdl.download(url);
                const music = await scdl.getInfo(url);

                stream.pipe(fs.createWriteStream(source.name));
                stream.on('end', () => {
                    new Lame({
                        output: build.name,
                        quality: 0,
                        meta: {
                            title: music?.title || '',
                            genre: music?.genre || '',
                            artist: music?.publisher_metadata?.artist || '',
                            album: music?.publisher_metadata?.album_title || '',
                            year: (music?.release_date || music?.created_at).slice(0, 4) || '',
                        },
                    })
                        .setFile(source.name)
                        .encode()
                        .then(() =>
                            resolve({
                                name: `${music.title}.mp3`,
                                path: build.name,
                                destroy: build.removeCallback,
                            })
                        )
                        .catch(e => reject(e))
                        .finally(() => {
                            source.removeCallback();
                        });
                });
            } catch (e) {
                reject(e);
            }
        });
    },
};
