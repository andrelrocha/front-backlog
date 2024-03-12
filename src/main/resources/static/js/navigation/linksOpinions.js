document.addEventListener('DOMContentLoaded', function () {
    const finishedNavigation = document.getElementById('finishedNavigation');
    const droppedNavigation = document.getElementById('droppedNavigation');

    finishedNavigation.addEventListener('click', function () {
        window.location.href = '/finalizados';
    });

    droppedNavigation.addEventListener('click', function () {
        window.location.href = '/droppados';
    });
});