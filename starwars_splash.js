(function () {
    var style = `
        /* Робимо колір виділення кнопок золотим */
       .selector--active { 
           border-color: #FFE81F !important; 
           box-shadow: 0 0 15px rgba(255, 232, 31, 0.5) !important;
       }
      /* Колір іконок меню */
        .menu__item.active { 
            color: #FFE81F !important; 
        }
        .sw-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 99999; 
            overflow: hidden; perspective: 1000px;
            display: flex; align-items: center; justify-content: center;
        }
        .star {
            position: absolute; background: white; border-radius: 1px;
            width: 2px; height: 2px; left: 50%; top: 50%;
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

    var stars = [];
    var starCount = 120;
    var isHyperdrive = false;

    for (let i = 0; i < starCount; i++) {
        let angle = Math.random() * Math.PI * 2;
        let xDir = Math.cos(angle);
        let yDir = Math.sin(angle);
        let starEl = document.createElement('div');
        starEl.className = 'star';
        stars.push({
            el: starEl, xDir: xDir, yDir: yDir,
            z: Math.random() * -1500,
            angle: angle * (180 / Math.PI) + 90
        });
        container.appendChild(starEl);
    }

    function render() {
        stars.forEach(s => {
            s.z += isHyperdrive ? 50 : 5;
            if (s.z > 1000) s.z = -1500;
            let stretch = isHyperdrive ? `scaleY(${25 + Math.random() * 20})` : 'scaleY(1)';
            let x = s.xDir * (s.z + 1500) * 0.7;
            let y = s.yDir * (s.z + 1500) * 0.7;
            s.el.style.transform = `translate3d(${x}px, ${y}px, ${s.z}px) rotate(${s.angle}deg) ${stretch}`;
        });
        if (container.parentNode) requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    setTimeout(() => {
        isHyperdrive = true;
        container.style.filter = 'blur(1px)';
        setTimeout(() => {
            flash.classList.add('flash-active');
            setTimeout(() => {
                container.style.transition = 'opacity 0.6s ease-out';
                container.style.opacity = '0';
                setTimeout(() => container.remove(), 600);
            }, 400);
        }, 800);
    }, 2800);
})();
