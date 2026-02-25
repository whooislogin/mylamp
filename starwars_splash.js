(function () {
    var style = `
        .matrix-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #000; z-index: 99999;
            overflow: hidden; font-family: 'Courier New', monospace;
        }
        #matrix-canvas {
            position: absolute; top: 0; left: 0; 
            width: 100%; height: 100%;
            z-index: 1; opacity: 0.6;
        }
        .console-window {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 85%; max-width: 550px;
            background: rgba(10, 10, 10, 0.9);
            border-radius: 8px; border: 1px solid #00ff41;
            box-shadow: 0 0 40px rgba(0, 255, 65, 0.2);
            z-index: 10; overflow: hidden;
        }
        .console-header {
            background: #222; padding: 10px; display: flex; gap: 8px;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        
        .console-body {
            padding: 20px; color: #00ff41; font-size: 14px; line-height: 1.5;
        }
        .progress-wrapper {
            margin-top: 15px; border: 1px solid #00ff41; height: 18px;
            background: rgba(0,0,0,0.7);
        }
        .progress-bar {
            width: 0%; height: 100%; background: #00ff41;
            box-shadow: 0 0 10px #00ff41;
        }

        /* Стилізація інтерфейсу Lampa */
        .selector--active { border: 3px solid #00ff41 !important; box-shadow: 0 0 15px rgba(0, 255, 65, 0.6) !important; }
        .menu__item.active { color: #00ff41 !important; }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    var container = document.createElement('div');
    container.className = 'matrix-container';
    container.innerHTML = `
        <canvas id="matrix-canvas"></canvas>
        <div class="console-window">
            <div class="console-header">
                <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
            </div>
            <div class="console-body">
                <div id="matrix-logs"></div>
                <div class="progress-wrapper"><div class="progress-bar" id="matrix-pb"></div></div>
                <p style="margin-top:10px">root@lampa:~$ <span id="matrix-status">initializing...</span></p>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // --- ЛОГІКА МАТРИЦІ ---
    var canvas = document.getElementById('matrix-canvas');
    var ctx = canvas.getContext('2d');

    // Налаштування розміру
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var nums = "0123456789";
    var alphabet = latin + nums;
    var fontSize = 16;
    var columns = canvas.width / fontSize;
    var drops = [];
    for (var x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        // Напівпрозорий чорний фон для ефекту "хвоста"
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Яскраво-зелений
        ctx.font = fontSize + "px arial";

        for (var i = 0; i < drops.length; i++) {
            var text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    var matrixInterval = setInterval(draw, 33);

    // --- ЛОГІКА ТЕРМІНАЛУ ---
    var logs = ["Wake up, Lampa...", "Bypassing protocols...", "Accessing TV core...", "System Ready."];
    var currentLog = 0;
    function showLogs() {
        if (currentLog < logs.length) {
            var p = document.createElement('div');
            p.innerText = "> " + logs[currentLog];
            document.getElementById('matrix-logs').appendChild(p);
            currentLog++;
            setTimeout(showLogs, 600);
        }
    }
    showLogs();

    var progress = 0;
    var pb = document.getElementById('matrix-pb');
    var timer = setInterval(function() {
        progress += 2;
        if (progress > 100) {
            progress = 100;
            clearInterval(timer);
            setTimeout(() => {
                container.style.transition = 'opacity 0.8s';
                container.style.opacity = '0';
                setTimeout(() => {
                    clearInterval(matrixInterval);
                    container.remove();
                }, 800);
            }, 500);
        }
        pb.style.width = progress + '%';
    }, 100);
})();
