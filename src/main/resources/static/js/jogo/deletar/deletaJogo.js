const deleteButton = document.getElementById('deleteButton');

deleteButton.addEventListener('click', () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    let gameId = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'game_id') {
            gameId = value;
            break;
        }
    }

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/games/delete/${gameId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                return response.text().then(errorMessage => {
                    alert('Erro 400: ' + errorMessage);
                    throw new Error(`Erro ${response.status}: ${errorMessage}`);
                });
            } else if (response.status === 401) {
                throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
            } else if (response.status === 403) {
                throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
            } else {
                alert('Erro ao apagar jogo. Por favor, tente novamente.');
            }
        }
        alert('Jogo apagado com sucesso.');
        window.location.href = 'http://localhost:1313/jogos';
    })
    .catch(error => {
        console.error('Erro:', error.message);
        alert(error.message);
    });
});