document.addEventListener("DOMContentLoaded", function() {
    const paginationContainer = document.getElementById('pagination');

    const token = localStorage.getItem('token');

    function abrirPaginaPorId(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogos/jogoporid';
    }

    function abrirPaginaPorIdInNewTab(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.open('http://localhost:1313/jogos/jogoporid', '_blank');
    }

    let currentPage = 0;
    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = '';
    
        for (let i = 0; i < totalPages; i++) {
            const pageNumber = i;
            const button = document.createElement('button');
            button.textContent = pageNumber + 1;
            button.classList.add('btn', 'btn-outline-primary', 'mx-1');
    
            if (pageNumber === currentPage) {
                button.classList.add('btn-primary');
                button.classList.remove('btn-outline-primary');
                button.style.color = 'white';
            }
    
            button.addEventListener('click', function () {
                currentPage = pageNumber;
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

                nameCell.addEventListener('click', function(event) {
                    if (event.ctrlKey) {
                        abrirPaginaPorIdInNewTab(jogoData.id);
                    }
                });

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
                button.classList.add('btn', 'btn-light');

                //importando lib de icon
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css';
                document.head.appendChild(linkElement);

                button.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';

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