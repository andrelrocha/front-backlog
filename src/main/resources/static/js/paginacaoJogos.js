document.addEventListener("DOMContentLoaded", function() {
    const paginationContainer = document.getElementById('pagination');

    const token = localStorage.getItem('token');

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });

    function abrirPaginaPorId(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogos/jogoporid';
    }

    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const pageNumber = i;
            const button = document.createElement('button');
            button.textContent = pageNumber + 1;
            button.classList.add('btn', 'btn-outline-primary', 'mx-1');
    
            button.addEventListener('click', function() {
                fetchGames(pageNumber);
            });
    
            paginationContainer.appendChild(button);
        }
    }

    function fetchGames(pageNumber) {
        fetch(`http://localhost:8080/games/pageable?page=${pageNumber}`, {
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
        .then(responseData => {
            const jogosData = responseData.content;

            const tableBody = document.getElementById('jogos-list');
            tableBody.innerHTML = '';
            
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

                const acaoCell = document.createElement('td');
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-warning', 'btn-lg', 'p-0', 'rounded');
                button.style.width = '30px';
                button.style.height = '30px';

                button.addEventListener('click', function() {
                                abrirPaginaPorId(jogoData.id);
                            });
                acaoCell.appendChild(button);
                row.appendChild(acaoCell);            


                tableBody.appendChild(row);
            }

            const totalPages = responseData.totalPages;
            createPaginationButtons(totalPages);
        })
        .catch(error => {
            console.error('Erro:', error.message);
            alert(error.message);
        });
    }

    fetchGames(0);

});