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

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });
});


document.getElementById('jogoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const jogoNome = document.getElementById('jogoNome').value;
    const jogoDuracao = document.getElementById('jogoDuracao').value;
    const jogoMetacritic = document.getElementById('jogoMetacritic').value;
    const jogoVontade = document.getElementById('jogoVontade').value;
    const jogoGenero = document.getElementById('jogoGenero').value;

    const jogoData = {};
    
    if (jogoNome !== '' && jogoNome !== null) {
        jogoData.name = jogoNome;
    }
    if (jogoDuracao !== '' && jogoDuracao !== null) {
        jogoData.length = jogoDuracao;
    }
    if (jogoMetacritic !== '' && jogoMetacritic !== null) {
        jogoData.metacritic = jogoMetacritic;
    }
    if (jogoVontade !== '' && jogoVontade !== null) {
        jogoData.excitement = jogoVontade;
    }
    if (jogoGenero !== '' && jogoGenero !== null) {
        jogoData.genre = jogoGenero;
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