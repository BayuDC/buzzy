const fs = require('fs');
const tmp = require('tmp');
const scdl = require('soundcloud-downloader').default;
const Lame = require('node-lame').Lame;
const axios = require('axios').default;
const nanoid = require('nanoid').nanoid;

const getArtworkUrl = (url, size = 500) => {
    if (!url || typeof url != 'string') return;

    return url.replace(/large\./, `t${size}x${size}.`);
};
const createArtwork = url => {
    url = getArtworkUrl(url);
    if (!url) return;

    const type = url.match(/\.[0-9A-z]*$/g)[0];
    const file = tmp.fileSync({ postfix: type });

    return new Promise(async (resolve, reject) => {
        try {
            const stream = (await axios.get(url, { responseType: 'stream' })).data;
            stream.pipe(fs.createWriteStream(file.name));
            stream.on('end', () => resolve(file));
        } catch {
            reject(null);
        }
    });
};

module.exports = {
    collection: new Map(),
    async info(url) {
        try {
            url = url.replace(/[A-z0-9]*.soundcloud.com/, 'soundcloud.com');
            if (!scdl.isValidUrl(url)) return 'The url is not valid';

            const music = await scdl.getInfo(url);
            const id = nanoid();
            this.collection.set(id, { url: music.permalink_url });

            return {
                buzzyId: id,
                title: music?.title,
                genre: music?.genre,
                artist: music?.publisher_metadata?.artist,
                album: music?.publisher_metadata?.album_title,
                year: (music?.release_date || music?.created_at).slice(0, 4),
                artwork: getArtworkUrl(music?.artwork_url, 300),
            };
        } catch {
            return 'Track not found';
        }
    },
    create(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const source = tmp.fileSync({ postfix: '.mp3' });
                const build = tmp.fileSync({ postfix: '.mp3' });
                const stream = await scdl.download(url);
                const music = await scdl.getInfo(url);
                const artwork = await createArtwork(music?.artwork_url);

                stream.pipe(fs.createWriteStream(source.name));
                stream.on('end', () => {
                    const meta = {
                        title: music?.title || '',
                        genre: music?.genre || '',
                        artist: music?.publisher_metadata?.artist || '',
                        album: music?.publisher_metadata?.album_title || '',
                        year: (music?.release_date || music?.created_at).slice(0, 4) || '',
                    };
                    if (artwork?.name) meta.artwork = artwork.name;

                    new Lame({
                        output: build.name,
                        quality: 0,
                        meta,
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
                            artwork?.removeCallback();
                        });
                });
            } catch (e) {
                reject(e);
            }
        });
    },
};
