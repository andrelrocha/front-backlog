document.getElementById('addGameImage').addEventListener('click', function () {
    console.log('Add game image chamado');
    
    const token = localStorage.getItem('token');

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpeg';
    input.onchange = function (e) {
        var file = e.target.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);

            var gameId = 702;

            // Replace with your server endpoint
            var endpoint = 'http://localhost:8080/image/create/' + gameId;

            fetch(endpoint, {
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
                        alert('Erro ao buscar informações do jogo. Por favor, tente novamente.');
                    }
                } else {
                    alert('Imagem adicionada com sucesso!');
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
