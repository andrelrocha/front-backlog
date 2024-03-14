function trocaVisualizacaoJogosParaImg() {
    const imageContainer = document.getElementById('image-container');

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

    fetch(`http://localhost:8080/image/allgamesid`, {
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
    })
    .then(gameIds => {
        const gameIdsArray = gameIds;
    
        // Mapeia os IDs dos jogos para promessas de imagens
        const fetchPromises = gameIds.map(gameId => {
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
                    console.log(`Clicou na imagem do jogo ${imageData.gameId}`);
                    abrirPaginaPeloGameId(imageData.gameId, token);
                });
            });
        });
    }).catch(error => {
        console.error(error);
    });
}


export default trocaVisualizacaoJogosParaImg;
