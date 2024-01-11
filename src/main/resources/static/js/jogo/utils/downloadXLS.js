document.getElementById('downloadXLS').addEventListener('click', function() {
    const token = localStorage.getItem('token');

    const userPassword = prompt('Por favor, insira a senha do sistema:');

    fetch('http://localhost:8080/games/downloadbacklog', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secret: userPassword })
    }).then(response => {
        if (!response.ok) {
            if(response.status === 401 || response.status === 403) {
                alert('Erro 401: Você não está autorizado para a operação desejada');
                console.error('Erro:', response);
                throw new Error('Erro na requisição.');
            }
        }
        return response.blob();
    }).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backlog.xls';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }).catch(error => {
        console.error('Erro:', error);
    });
});