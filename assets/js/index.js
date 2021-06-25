import $ from 'cash-dom';
$('#url').on('keyup', e => {
    if (e.key == 'Enter') $('#btn-go').trigger('click');
});
$('#btn-go').on('click', async () => {
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
        });
        const body = await res.json();
        if (!res.ok) {
            if (!body.msg) throw body;
            return error(body.msg);
        }
        if (!body.music) throw body;

        const music = body.music;
        const $img = $music.children().first();
        const $info = $music.children().last();

        $img.children().first().attr('src', music.artwork);
        $info.find('.genre').text(`#${music.genre || 'NoGenre'} `);
        $info.find('.title').text(music.title);
        $info.find('.artist').text(`${music.artist || 'Unknown Artist'} • ${music.album || 'Unknown Album'}`);
        $info.find('.year').text(music.year);

        $download.find('a').attr('href', '/');

        $music.removeAttr('style');
        $download.removeAttr('style');
        $loader.removeClass('load');
    } catch {
        error('Something went wrong');
    }
});
