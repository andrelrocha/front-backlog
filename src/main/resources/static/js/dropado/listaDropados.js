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
                fetchDropados(pageNumber);
            });
    
            paginationContainer.appendChild(button);
        }
    }

    function abrirPaginaPorId(id) {
        document.cookie = `dropped_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogodropado';
    }

    
    function abrirPaginaPorIdInNewTab(id) {
        document.cookie = `dropped_id=${id}; path=/`;
        window.open('http://localhost:1313/jogodropado', '_blank');
    }

    function fetchDropados(pageNumber) {
        fetch(`http://localhost:8080/droppedgames?page=${pageNumber}`, {
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
            const dropadosData = responseData.content;

            const tableBody = document.getElementById('dropados-list');
            tableBody.innerHTML = '';
            
            for (const dropadoData of dropadosData) {
                const row = document.createElement('tr');
                row.classList.add('dropadosRow');

                const nameCell = document.createElement('td');
                nameCell.innerText = dropadoData.name;
                nameCell.classList.add('gameName');
                nameCell.style.cursor = 'pointer';
                row.appendChild(nameCell);

                nameCell.addEventListener('click', function(event) {
                    if (event.ctrlKey) {
                        abrirPaginaPorIdInNewTab(dropadoData.id);
                        return;
                    }

                    abrirPaginaPorId(dropadoData.id);
                });

                nameCell.addEventListener('contextmenu', function(event) {
                    event.preventDefault();
                    abrirPaginaPorIdInNewTab(dropadoData.id);
                });

                const consoleCell = document.createElement('td');
                consoleCell.innerText = dropadoData.console;
                row.appendChild(consoleCell);

                const genreCell = document.createElement('td');
                genreCell.innerText = dropadoData.genre;
                row.appendChild(genreCell);

                const noteCell = document.createElement('td');
                noteCell.innerText = dropadoData.note;
                row.appendChild(noteCell);

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

    fetchDropados(0);

});