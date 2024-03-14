import trocaVisualizacaoJogosParaImg from './listaFinalizadosPorImage.js';

document.addEventListener('DOMContentLoaded', function() {
    const trocaVisualizacaoJogos = document.getElementById('trocaVisualizacaoJogos');
    const tableContainer = document.getElementById('table-finalizados');

    trocaVisualizacaoJogos.addEventListener('click', function() {
        if (trocaVisualizacaoJogos.innerHTML.includes("fa fa-picture-o")) { 
            console.log("Mudando para visualização de imagens");
            tableContainer.style.display = 'none';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';

            trocaVisualizacaoJogosParaImg();
        } else {
            location.reload();
        }
    });
});
