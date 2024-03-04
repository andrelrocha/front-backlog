document.addEventListener('DOMContentLoaded', function () {
    const opinionsNavigation = document.getElementById('opinionsNavigation');
    const gamesNavigation = document.getElementById('gamesNavigation');
    const playingNavigation = document.getElementById('playingNavigation');

    opinionsNavigation.addEventListener('click', function () {
        window.location.href = '/opinioes';
    });

    gamesNavigation.addEventListener('click', function () {
        window.location.href = '/jogos';
    });

    playingNavigation.addEventListener('click', function () {
        window.location.href = '/jogando';
    });
});