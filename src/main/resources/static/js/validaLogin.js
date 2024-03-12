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

        if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
            alert('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde');
            return;
        }
    
        if (error.message.includes('ERR_CONNECTION_REFUSED')) {
            alert('Erro de conexão. Por favor, verifique sua conexão com a internet ou tente novamente mais tarde.');
            return;
        }
    
        if (error.response && (error.response.status === 500 || error.response.status === 404)) {
            alert('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde');
        } else {
            alert('Erro desconhecido com a conexão com o servidor. Por favor, tente novamente mais tarde.');
        }
    });
});
