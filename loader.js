(async function() {
    'use strict';
    
    // ========== KONFIGURATION ==========
    const SCRIPT_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/MathlethicsCheat/refs/heads/main/Mathletics_Hack.js';
    const CSS_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/MathlethicsCheat/main/loader.css';
    
    // ========== CSS IMPORTIEREN ==========
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = CSS_URL;
    document.head.appendChild(style);
    
    // Kurze Wartezeit bis CSS geladen ist
    await new Promise(r => setTimeout(r, 100));
    
    // ========== GUI ==========
    const gui = document.createElement('div');
    gui.className = 'smooth-loader';
    
    gui.innerHTML = `
        <div class="loader-header">
            <span class="loader-title">⚡ SCRIPT LOADER</span>
            <span class="loader-close" id="close-loader">✕</span>
        </div>
        <div class="animation-icon">
            <div class="icon-loading" id="loading-icon"></div>
            <div class="icon-success" id="success-icon">✅</div>
            <div class="icon-error" id="error-icon">❌</div>
        </div>
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
        </div>
        <div class="status-text" id="status-text">Loading script...</div>
        <div class="status-detail" id="status-detail"></div>
        <div class="speed-indicator" id="speed-indicator"></div>
        <div id="error-container"></div>
        <button class="retry-btn hidden" id="retry-btn">⟳ Retry</button>
        <div class="footer-credit">
            ✨ created by <span>lzhenwei</span> ✨
        </div>
    `;
    
    document.body.appendChild(gui);
    
    // ========== DRAG & DROP ==========
    let isDragging = false;
    let dragStartX, dragStartY, guiStartX, guiStartY;
    
    gui.addEventListener('mousedown', (e) => {
        if (e.target.id === 'close-loader') return;
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        guiStartX = gui.offsetLeft;
        guiStartY = gui.offsetTop;
        gui.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        gui.style.left = (guiStartX + dx) + 'px';
        gui.style.top = (guiStartY + dy) + 'px';
        gui.style.right = 'auto';
        gui.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        gui.style.cursor = '';
    });
    
    document.getElementById('close-loader').onclick = () => {
        gui.classList.add('fade-out');
        setTimeout(() => gui.remove(), 400);
    };
    
    // ========== UPDATE FUNCTIONS ==========
    let currentPercent = 0;
    const fill = document.getElementById('progress-fill');
    const statusText = document.getElementById('status-text');
    const statusDetail = document.getElementById('status-detail');
    const speedEl = document.getElementById('speed-indicator');
    
    function updateProgress(percent, text, detail = '') {
        if (percent < currentPercent) return;
        currentPercent = Math.min(100, Math.max(currentPercent, percent));
        if (fill) fill.style.width = currentPercent + '%';
        if (statusText && text) statusText.textContent = text;
        if (statusDetail && detail !== undefined) statusDetail.textContent = detail;
    }
    
    function updateSpeed(speedText) {
        if (speedEl) speedEl.textContent = speedText;
    }
    
    function showSuccess() {
        document.getElementById('loading-icon').style.display = 'none';
        document.getElementById('success-icon').style.display = 'inline-block';
        if (speedEl) speedEl.style.display = 'none';
        updateProgress(100, '✓ Script loaded successfully!', '');
        
        setTimeout(() => {
            gui.classList.add('fade-out');
            setTimeout(() => gui.remove(), 400);
        }, 2000);
    }
    
    function showError(errorCode, errorMessage) {
        document.getElementById('loading-icon').style.display = 'none';
        document.getElementById('error-icon').style.display = 'inline-block';
        if (speedEl) speedEl.style.display = 'none';
        
        document.getElementById('error-container').innerHTML = `
            <div class="error-details">
                <strong>${errorCode}</strong><br>${errorMessage}
            </div>
        `;
        
        const retryBtn = document.getElementById('retry-btn');
        retryBtn.classList.remove('hidden');
        retryBtn.onclick = () => { gui.remove(); location.reload(); };
    }
    
    // ========== SMOOTH WAIT ==========
    function smoothWait(minSec, maxSec) {
        const duration = (minSec + Math.random() * (maxSec - minSec)) * 1000;
        const speeds = ['▰▰▰▰▰', '▰▰▰▰▱', '▰▰▰▱▱', '▰▰▱▱▱', '▰▱▱▱▱'];
        updateSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        return new Promise(resolve => setTimeout(resolve, duration));
    }
    
    // ========== SMOOTH PROGRESS ==========
    async function animateProgress(targetPercent, text, detail, durationMs) {
        const startPercent = currentPercent;
        if (targetPercent <= startPercent) return;
        
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            function animate() {
                const elapsed = Date.now() - startTime;
                const t = Math.min(1, elapsed / durationMs);
                const eased = 1 - Math.pow(1 - t, 2.5);
                const newPercent = startPercent + (targetPercent - startPercent) * eased;
                
                currentPercent = newPercent;
                if (fill) fill.style.width = currentPercent + '%';
                if (statusText && text) statusText.textContent = text;
                if (statusDetail && detail !== undefined) statusDetail.textContent = detail;
                
                if (t < 1) {
                    requestAnimationFrame(animate);
                } else {
                    currentPercent = targetPercent;
                    if (fill) fill.style.width = currentPercent + '%';
                    resolve();
                }
            }
            requestAnimationFrame(animate);
        });
    }
    
    // ========== START ==========
    async function startLoading() {
        await animateProgress(12, 'Connecting to server...', '', 600);
        await smoothWait(0.5, 1.2);
        
        await animateProgress(25, 'Fetching script...', '', 700);
        await smoothWait(0.6, 1.3);
        
        await animateProgress(38, 'Downloading data...', '', 800);
        await smoothWait(0.7, 1.4);
        
        await animateProgress(52, 'Verifying integrity...', '', 700);
        await smoothWait(0.5, 1.2);
        
        await animateProgress(65, 'Processing...', '', 800);
        await smoothWait(0.6, 1.3);
        
        await animateProgress(78, 'Preparing execution...', '', 700);
        await smoothWait(0.5, 1.2);
        
        await animateProgress(89, 'Finalizing...', '', 600);
        await smoothWait(0.4, 1.0);
        
        await animateProgress(95, 'Executing script...', '', 500);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch(SCRIPT_URL, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const scriptCode = await response.text();
            
            await animateProgress(98, 'Injecting...', '', 300);
            await smoothWait(0.2, 0.4);
            
            const executeScript = new Function(scriptCode);
            executeScript();
            
            showSuccess();
            
        } catch(error) {
            let errorCode = 'CONNECTION_ERROR';
            let errorMessage = error.message;
            
            if (error.name === 'AbortError') {
                errorCode = 'TIMEOUT';
                errorMessage = 'Connection timeout';
            } else if (error.message.includes('Failed to fetch')) {
                errorCode = 'OFFLINE';
                errorMessage = 'No internet connection';
            } else if (error.message.includes('HTTP 404')) {
                errorCode = 'NOT_FOUND';
                errorMessage = 'Script file not found';
            }
            
            showError(errorCode, errorMessage);
        }
    }
    
    startLoading();
    
})();
