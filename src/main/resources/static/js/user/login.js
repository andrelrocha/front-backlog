document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var login = document.getElementById("userLogin").value;
    var password = document.getElementById("userPassword").value;
    
    const userData = {
        login,
        password
    };

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                return response.text().then(errorMessage => {
                    alert(errorMessage || 'Acesso proibido')
                    document.getElementById('loginForm').reset();
                    throw new Error(errorMessage || 'Acesso proibido');
                });
            } else {
                throw new Error('Erro na requisição');
            }
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token); 
        window.location.href = `http://localhost:1313/afterlogin`;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
