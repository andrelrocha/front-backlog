document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('userLogin').value;
    const password = document.getElementById('userPassword').value;

    const userData = {
        login,
        password
    };

    fetch('http://localhost:8080/login/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário criado com sucesso!');
            document.getElementById('userForm').reset();
            window.location.href = 'http://localhost:1313/login';
        } else if (response.status === 400) {
            response.text().then(errorMessage => {
                alert(`Erro ${response.status}: ${errorMessage}`);
            });
        } else {
            alert('Erro ao criar usuário. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao processar a solicitação. Por favor, tente novamente.');
    });
});