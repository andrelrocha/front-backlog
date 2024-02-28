document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/infra/verifyjwt/${token}`, {
        method: 'GET',
    })
    .then(response => {
        if (!(response.status === 401 || response.status === 403)) {
            return response.json();
        }
    })
    .then(isValid => {
        if (isValid) {
            window.location.href = 'http://localhost:1313/jogos';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
