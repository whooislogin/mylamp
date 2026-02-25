(function () {
    // 1. Стилі: Чорний космос, золоте лого та ефекти спалаху
    var style = `
        .sw-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 99999; 
            overflow: hidden; perspective: 1000px;
            display: flex; align-items: center; justify-content: center;
        }
        .star {
            position: absolute; background: white; border-radius: 1px;
            width: 2px; height: 2px;
            left: 50%; top: 50%;
            will-change: transform;
        }
        .sw-logo {
            position: relative; z-index: 10;
            font-family: 'Arial Black', sans-serif;
            font-size: 9vw; font-weight: bold; color: #FFE81F;
            text-shadow: 0 0 30px rgba(255, 232, 31, 0.9);
            transform: perspective(400px) rotateX(25deg);
            letter-spacing: 15px;
            animation: logoArrival 3.5s ease-in-out forwards;
        }
        @keyframes logoArrival {
            0% { opacity: 0; transform: perspective(400px) rotateX(25deg) scale(2.5); filter: blur(10px); }
            30% { opacity: 1; filter: blur(0px); }
            70% { opacity: 1; }
            100% { opacity: 0; transform: perspective(400px) rotateX(25deg) scale(0.4); }
        }
        .hyperspace-flash {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: white; opacity: 0; z-index: 100; pointer-events: none;
        }
        .flash-active { animation: flashAnim 0.8s ease-out forwards; }
        @keyframes flashAnim {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    // 2. Створення структури елементів
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

    // 3. Ініціалізація зірок
    var stars = [];
    var starCount = 120; // Оптимально для TV
    var isHyperdrive = false;

    for (let i = 0; i < starCount; i++) {
        let starEl = document.createElement('div');
        starEl.className = 'star';
        
        // Математика напрямку: кут від центру на 360 градусів
        let angle = Math.random() * Math.PI * 2;
        let xDir = Math.cos(angle);
        let yDir = Math.sin(angle);
        
        stars.push({
            el: starEl,
            xDir: xDir,
            yDir: yDir,
            z: Math.random() * -1500, // Глибина появи
            angle: angle * (180 / Math.PI) + 90 // Поворот "носом" від центру
        });
        
        container.appendChild(starEl);
    }

    // 4. Цикл анімації (60 FPS)
    function render() {
        stars.forEach(s => {
            // Збільшуємо швидкість під час гіперстрибка
            s.z += isHyperdrive ? 50 : 5;
            
            // Якщо зірка пролетіла за "камеру", повертаємо її вглиб
            if (s.z > 1000) s.z = -1500;

            // Ефект розтягування: збільшуємо масштаб по осі Y (яка розгорнута від центру)
            let stretch = isHyperdrive ? `scaleY(${25 + Math.random() * 20})` : 'scaleY(1)';
            
            // Розрахунок позиції (чим ближче Z, тим далі від центру x та y)
            let x = s.xDir * (s.z + 1500) * 0.7;
            let y = s.yDir * (s.z + 1500) * 0.7;

            s.el.style.transform = `translate3d(${x}px, ${y}px, ${s.z}px) rotate(${s.angle}deg) ${stretch}`;
        });

        if (container.parentNode) {
            requestAnimationFrame(render);
        }
    }
    requestAnimationFrame(render);

    // 5. Таймінги: Політ -> Стрибок -> Спалах -> Вихід
    setTimeout(() => {
        isHyperdrive = true; // Активуємо розтягування та прискорення
        container.style.filter = 'blur(1px)'; // Додаємо розмиття швидкості

        setTimeout(() => {
            flash.classList.add('flash-active'); // Білий спалах
            
            setTimeout(() => {
                container.style.transition = 'opacity 0.6s ease-out';
                container.style.opacity = '0';
                setTimeout(() => container.remove(), 600); // Повне видалення
            }, 400); // Видаляємо на піку спалаху
        }, 800); // Тривалість самого стрибка
    }, 2800); // Початок стрибка (синхронізовано зі зникненням лого)
})();
