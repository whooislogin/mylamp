(function () {
    var style = `
        .matrix-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #000; z-index: 99999;
            overflow: hidden; font-family: 'Courier New', monospace;
        }
        canvas {
            position: absolute; top: 0; left: 0; opacity: 0.4;
        }
        .console-window {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 85%; max-width: 550px;
            background: rgba(13, 13, 13, 0.95);
            border-radius: 8px; border: 1px solid #00ff41;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
            z-index: 10; overflow: hidden;
        }
        .console-header {
            background: #222; padding: 10px; display: flex; gap: 8px; border-bottom: 1px solid #333;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        
        .console-body {
            padding: 20px; color: #00ff41; font-size: 13px; line-height: 1.5;
            text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
        }
        .progress-wrapper {
            margin-top: 15px; border: 1px solid #00ff41; height: 18px;
            position: relative; background: rgba(0,0,0,0.5);
        }
        .progress-bar {
            width: 0%; height: 100%; background: #00ff41;
            box-shadow: 0 0 10px #00ff41; transition: width 0.15s linear;
        }
        
        /* Стилізація інтерфейсу Lampa під Матрицю */
        .selector--active { border: 3px solid #00ff41 !important; box-shadow: 0 0 15px rgba(0, 255, 65, 0.6) !important; }
        .menu__item.active { color: #00ff41 !important; }
        .is--focus .menu__item.active { background-color: rgba(0, 255, 65, 0.15) !important; }
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
                <p style="margin-top:10px">root@lampa:~$ <span id="matrix-status">waiting...</span></p>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // --- ЛОГІКА МАТРИЦІ (Falling Code) ---
    var canvas = document.getElementById('matrix-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    chars = chars.split("");
    var fontSize = 16;
    var columns = canvas.width / fontSize;
    var drops = [];
    for (var i = 0; i < columns; i++) drops[i] = 1;

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff41";
        ctx.font = fontSize + "px monospace";
        for (var i = 0; i < drops.length; i++) {
            var text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    var matrixInterval = setInterval(drawMatrix, 35);

    // --- ЛОГІКА КОНСОЛІ ---
    var logs = [
        "Wake up, Lampa...",
        "The Matrix has you...",
        "Loading system modules...",
        "Bypassing firewalls... DONE",
        "Decoding data streams...",
        "Access granted."
    ];
    var logDiv = document.getElementById('matrix-logs');
    var pb = document.getElementById('matrix-pb');
    var statusText = document.getElementById('matrix-status');
    var currentLog = 0;

    function showLogs() {
        if (currentLog < logs.length) {
            var p = document.createElement('p');
            p.style.margin = "2px 0";
            p.innerText = "> " + logs[currentLog];
            logDiv.appendChild(p);
            currentLog++;
            setTimeout(showLogs, 500);
        }
    }

    var progress = 0;
    var timer = setInterval(function() {
        progress += Math.random() * 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
            statusText.innerText = "system.run()";
            setTimeout(function() {
                container.style.transition = 'opacity 1s ease';
                container.style.opacity = '0';
                clearInterval(matrixInterval);
                setTimeout(() => container.remove(), 1000);
            }, 800);
        }
        pb.style.width = progress + '%';
    }, 120);

    showLogs();
})();
