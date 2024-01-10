document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    const paginationContainer = document.getElementById('pagination');

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });

    function createPaginationButtons(totalPages) {
        paginationContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const pageNumber = i;
            const button = document.createElement('button');
            button.textContent = pageNumber + 1;
            button.classList.add('btn', 'btn-outline-primary', 'mx-1');

            button.addEventListener('click', function () {
                fetchGames(pageNumber);
            });

            paginationContainer.appendChild(button);
        }
    }

    function fetchGames(pageNumber) {
        fetch(`http://localhost:8080/playing/pageable?page=${pageNumber}`, {
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

                const genreCell = document.createElement('td');
                genreCell.innerText = jogoData.genre;
                row.appendChild(genreCell);

                const firstPlayedCell = document.createElement('td');
                // Assuming jogoData.firstPlayed is a date string in the format 'YYYY-MM-DDTHH:mm:ss'
                const firstPlayedDate = new Date(jogoData.firstPlayed);
                firstPlayedCell.innerText = firstPlayedDate.toLocaleDateString(); 
                row.appendChild(firstPlayedCell);

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



//ORGANIZAR OS .JS EM PASTAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ADICIONAR BOTÃO PARA LISTAR JOGOS QUE EU ESTOU JOGANDO