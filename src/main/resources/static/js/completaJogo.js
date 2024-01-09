document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });

        // Obtém o valor do cookie game_id
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

        // Verifica se o gameId foi encontrado nos cookies
        if (gameId) {
            fetch(`http://localhost:8080/games/${gameId}`, {
                method: 'GET',
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
                        } else if (response.status === 401 || response.status === 403) {
                            throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                        } else {
                            alert('Erro ao buscar informações do jogo. Por favor, tente novamente.');
                        }
                    }
                    return response.json();
                })
                .then(gameData => {
                    document.getElementById('gameId').innerText = gameData.id;
                    document.getElementById('gameNome').innerText = gameData.name;
                    document.getElementById('gameDuracao').innerText = gameData.length;
                    document.getElementById('gameMetacritic').innerText = gameData.metacritic;
                    document.getElementById('gameExcitement').innerText = gameData.excitement;
                    document.getElementById('gamePlayed').innerText = gameData.played;
                    document.getElementById('gameGenre').innerText = gameData.genre;
                })
                .catch(error => {
                    console.error('Erro:', error.message);
                    alert(error.message);
                });  
        }
});