document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/infra/verifyjwt/${token}`, {
        method: 'GET',
    })
    .then(response => {
        if (response.status === 401 || response.status === 403) {
            alert('Faça seu login novamente');
            window.location.href = 'http://localhost:1313/login';
        }
        return response.json();
    })
    .then(isValid => {
        if (!isValid) {
            alert('Faça seu login novamente');
            window.location.href = 'http://localhost:1313/login';
        }
    })
    .catch(error => {
        console.error('Erro:', error);

        console.error('Erro:', error);

        if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
            alert('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde');
            return;
        }

    });
});
