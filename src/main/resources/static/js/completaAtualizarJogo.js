document.addEventListener('DOMContentLoaded', function() {
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
                    document.getElementById('jogoNome').value = gameData.name;
                    document.getElementById('jogoDuracao').value = gameData.length;
                    document.getElementById('jogoMetacritic').value = gameData.metacritic;
                    document.getElementById('jogoVontade').value = gameData.excitement;
                    document.getElementById('jogoGenero').value = gameData.genre;
                })
                .catch(error => {
                    console.error('Erro:', error.message);
                    alert(error.message);
                });  
        }
}); 


//ADICIONAR VERIFICAÇÃO DE SOMENTE RECUPERAR O ELEMENT ID SE ESSE ELEMTN EXISTIR