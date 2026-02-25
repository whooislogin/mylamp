(function () {
    var style = `
        .console-container {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #0d0d0d; z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Courier New', Courier, monospace;
        }
        .console-window {
            width: 80%; max-width: 600px;
            background: #1a1a1a; border-radius: 10px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            overflow: hidden; border: 1px solid #333;
        }
        .console-header {
            background: #333; padding: 10px; display: flex; gap: 8px;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        
        .console-body {
            padding: 20px; color: #27c93f; font-size: 14px; line-height: 1.6;
        }
        .log-line { opacity: 0; margin-bottom: 5px; }
        .progress-wrapper {
            margin-top: 20px; border: 1px solid #27c93f; height: 20px;
            position: relative; overflow: hidden;
        }
        .progress-bar {
            width: 0%; height: 100%; background: #27c93f;
            transition: width 0.1s linear;
        }
        .cursor { display: inline-block; width: 8px; height: 15px; background: #27c93f; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        /* Золоті акценти для інтерфейсу Lampa */
        .selector--active { border: 3px solid #27c93f !important; box-shadow: 0 0 15px rgba(39, 201, 63, 0.5) !important; }
        .menu__item.active { color: #27c93f !important; }
    `;

    var styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    var container = document.createElement('div');
    container.className = 'console-container';
    container.innerHTML = `
        <div class="console-window">
            <div class="console-header">
                <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
            </div>
            <div class="console-body" id="console-content">
                <div id="log-container"></div>
                <div class="progress-wrapper"><div class="progress-bar" id="pb"></div></div>
                <p style="margin-top:10px">root@lampa:~$ <span class="cursor"></span></p>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    var logs = [
        "> Initializing Lampa Kernel...",
        "> Loading UI components... OK",
        "> Connecting to secure trackers...",
        "> Synchronizing database...",
        "> System check: All systems green.",
        "> Booting interface..."
    ];

    var logContainer = document.getElementById('log-container');
    var pb = document.getElementById('pb');
    var currentLog = 0;

    function showLogs() {
        if (currentLog < logs.length) {
            var line = document.createElement('div');
            line.className = 'log-line';
            line.style.opacity = '1';
            line.innerText = logs[currentLog];
            logContainer.appendChild(line);
            currentLog++;
            setTimeout(showLogs, 400);
        }
    }

    // Анімація прогрес-бару
    var progress = 0;
    var timer = setInterval(function() {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        pb.style.width = progress + '%';
        if (progress === 100) {
            clearInterval(timer);
            setTimeout(function() {
                container.style.opacity = '0';
                container.style.transition = 'opacity 0.5s';
                setTimeout(() => container.remove(), 500);
            }, 500);
        }
    }, 150);

    showLogs();
})();
