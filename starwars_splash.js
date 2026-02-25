(function () {
    // 1. Стилі для космосу та динамічних ефектів
    var style = `
        .sw-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: black; z-index: 99999; 
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; perspective: 600px;
        }

        .star {
            position: absolute; background: white; border-radius: 50%;
            opacity: 0.8; width: 2px; height: 2px;
            will-change: transform, height;
        }

        .sw-logo {
            font-family: 'Arial Black', sans-serif;
            font-size: 8vw; font-weight: bold; color: #FFE81F;
            text-shadow: 0 0 30px rgba(255, 232, 31, 0.9);
            transform: perspective(400px) rotateX(25deg);
            letter-spacing: 12px; z-index: 10;
            filter: blur(0px);
            animation: logoMove 3.5s ease-in-out forwards;
        }

        @keyframes logoMove {
            0% { opacity: 0; transform: perspective(400px) rotateX(25deg) scale(2.5); filter: blur(10px); }
            30% { opacity: 1; filter: blur(0px); }
            70% { opacity: 1; }
            100% { opacity: 0; transform: perspective(400px) rotateX(25deg) scale(0.4); }
        }

        .hyperspace-flash {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: white; opacity: 0; z-index: 100; pointer-events: none;
        }

        .flash-active {
            animation: flashAnim 0.7s ease-out forwards;
        }

        @keyframes flashAnim {
            0% { opacity: 0; }
            40% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    // 2. Створення елементів
    var container = document.createElement('div');
    container.className = 'sw-container';
    
    var logo = document.createElement('div');
    logo.className = 'sw-logo';
    logo.innerText = 'LAMPA';
    
    var flash = document.createElement('div');
    flash.className = 'hyperspace-flash';
    
    container.appendChild(logo);
    container.appendChild(flash);
    document.body.appendChild(container);

    // 3. Створення зірок
    var stars = [];
    var starCount = 120;

    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        
        // Випадкові позиції
        let x = Math.random() * 200 - 100;
        let y = Math.random() * 200 - 100;
        let z = Math.random() * 1000 - 1000;

        star.dataset.x = x;
        star.dataset.y = y;
        star.dataset.z = z;

        container.appendChild(star);
        stars.push(star);
    }

    // 4. Анімація зірок через RequestAnimationFrame (для плавності)
    function animateStars() {
        stars.forEach(star => {
            let z = parseFloat(star.dataset.z);
            z += 4; // Швидкість польоту
            if (z > 600) z = -1000; // Повернення зірки назад
            
            star.dataset.z = z;
            star.style.transform = `translate3d(${star.dataset.x}vw, ${star.dataset.y}vh, ${z}px)`;
        });
        if (container.parentNode) requestAnimationFrame(animateStars);
    }
    requestAnimationFrame(animateStars);

    // 5. Ефект Гіперстрибка та виходу
    setTimeout(() => {
        // Розтягуємо зірки в лінії
        stars.forEach(star => {
            star.style.transition = 'height 0.4s ease-in, background 0.4s';
            star.style.height = '150px'; 
            star.style.background = 'linear-gradient(to bottom, white, transparent)';
        });

        // Через 500мс робимо фінальний спалах і видаляємо заставку
        setTimeout(() => {
            flash.classList.add('flash-active');
            setTimeout(() => {
                container.style.transition = 'opacity 0.5s';
                container.style.opacity = '0';
                setTimeout(() => container.remove(), 500);
            }, 300);
        }, 400);

    }, 2800); // Час до початку стрибка
})();
