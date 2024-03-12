document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const button = document.getElementById('deleteFinishedButton');

    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    let finishedId = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'finished_id') {
            finishedId = value;
            break;
        }
    }

    button.addEventListener('click', function() {
        const userConfirmed = window.confirm('Você tem certeza que deseja excluir esta opinião? Esta ação não poderá ser desfeita.');

        if (userConfirmed) {
            fetch(`http://localhost:8080/finished/delete/${finishedId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        return response.text().then(errorMessage => {
                            alert('Erro 400: ' + errorMessage);
                            throw new Error(`Erro ${response.status}: ${errorMessage}`);
                        });
                    } else if (response.status === 401 || response.status === 403) {
                        throw new Error(`Erro ${response.status}: Você não está autorizado para a operação desejada`);
                    } else {
                        alert('Erro ao excluir opinião. Por favor, tente novamente.');
                    }
                }
                alert('Opinião excluída com sucesso!');
                window.location.href = 'http://localhost:1313/opinioes';
            });
        } else {
            console.log('Operação de exclusão cancelada pelo usuário.');
        }
    });
});
