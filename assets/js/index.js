import $ from 'cash-dom';

let controller;

$('#url').on('keyup', e => {
    if (e.key == 'Enter') $('#btn-go').trigger('click');
});
$('#btn-go').on('click', async () => {
    controller?.abort();
    controller = new AbortController();

    const $music = $('.music').hide();
    const $download = $('.download').hide();
    const $message = $('.message').hide();
    const $loader = $('.loader').addClass('load');

    const error = msg => {
        $message.text(msg).show();
        $loader.removeClass('load');
    };
    const url = $('#url').val();

    if (!url) return error("The url can't be empty");

    try {
        const res = await fetch('/', {
            method: 'post',
            body: JSON.stringify({ url }),
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
        });
        const body = await res.json();
        if (!res.ok) {
            if (!body.msg) throw body;
            return error(body.msg);
        }
        if (!body.music) throw body;

        const music = body.music;
        const $img = $music.children().first().children().first();
        const $info = $music.children().last();

        $info.find('.genre').text(`#${music.genre || 'NoGenre'} `);
        $info.find('.title').text(music.title);
        $info.find('.artist').text(`${music.artist || 'Unknown Artist'} • ${music.album || 'Unknown Album'}`);
        $info.find('.year').text(music.year);

        $img.hide();
        $img.next().text('No Track Artwork').removeAttr('style');
        if (music.artwork) {
            $img.on('load', () => {
                $img.next().hide();
                $img.removeAttr('style');
            });
            $img.attr('src', music.artwork);
        }

        $download.find('a').attr('href', music.download);

        $music.removeAttr('style');
        $download.removeAttr('style');
        $loader.removeClass('load');
    } catch (e) {
        if (e instanceof DOMException) return;
        error('Something went wrong');
    }
});
