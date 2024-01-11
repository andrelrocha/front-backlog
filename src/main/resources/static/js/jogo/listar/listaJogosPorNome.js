document.addEventListener('DOMContentLoaded', function() {
    const searchByNameButton = document.getElementById('searchByName');
    const searchContainer = document.querySelector('.search');

    searchByNameButton.addEventListener('click', function() {
        const rowElement = document.createElement('div');
        rowElement.className = 'row mt-3';

        const colElement = document.createElement('div');
        colElement.className = 'col';

        const inputGroupElement = document.createElement('div');
        inputGroupElement.className = 'input-group mb-3';

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'form-control';
        inputElement.placeholder = 'Buscar...';
        inputElement.id = 'searchInput';

        inputElement.setAttribute('autofocus', 'autofocus');

        const buttonElement = document.createElement('button');
        buttonElement.type = 'button';
        buttonElement.className = 'btn btn-outline-secondary';
        buttonElement.id = 'searchButton';

        const searchIconElement = document.createElement('i');
        searchIconElement.className = 'bi bi-search';

        // Adiciona os elementos ao documento HTML
        buttonElement.appendChild(searchIconElement);
        inputGroupElement.appendChild(inputElement);
        inputGroupElement.appendChild(buttonElement);
        colElement.appendChild(inputGroupElement);
        rowElement.appendChild(colElement);

        // Adiciona a nova linha à div com classe "search"
        searchContainer.innerHTML = '';
        searchContainer.appendChild(rowElement);

        searchByNameButton.remove();
    });
});