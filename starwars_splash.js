(function () {
    // Створюємо стилі для нашої "Зоряної" заставки
    var style = `
        .lampa-starwars-splash {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: black;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        
        /* Ефект зірок */
        .lampa-starwars-splash::before {
            content: "";
            position: absolute;
            width: 2px; height: 2px;
            background: white;
            box-shadow: 10vw 20vh white, 30vw 50vh white, 70vw 10vh white, 90vw 80vh white, 40vw 90vh white, 60vw 40vh white;
            animation: hyperdrive 1.5s infinite linear;
            opacity: 0.8;
        }

        @keyframes hyperdrive {
            from { transform: translateZ(0) scale(1); opacity: 1; }
            to { transform: translateZ(1000px) scale(5); opacity: 0; }
        }

        .starwars-logo {
            color: #FFE81F; /* Той самий жовтий */
            font-family: 'Arial Black', sans-serif;
            font-size: 5em;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transform: perspective(300px) rotateX(25deg);
            text-shadow: 0 0 20px rgba(255, 232, 31, 0.8);
            animation: logo-fade 3s forwards;
        }

        @keyframes logo-fade {
            0% { opacity: 0; transform: perspective(300px) rotateX(25deg) scale(1.5); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: perspective(300px) rotateX(25deg) scale(0.5); }
        }
    `;

    // Додаємо стилі в документ
    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    // Створюємо сам елемент заставки
    var splash = document.createElement('div');
    splash.className = 'lampa-starwars-splash';
    splash.innerHTML = '<div class="starwars-logo">LAMPA</div>';
    document.body.appendChild(splash);

    // Видаляємо заставку через 3 секунди (коли додаток провантажиться)
    setTimeout(function() {
        splash.style.transition = 'opacity 1s';
        splash.style.opacity = '0';
        setTimeout(function() { splash.remove(); }, 1000);
    }, 3000);
})();
