(function () {
    // 1. Стилі для космосу, зірок та ефекту гіперстрибка
    var style = `
        .sw-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle, #1b2735 0%, #090a0f 100%);
            z-index: 99999; display: flex; align-items: center; justify-content: center;
            overflow: hidden; perspective: 1000px;
        }

        .star {
            position: absolute; background: white; border-radius: 50%;
            opacity: 0.5; animation: moveStar linear infinite;
        }

        @keyframes moveStar {
            from { transform: translateZ(0px); opacity: 0.5; }
            to { transform: translateZ(1000px); opacity: 1; }
        }

        .sw-logo {
            font-family: 'Arial Black', sans-serif;
            font-size: 8vw; font-weight: bold; color: #FFE81F;
            text-shadow: 0 0 20px rgba(255, 232, 31, 0.7);
            transform: perspective(400px) rotateX(20deg);
            letter-spacing: 10px; z-index: 10;
            animation: logoArrival 3s ease-out forwards;
        }

        @keyframes logoArrival {
            0% { opacity: 0; transform: perspective(400px) rotateX(20deg) scale(3); filter: blur(10px); }
            50% { opacity: 1; filter: blur(0px); }
            100% { opacity: 0; transform: perspective(400px) rotateX(20deg) scale(0.5); }
        }

        /* Білий спалах при виході */
        .hyperspace-exit {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: white; opacity: 0; z-index: 11; pointer-events: none;
        }

        .flash-active {
            animation: finalFlash 0.8s ease-in-out forwards;
        }

        @keyframes finalFlash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    // 2. Створення структури
    var container = document.createElement('div');
    container.className = 'sw-container';
    
    var logo = document.createElement('div');
    logo.className = 'sw-logo';
    logo.innerText = 'LAMPA';
    
    var flash = document.createElement('div');
    flash.className = 'hyperspace-exit';
    
    container.appendChild(logo);
    container.appendChild(flash);
    document.body.appendChild(container);

    // 3. Генерація зірок (без сторонніх картинок)
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let duration = Math.random() * 2 + 0.5;
        let size = Math.random() * 3 + 'px';
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size;
        star.style.height = size;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(star);
    }

    // 4. Логіка завершення
    setTimeout(() => {
        flash.classList.add('flash-active'); // Запускаємо білий спалах
        setTimeout(() => {
            container.style.transition = 'opacity 0.5s';
            container.style.opacity = '0';
            setTimeout(() => container.remove(), 500);
        }, 400); // Прибираємо все в момент піку спалаху
    }, 2600);
})();
