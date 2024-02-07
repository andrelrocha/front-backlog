document.getElementById('jogoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const jogoNome = document.getElementById('jogoNome').value;
    const jogoDuracao = document.getElementById('jogoDuracao').value;
    const jogoMetacritic = document.getElementById('jogoMetacritic').value;
    const jogoVontade = document.getElementById('jogoVontade').value;
    const jogoGenero = document.getElementById('jogoGenero').value;

    const jogoData = {
        name: jogoNome,
        length: jogoDuracao,
        metacritic: jogoMetacritic,
        excitement: jogoVontade,
        genre: jogoGenero
    };

    fetch('http://localhost:8080/games/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jogoData)
    })
    .then(response => {
        if (response.ok) {
            alert('Jogo criado com sucesso!');
            document.getElementById('jogoForm').reset();
            window.location.href = 'http://localhost:1313/jogos';
        } else if (response.status === 400) {
            response.text().then(errorMessage => {
                alert(`Erro ${response.status}: ${errorMessage}`);
            });
        } else if (response.status === 401) {
            alert('Erro 401: Você não está autorizado para a operação desejada');
        } else if (response.status === 403) {
            alert('Erro 403: Você não está autorizado para a operação desejada');
        } else {
            alert('Erro ao criar jogo. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
    });
});