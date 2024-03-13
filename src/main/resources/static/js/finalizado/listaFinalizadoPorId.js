function getOpinionGameImage(gameId) {
    const token = localStorage.getItem('token');

    const gameImage = document.getElementById('gameImage');

    
    fetch(`http://localhost:8080/image/game/${gameId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.text().then(errorMessage => {
                        alert('Erro 400: ' + errorMessage);
                        throw new Error(`Erro ${response.status}: ${errorMessage}`);
                    });
                } else if (response.status === 401 || response.status === 403) {
                    console.log(response.text());
                    throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                } 
            }

            return response.blob();
        }).then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            gameImage.innerHTML = '<img src="' + imageUrl + '" alt="Imagem do Jogo">';
        }).catch(error => {
            console.error(error);
        });
}


document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('token');

    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    let finishedId = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'finished_id') {
            finishedId = value;
                break;
        }
    }

    function acessarJogoPorId(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogos/jogoporid';
    }


    fetch(`http://localhost:8080/finished/byid/${finishedId}`, {
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
            if (document.getElementById('gameId')) {
                document.getElementById('gameId').innerText = gameData.gameId;
            }
            if (document.getElementById('gameNome')) {
                document.getElementById('tituloPagina').innerText = gameData.name;
                document.getElementById('gameNome').innerText = gameData.name;
            }
            if (document.getElementById('gameConsole')) {
                document.getElementById('gameConsole').innerText = gameData.console;
            }
            if (document.getElementById('gameNote')) {
                document.getElementById('gameNote').innerText = gameData.note;
            }
            if (document.getElementById('gameMetacritic')) {
                document.getElementById('gameMetacritic').innerText = gameData.metacritic;
            }
            if (document.getElementById('gameGenre')) {
                document.getElementById('gameGenre').innerText = gameData.genre;
            }
            if (document.getElementById('gameOpinion')) {
                document.getElementById('gameOpinion').innerText = gameData.opinion;
            }

            getOpinionGameImage(gameData.gameId);

            const button = document.getElementById('button_acessar_jogo')

            button.addEventListener('click', function() {
                acessarJogoPorId(gameData.gameId);
            });
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(error.message);
        });  
});