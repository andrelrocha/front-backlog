document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });

    //falta implementar a paginação, com rota para games/pageable
    fetch('http://localhost:8080/games', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                alert('Erro 401: Você não está autorizado para a operação desejada');
                window.location.href = 'http://localhost:1313/login';
            } else {
                throw new Error('Erro na requisição');
            }
        }
        return response.json();
    })
    .then(jogosData => {
        const tableBody = document.getElementById('jogos-list');
        
        for (const jogoData of jogosData) {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.innerText = jogoData.name;
            row.appendChild(nameCell);

            const durationCell = document.createElement('td');
            durationCell.innerText = jogoData.length;
            row.appendChild(durationCell);

            const metacriticCell = document.createElement('td');
            metacriticCell.innerText = jogoData.metacritic;
            row.appendChild(metacriticCell);

            const desireCell = document.createElement('td');
            desireCell.innerText = jogoData.excitement;
            row.appendChild(desireCell);

            const playedCell = document.createElement('td');
            playedCell.innerText = jogoData.played ? 'Sim' : 'Não';
            row.appendChild(playedCell);

            const genreCell = document.createElement('td');
            genreCell.innerText = jogoData.genre;
            row.appendChild(genreCell);

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});