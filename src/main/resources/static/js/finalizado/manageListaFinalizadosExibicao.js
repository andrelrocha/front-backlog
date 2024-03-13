document.addEventListener('DOMContentLoaded', function() {
    const trocaVisualizacaoJogos = document.getElementById('trocaVisualizacaoJogos');

    trocaVisualizacaoJogos.addEventListener('click', function() {
        if (trocaVisualizacaoJogos.innerHTML.includes("fa fa-picture-o")) { 
            console.log("Mudando para visualização de imagens");
            tableContainer.style.display = 'none';
            imageContainer.style.display = 'block';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';
        } else {
            console.log("Mudando para visualização de tabela");
            tableContainer.style.display = 'block';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-picture-o" aria-hidden="true"></i>';
        }
    });
});
