document.addEventListener('DOMContentLoaded', function() {
    const trocaVisualizacaoJogos = document.getElementById('trocaVisualizacaoJogos');
    const tableContainer = document.getElementById('table-finalizados');
    const imageContainer = document.querySelector('.image-container');

    trocaVisualizacaoJogos.addEventListener('click', function() {
        
        if (trocaVisualizacaoJogos.innerHTML.includes("fa fa-picture-o")) { 
            console.log("Mudando para visualização de imagens");
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';
        } else {
            console.log("Mudando para visualização de tabela");
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-picture-o" aria-hidden="true"></i>';
        }

        tableContainer.style.display = 'none'; // Oculta a tabela
        imageContainer.innerHTML = ''; // Limpa o contêiner de imagens

        const token = localStorage.getItem('token');
        const startTime = performance.now(); 

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
            gameIds.forEach(gameId => {
                // Requisita a imagem em forma de blob para cada ID de jogo
                fetch(`http://localhost:8080/image/game/${gameId}`, {
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
                    return response.blob();
                }).then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    imageContainer.innerHTML += `<img src="${imageUrl}" id="${gameId}">`;
                }).catch(error => {
                    console.error(error);
                });
            });

            const endTime = performance.now(); 
            const elapsedTime = endTime - startTime; // Calcula o tempo decorrido na operação de ir no banco pegar as imagens
            console.log(`Tempo de execução: ${elapsedTime.toFixed(2)} milissegundos`);
        })
        .catch(error => {
            console.error(error);
        });
    });
});
