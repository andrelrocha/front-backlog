document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    
    function abrirPaginaPorId(id) {
        document.cookie = `game_id=${id}; path=/`;
        window.location.href = 'http://localhost:1313/jogos/jogoporid';
    }


    document.getElementById('sugestaoJogo').addEventListener('click', function() {
        fetch('http://localhost:8080/games/suggestion', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const idDoJogo = data.id;
                abrirPaginaPorId(idDoJogo);
            })
            .catch(error => {
                alert('Erro ao buscar sugestão de livro:', error);
            });
    })
});