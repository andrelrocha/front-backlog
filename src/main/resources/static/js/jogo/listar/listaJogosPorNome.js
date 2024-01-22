document.addEventListener('DOMContentLoaded', function() {
    const searchByNameButton = document.getElementById('searchByName');
    const paginationContainer = document.getElementById('pagination');
    const searchContainer = document.querySelector('.search');

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

    function abrirPaginaPorId(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogos/jogoporid';
    }

        searchByNameButton.addEventListener('click', function() {
        const rowElement = document.createElement('div');
        rowElement.className = 'row mt-3';

        const colElement = document.createElement('div');
        colElement.className = 'col';

        const inputGroupElement = document.createElement('div');
        inputGroupElement.className = 'input-group mb-3';

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'form-control';
        inputElement.placeholder = 'Buscar...';
        inputElement.id = 'searchInput';

        inputElement.setAttribute('autofocus', 'autofocus');

        const buttonElement = document.createElement('button');
        buttonElement.type = 'button';
        buttonElement.className = 'btn btn-outline-secondary';
        buttonElement.id = 'searchButton';

        const searchIconElement = document.createElement('i');
        searchIconElement.id = 'searchIconElement';
        searchIconElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
        `;

        buttonElement.appendChild(searchIconElement);
        inputGroupElement.appendChild(inputElement);
        inputGroupElement.appendChild(buttonElement);
        colElement.appendChild(inputGroupElement);
        rowElement.appendChild(colElement);

        searchContainer.innerHTML = '';
        searchContainer.appendChild(rowElement);

        searchByNameButton.remove();

        searchIconElement.addEventListener('click', function() {
            const token = localStorage.getItem('token');

            const nameCompare = inputElement.value;

            fetch(`http://localhost:8080/games/searchbyname/${nameCompare}`, {
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
                        alert('Erro ao buscar informações dos jogos. Por favor, tente novamente.');
                    }
                }
                return response.json();
            })
            .then(responseData => {
                const jogosData = responseData.content;

                if (jogosData.length == 0) {
                    alert('Sua pesquisa não retornou resultados');
                    window.location.reload();
                }
    
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
            })
        });
    });

});