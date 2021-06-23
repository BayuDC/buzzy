import $ from 'cash-dom';

$('#btn-go').on('click', () => {
    const url = $('#url').val();
    fetch('/', {
        method: 'post',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(music => {
            const [img, info] = $('.music').show().children();
            $(img).children().first().attr('src', music.artwork);
            $(info)
                .find('.genre')
                .text(`#${music.genre || 'NoGenre'} `);
            $(info).find('.title').text(music.title);
            $(info)
                .find('.artist')
                .text(`${music.artist || 'Unknown Artist'} • ${music.album || 'Unknown Album'}`);
            $(info).find('.year').text(music.year);

            $('.download').show().children().first().attr('href', '/');
        })
        .catch(e => console.log(e));
});
