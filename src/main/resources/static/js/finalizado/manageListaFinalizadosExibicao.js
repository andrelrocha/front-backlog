import trocaVisualizacaoJogosParaImg from './listaFinalizadosPorImage.js';

document.addEventListener('DOMContentLoaded', function() {
    const trocaVisualizacaoJogos = document.getElementById('trocaVisualizacaoJogos');
    const tableContainer = document.getElementById('table-finalizados');
    const imageContainer = document.getElementById('image-container');

    trocaVisualizacaoJogos.addEventListener('click', function() {
        if (trocaVisualizacaoJogos.innerHTML.includes("fa fa-picture-o")) { 
            console.log("Mudando para visualização de imagens");
            tableContainer.style.display = 'none';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';

            trocaVisualizacaoJogosParaImg();
        } else {
            console.log("Mudando para visualização de tabela");
            tableContainer.style.display = 'block';
            tableContainer.style.width = '100%';
            imageContainer.style.display = 'none';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-picture-o" aria-hidden="true"></i>';
        }
    });
});
