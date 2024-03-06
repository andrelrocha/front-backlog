document.addEventListener("DOMContentLoaded", function () {
    function generateHeader() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css';
        document.head.appendChild(linkElement);

        var header = document.createElement("header");

        var nav = document.createElement("nav");
        nav.id = "navHeader";
        nav.className = "navbar navbar-light justify-content-between fs-3";
        nav.style.position = "relative";

        var navbarLeft = document.createElement("div");
        navbarLeft.className = "navbar-left";

        var barsButton = document.createElement("button");
        barsButton.id = "barsButton";
        barsButton.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        navbarLeft.appendChild(barsButton);

        var links = [
            { href: "http://localhost:1313/jogos", text: "Ir para Jogos" },
            { href: "http://localhost:1313/jogando", text: "Ir para Jogando" },
            { href: "http://localhost:1313/opinioes", text: "Ir para Opiniões" }
        ];
        links.forEach(function (linkData) {
            var link = document.createElement("a");
            link.href = linkData.href;
            link.className = "btn btn-light me-2";
            link.textContent = linkData.text;
            link.id = "linkNavMenu";
            navbarLeft.appendChild(link);
        });

        barsButton.addEventListener("click", controlLinks);

        var navbarMiddle = document.createElement("div");
        navbarMiddle.className = "navbar-middle";
        navbarMiddle.id = "nomeAppNavBar";
        navbarMiddle.textContent += "Backlog App";

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

        var faviconLink = document.createElement("link");
        faviconLink.rel = "icon";
        faviconLink.href = "/images/icon.svg";
        document.head.appendChild(faviconLink);
    }

    function controlLinks() {
        var links = document.querySelectorAll("#linkNavMenu");

        if (barsButton.innerHTML.includes("fa-bars")) {
            barsButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
            links.forEach(function(link, index) {
                link.style.display = "block";
                link.style.transition = "opacity 0.4s ease-in-out";
                link.style.opacity = "0";
                setTimeout(function() {
                    link.style.opacity = "1";
                }, index * 100);
            });
        } else {
            for (var i = links.length - 1; i >= 0; i--) {
                (function (link, index) {
                    setTimeout(function () {
                        link.style.transition = "opacity 0.4s ease-in-out";
                        link.style.opacity = "0";
                        setTimeout(function () {
                            link.style.display = "none";
                        }, 200);
                    }, (links.length - 1 - index) * 100);
                })(links[i], i);
            }
            barsButton.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        }
    }

    generateHeader();

    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'http://localhost:1313/login';
    });
});
