import trocaVisualizacaoJogosParaImg from './listaFinalizadosPorImage.js';
import listarFinalizados from './listaFinalizados.js';

document.addEventListener('DOMContentLoaded', function() {
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
                fetchFinalizados(pageNumber);
            });
    
            paginationContainer.appendChild(button);
        }
    }

    listarFinalizados();

    const trocaVisualizacaoJogos = document.getElementById('trocaVisualizacaoJogos');
    const tableContainer = document.getElementById('table-finalizados');

    trocaVisualizacaoJogos.addEventListener('click', function() {
        if (trocaVisualizacaoJogos.innerHTML.includes("fa fa-picture-o")) { 
            tableContainer.style.display = 'none';
            trocaVisualizacaoJogos.innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>';

            trocaVisualizacaoJogosParaImg();
        } else {
            location.reload();
        }
    });
});
