document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    const adicionarButton = document.getElementById('adicionarButton');

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
    
    function convertToISODate(inputDate) {
        const parts = inputDate.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`;
        return formattedDate;
    }


    adicionarButton.addEventListener('click', function() {

        const firstPlayedInput = prompt('Quando foi a primeira vez que você jogou? (DD/MM/YYYY)');

        if (firstPlayedInput) {
            const firstPlayed = convertToISODate(firstPlayedInput);

            const playingData = JSON.stringify({
                gameId,
                firstPlayed
            });

            fetch('http://localhost:8080/playing/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: playingData
            }).then(response => {
                if (response.ok) {
                    alert('Jogo adicionado à lista "Jogando" com sucesso!');
                    window.location.href = `http://localhost:1313/jogando`;
                } else if (response.status === 400) {
                    response.text().then(errorMessage => {
                        alert(`Erro ${response.status}: ${errorMessage}`);
                    });
                } else if (response.status === 401) {
                    alert('Erro 401: Você não está autorizado para a operação desejada');
                } else if (response.status === 403) {
                    alert('Erro 403: Você não está autorizado para a operação desejada');
                } else {
                    alert('Erro ao adicionar jogo à lista "Jogando". Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
            });
        }
    });
});