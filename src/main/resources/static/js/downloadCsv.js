document.getElementById('downloadCSV').addEventListener('click', function() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/games/fromdbtocsv', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro ao baixar o arquivo CSV');
        }
        return response.blob();
    }).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backlogondb.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }).catch(error => {
        console.error('Erro:', error);
    });
});