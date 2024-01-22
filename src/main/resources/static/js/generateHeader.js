document.addEventListener("DOMContentLoaded", function () {
    function generateHeader() {
        var header = document.createElement("header");

        var nav = document.createElement("nav");
        nav.id = "navHeader";
        nav.className = "navbar navbar-light justify-content-between fs-3";
        nav.style.backgroundColor = "#696D7D";
        nav.style.position = "relative";

        var navbarLeft = document.createElement("div");
        navbarLeft.className = "navbar-left";

        var links = [
            { href: "http://localhost:1313/jogando", text: "Ir para Jogando" },
            { href: "http://localhost:1313/jogos", text: "Ir para Jogos" },
            { href: "http://localhost:1313/opinioes", text: "Ir para Opiniões" }
        ];

        links.forEach(function (linkData) {
            var link = document.createElement("a");
            link.href = linkData.href;
            link.className = "btn btn-success me-2";
            link.textContent = linkData.text;
            navbarLeft.appendChild(link);
        });

        var navbarMiddle = document.createElement("div");
        navbarMiddle.className = "navbar-middle";
        navbarMiddle.textContent = "Backlog App";

        var navbarRight = document.createElement("div");
        navbarRight.className = "navbar-right";

        var logoutButton = document.createElement("button");
        logoutButton.id = "logoutButton";
        logoutButton.className = "btn btn-danger ms-2";
        logoutButton.textContent = "Sair";
        navbarRight.appendChild(logoutButton);

        nav.appendChild(navbarLeft);
        nav.appendChild(navbarMiddle);
        nav.appendChild(navbarRight);

        header.appendChild(nav);

        document.body.insertBefore(header, document.body.firstChild);
    }

    generateHeader();

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });
});