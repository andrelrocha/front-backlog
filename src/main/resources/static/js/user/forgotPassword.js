document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var login = document.getElementById("userLogin").value;

    const userData = {
        login
    };
    
    fetch('http://localhost:8080/login/forgot_password', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            return response.text().then(errorMessage => {
                throw new Error(`Erro ${response.status}: ${errorMessage}`);
            });
        } else {
            throw new Error('Erro ao iniciar o processo de troca de senha. Por favor, tente novamente.');
        }
    })
    .then(data => {
        document.cookie = `token_pass=${data.tokenMail}; path=/`;
        alert('Tudo certo, confirme sua senha a seguir!');
        document.getElementById('loginForm').reset();
        window.location.href = 'http://localhost:1313/resetpassword';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
});