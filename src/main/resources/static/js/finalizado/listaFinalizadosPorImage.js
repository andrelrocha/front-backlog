function trocaVisualizacaoJogosParaImg() {
    const imageContainer = document.getElementById('image-container');
    const paginationContainer = document.getElementById('pagination');

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

    function abrirPaginaPeloGameId(gameId, token) {
        fetch(`http://localhost:8080/finished/bygameid/${gameId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.text().then(errorMessage => {
                        alert('Erro 400: ' + errorMessage);
                        throw new Error(`Erro ${response.status}: ${errorMessage}`);
                    });
                } else if (response.status === 401 || response.status === 403) {
                    throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                } 
            }
            return response.json();
        }).then(finishedData => {    
            const finishedId = finishedData.id;
            document.cookie = `finished_id=${finishedId}; path=/`;
            window.location.href = 'http://localhost:1313/jogofinalizado';
        });
    }

    const token = localStorage.getItem('token');

    function fetchGames(pageNumber) {
        imageContainer.innerHTML = '';
        
        fetch(`http://localhost:8080/image/allgamesid?page=${pageNumber}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.text().then(errorMessage => {
                        alert('Erro 400: ' + errorMessage);
                        throw new Error(`Erro ${response.status}: ${errorMessage}`);
                    });
                } else if (response.status === 401 || response.status === 403) {
                    console.log(response.text());
                    throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                }
            }
    
            return response.json();
        }).then(gameIdsPage => {
            const totalPages = gameIdsPage.totalPages;
            const gameIdsArray = gameIdsPage.content.map(game => game.id);
    
            // Mapeia os IDs dos jogos para promessas de imagens
            const fetchPromises = gameIdsArray.map(gameId => {
                return fetch(`http://localhost:8080/image/game/${gameId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    if (!response.ok) {
                        if (response.status === 400) {
                            return response.text().then(errorMessage => {
                                alert('Erro 400: ' + errorMessage);
                                throw new Error(`Erro ${response.status}: ${errorMessage}`);
                            });
                        } else if (response.status === 401 || response.status === 403) {
                            throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                        } 
                    }
                    return response.blob();
                }).then(blob => {
                    return { gameId, blob }; // Retorna um objeto com o ID do jogo e o blob da imagem
                }).catch(error => {
                    console.error(error);
                });
            });
        
            // Aguarda todas as promessas serem resolvidas
            return Promise.all(fetchPromises).then(imagesData => {
                // Ordena as imagens na ordem em que foram recebidas do backend
                imagesData.sort((a, b) => {
                    return gameIdsArray.indexOf(a.gameId) - gameIdsArray.indexOf(b.gameId);
                });
        
                imagesData.forEach(imageData => {
                    const imageUrl = URL.createObjectURL(imageData.blob);
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    image.id = imageData.gameId;
                    imageContainer.appendChild(image);
                    
                    image.addEventListener('click', () => {
                        abrirPaginaPeloGameId(imageData.gameId, token);
                    });
                });

                // Cria os botões de paginação
                createPaginationButtons(totalPages);
            });
            
        }).catch(error => {
            console.error(error);
        });
    }

    fetchGames(0);
}

export default trocaVisualizacaoJogosParaImg;
