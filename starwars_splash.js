(function () {
    // 1. Додаємо стилі (ті самі, що були раніше)
    var style = `
        .lampa-starwars-splash {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: black; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; pointer-events: none;
        }
        .starwars-logo {
            color: #FFE81F; font-family: 'Arial Black', sans-serif;
            font-size: 5em; text-transform: uppercase;
            transform: perspective(300px) rotateX(25deg);
            text-shadow: 0 0 20px rgba(255, 232, 31, 0.8);
            animation: logo-fade 3s forwards;
        }
        @keyframes logo-fade {
            0% { opacity: 0; transform: perspective(300px) rotateX(25deg) scale(2); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: perspective(300px) rotateX(25deg) scale(0.8); }
        }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    // 2. Створюємо елемент заставки
    var splash = document.createElement('div');
    splash.className = 'lampa-starwars-splash';
    splash.innerHTML = '<div class="starwars-logo">LAMPA</div>';
    document.body.appendChild(splash);

    // 3. Функція для програвання звуку (використовуємо зовнішнє посилання на ефект)
    function playSaberSound() {
        var audio = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=0f9a7101-7058-472e-8e47-49504543d83d'); 
        // Альтернативне посилання на звук "Saber Ignite"
        audio.volume = 0.5;
        audio.play().catch(function(e) {
            console.log("Браузер заблокував звук до першої взаємодії");
        });
    }

    // Запускаємо звук через невелику затримку після появи лого
    setTimeout(playSaberSound, 200);

    // 4. Прибираємо заставку
    setTimeout(function() {
        splash.style.transition = 'opacity 1s ease-in-out';
        splash.style.opacity = '0';
        setTimeout(function() { splash.remove(); }, 1000);
    }, 3500);
})();
