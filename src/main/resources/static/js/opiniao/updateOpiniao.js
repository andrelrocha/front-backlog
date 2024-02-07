document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    let opinionId = null;

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name === 'opinion_id') {
            opinionId = value;
            break;
        }
    }

    let gameNome = document.getElementById('gameNome');
    let gameConsole = document.getElementById('gameConsole');
    let gameNote = document.getElementById('gameNote');
    let gameMetacritic = document.getElementById('gameMetacritic');
    let gameGenre = document.getElementById('gameGenre');
    let gameOpinion = document.getElementById('gameOpinion');

    fetch(`http://localhost:8080/opinions/byid/${opinionId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Não foi possível obter as informações do jogo.`);
        }
        return response.json();
    })
    .then(gameData => {
        gameNome.value = gameData.name;
        gameConsole.value = gameData.console;
        gameNote.value = gameData.note;
        gameMetacritic.value = gameData.metacritic;
        gameGenre.value = gameData.genre;
        gameOpinion.value = gameData.opinion;
    })
    .catch(error => {
        console.error('Erro:', error.message);
        alert(error.message);
    });


    const submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const updatedData = {
            name: gameNome.value,
            console: gameConsole.value,
            note: gameNote.value,
            metacritic: gameMetacritic.value,
            genre: gameGenre.value,
            opinion: gameOpinion.value,
        };

        fetch(`http://localhost:8080/opinions/update/${opinionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                alert('Opiniao atualizada com sucesso!');
                document.getElementById('opiniaoForm').reset();
                window.location.href = `http://localhost:1313/opinioes`;
            } else if (response.status === 400) {
                response.text().then(errorMessage => {
                    alert(`Erro ${response.status}: ${errorMessage}`);
                });
            } else if (response.status === 401) {
                alert('Erro 401: Você não está autorizado para a operação desejada');
            } else if (response.status === 403) {
                alert('Erro 403: Você não está autorizado para a operação desejada');
            } else {
                alert('Erro ao editar Opinião. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
        });
    });
});