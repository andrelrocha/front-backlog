document.getElementById('addGameImage').addEventListener('click', function () {    
    const token = localStorage.getItem('token');

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg';
    input.onchange = function (e) {
        var file = e.target.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);

            const gameId = document.getElementById('gameId').innerText;

            fetch(`http://localhost:8080/image/create/${gameId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
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
                        console.error(response);
                        alert('Erro ao buscar informações do jogo. Por favor, tente novamente.');
                    }
                } else {
                    alert('Imagem adicionada com sucesso!');
                    document.cookie = `finished_id=${gameId}; path=/`;
                    location.reload();
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        }
    };
    input.click();
});
