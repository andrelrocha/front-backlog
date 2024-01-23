document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    const paginationContainer = document.getElementById('pagination');
    
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

    function convertToISODate(inputDate) {
        const parts = inputDate.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`;
        return formattedDate;
    }

    function editarData(id) {
        const firstPlayedInput = prompt('Quando foi a primeira vez que você jogou? (DD/MM/YYYY)');

        if (firstPlayedInput) {
            const firstPlayed = convertToISODate(firstPlayedInput);

            const playingData = JSON.stringify({
                id,
                firstPlayed
            });

            fetch('http://localhost:8080/playing/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: playingData
            }).then(response => {
                if (response.ok) {
                    alert('Data da primeira vez que jogou editada com sucesso!');
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
                    alert('Erro ao editar data da primeira vez que jogou. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(error.message);
            });
        }
    }

    function apagarData(id) {
        const confirmAction = prompt('Você tem certeza que deseja apagar o jogo da lista "Jogando"? (S/N)');

        if (confirmAction === 'S' || confirmAction === 's') {

            fetch(`http://localhost:8080/playing/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then(response => {
                if (response.ok) {
                    alert('Jogo removido da lista com sucesso!');
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
                    alert('Erro ao remover o jogo da lista. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(error.message);
            });
        } else {
            alert('Ação cancelada.');
        }
    }

    function criarOpiniao(gameId) {
        const note = prompt("Digite a nota do jogo:");
        const opinion = prompt("Digite sua opinião sobre o jogo:");

        const opinionData = JSON.stringify({
            gameId,
            note,
            opinion
        });

        if (note === null || opinion === null) {
            alert('Ação cancelada.');
            throw new Error('Ação cancelada.');
        } 

        fetch('http://localhost:8080/opinions/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: opinionData
        })
        .then(response => {
            if (response.status === 201) {
                alert('Opinião criada com sucesso!');
                window.location.href = 'http://localhost:1313/opinioes';
                return response.json();
            } else if (response.status === 400) {
                response.text().then(errorMessage => {
                    alert(`Erro ${response.status}: ${errorMessage}`);
                });
            } else if (response.status === 401 || response.status === 403) {
                alert('Erro 401: Você não está autorizado para a operação desejada');
            }  else {
                alert('Erro ao criar opinião. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
        });
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
                const firstPlayedDate = new Date(jogoData.firstPlayed);
                firstPlayedCell.innerText = firstPlayedDate.toLocaleDateString(); 
                row.appendChild(firstPlayedCell);

                const acaoCell = document.createElement('td');
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-warning', 'btn-lg', 'p-0', 'rounded');
                button.style.width = '30px';
                button.style.height = '30px';

                button.addEventListener('click', function() {
                    const escolha = prompt("Escolha 'editar', 'apagar' ou 'acabei':");

                    if (escolha === 'editar') {
                        editarData(jogoData.id);
                    } else if (escolha === 'apagar') {
                        apagarData(jogoData.id);
                    } else if(escolha == 'acabei') {
                        criarOpiniao(jogoData.gameId);
                    } else {
                        alert('Ação cancelada ou inválida.');
                        console.log('Ação cancelada ou inválida.');
                    }
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