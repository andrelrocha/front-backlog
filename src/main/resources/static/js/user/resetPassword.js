document.getElementById("resetPassForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var login = document.getElementById("userLogin").value;
    var password = document.getElementById("userPassword").value;
    var passwordConfirm = document.getElementById("userPasswordConfirm").value;

    if (password !== passwordConfirm) {
        alert('As senhas não conferem. Por favor, tente novamente.');
        document.getElementById('resetPassForm').reset();
        throw new Error('As senhas não conferem. Por favor, tente novamente.');
    }

    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    let tokenMail = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'token_pass') {
            tokenMail = value;
                break;
        }
    }

    const userData = {
        login,
        password,
        tokenMail
    };
    
    fetch('http://localhost:8080/login/reset_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert('Tudo certo, sua senha foi atualizada com sucesso!');
            document.getElementById('resetPassForm').reset();
            window.location.href = 'http://localhost:1313';
        } else if (response.status === 400) {
            return response.text().then(errorMessage => {
                throw new Error(`Erro ${response.status}: ${errorMessage}`);
            });
        } else {
            throw new Error('Erro ao trocar a senha. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
});