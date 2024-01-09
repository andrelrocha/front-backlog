const token = localStorage.getItem('token');

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

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });

    let jogoNomeInput = document.getElementById('jogoNome');
    let jogoDuracaoInput = document.getElementById('jogoDuracao');
    let jogoMetacriticInput = document.getElementById('jogoMetacritic');
    let jogoVontadeInput = document.getElementById('jogoVontade');
    let jogoGeneroInput = document.getElementById('jogoGenero');

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
            jogoNomeInput.value = gameData.name;
            jogoDuracaoInput.value = gameData.length;
            jogoMetacriticInput.value = gameData.metacritic;
            jogoVontadeInput.value = gameData.excitement;
            jogoGeneroInput.value = gameData.genre;
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(error.message);
        });  
});

document.getElementById('jogoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const jogoData = {};

    const jogoNomeInput = document.getElementById('jogoNome');
    const jogoDuracaoInput = document.getElementById('jogoDuracao');
    const jogoMetacriticInput = document.getElementById('jogoMetacritic');
    const jogoVontadeInput = document.getElementById('jogoVontade');
    const jogoGeneroInput = document.getElementById('jogoGenero');

    if (jogoNome !== '' && jogoNome !== null) {
        jogoData.name = jogoNomeInput;
    }
    if (jogoDuracao !== '' && jogoDuracao !== null) {
        jogoData.length = jogoDuracaoInput;
    }
    if (jogoMetacritic !== '' && jogoMetacritic !== null) {
        jogoData.metacritic = jogoMetacriticInput;
    }
    if (jogoVontade !== '' && jogoVontade !== null) {
        jogoData.excitement = jogoVontadeInput;
    }
    if (jogoGenero !== '' && jogoGenero !== null) {
        jogoData.genre = jogoGeneroInput;
    }

    fetch(`http://localhost:8080/games/edit/${gameId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jogoData)
    })
    .then(response => {
        if (response.ok) {
            alert('Jogo atualizado com sucesso!');
            document.getElementById('jogoForm').reset();
            window.location.href = `http://localhost:1313/jogos/jogoporid`;
        } else if (response.status === 400) {
            response.text().then(errorMessage => {
                alert(`Erro ${response.status}: ${errorMessage}`);
            });
        } else if (response.status === 401) {
            alert('Erro 401: Você não está autorizado para a operação desejada');
        } else if (response.status === 403) {
            alert('Erro 403: Você não está autorizado para a operação desejada');
        } else {
            alert('Erro ao editar jogo. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
    });
});