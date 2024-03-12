document.addEventListener('DOMContentLoaded', function() {
    const paginationContainer = document.getElementById('pagination');

    const token = localStorage.getItem('token');

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
                fetchFinalizados(pageNumber);
            });
    
            paginationContainer.appendChild(button);
        }
    }

    function abrirPaginaPorId(id) {
        document.cookie = `finished_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogofinalizado';
    }

    
    function abrirPaginaPorIdInNewTab(id) {
        document.cookie = `finished_id=${id}; path=/`;
        window.open('http://localhost:1313/jogofinalizado', '_blank');
    }

    function fetchFinalizados(pageNumber) {
        fetch(`http://localhost:8080/finished?page=${pageNumber}`, {
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
            const finalizadosData = responseData.content;

            const tableBody = document.getElementById('finalizados-list');
            tableBody.innerHTML = '';
            
            for (const finalizadoData of finalizadosData) {
                const row = document.createElement('tr');
                row.classList.add('finalizadosRow');

                const nameCell = document.createElement('td');
                nameCell.innerText = finalizadoData.name;
                nameCell.id = "tableGameName";
                nameCell.style.cursor = 'pointer';
                nameCell.classList.add('gameName');
                row.appendChild(nameCell);

                nameCell.addEventListener('click', function(event) {
                    if (event.ctrlKey) {
                        abrirPaginaPorIdInNewTab(finalizadoData.id);
                        return;
                    }

                    abrirPaginaPorId(finalizadoData.id);
                });

                nameCell.addEventListener('contextmenu', function(event) {
                    event.preventDefault();
                    abrirPaginaPorIdInNewTab(finalizadoData.id);
                });

                const consoleCell = document.createElement('td');
                consoleCell.innerText = finalizadoData.console;
                row.appendChild(consoleCell);

                const genreCell = document.createElement('td');
                genreCell.innerText = finalizadoData.genre;
                row.appendChild(genreCell);

                const noteCell = document.createElement('td');
                noteCell.innerText = finalizadoData.note;
                row.appendChild(noteCell);

                const metacriticCell = document.createElement('td');
                metacriticCell.innerText = finalizadoData.metacritic;
                row.appendChild(metacriticCell);

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

    fetchFinalizados(0);

});