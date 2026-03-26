(async function() {
    'use strict';

    // Here u can paste the link of a hack just delete the example. It will takes few seconds to load a hack.
    const HACK_URL = 'PASTE HERE THE LINK'; 

    const LOADER_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/scriptloader/refs/heads/main/loader.js';
    
    // ========== CSS DIREKT EINFÜGEN (damit Loader GUI hat) ==========
    const styles = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(-20px) scale(0.96); }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes checkBounce {
            0% { transform: scale(0); opacity: 0; }
            40% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-3px); }
            80% { transform: translateX(3px); }
        }
        @keyframes shimmer {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 0%; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }

        .smooth-loader {
            position: fixed;
            top: 30px;
            right: 30px;
            z-index: 999999;
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(12px);
            border-radius: 24px;
            padding: 24px 28px;
            min-width: 320px;
            font-family: -apple-system, 'Segoe UI', system-ui, sans-serif;
            font-size: 13px;
            color: #fff;
            border: 1px solid rgba(233, 69, 96, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            animation: slideIn 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            cursor: move;
        }
        .smooth-loader.fade-out { animation: fadeOut 0.4s ease forwards; }
        .loader-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .loader-title {
            font-weight: 600;
            font-size: 14px;
            background: linear-gradient(135deg, #e94560, #f97316);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .loader-close {
            cursor: pointer;
            font-size: 20px;
            opacity: 0.4;
            transition: all 0.2s;
        }
        .loader-close:hover { opacity: 1; transform: scale(1.1); color: #e94560; }
        .animation-icon {
            text-align: center;
            margin-bottom: 24px;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .icon-loading {
            display: inline-block;
            width: 44px;
            height: 44px;
            border: 3px solid rgba(233,69,96,0.2);
            border-top: 3px solid #e94560;
            border-right: 3px solid #f97316;
            border-radius: 50%;
            animation: spin 0.9s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        .icon-success { display: none; font-size: 52px; animation: checkBounce 0.5s ease forwards; }
        .icon-error { display: none; font-size: 52px; animation: shake 0.5s ease forwards; }
        .progress-container { margin: 20px 0 16px 0; }
        .progress-bar {
            width: 100%;
            height: 6px;
            background: rgba(255,255,255,0.08);
            border-radius: 10px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #e94560, #f97316, #e94560);
            background-size: 200% 100%;
            border-radius: 10px;
            transition: width 0.5s cubic-bezier(0.2,0.9,0.4,1);
            animation: shimmer 1.8s ease-in-out infinite;
        }
        .status-text {
            text-align: center;
            margin: 16px 0 8px 0;
            font-size: 13px;
            font-weight: 500;
            color: #e0e0e0;
        }
        .status-detail {
            text-align: center;
            font-size: 10px;
            color: #6a6a7a;
            font-family: monospace;
        }
        .error-details {
            background: rgba(248,113,113,0.08);
            border-left: 3px solid #f87171;
            padding: 12px;
            margin-top: 16px;
            font-size: 11px;
            color: #f87171;
            border-radius: 12px;
        }
        .retry-btn {
            width: 100%;
            background: linear-gradient(135deg, #e94560, #f97316);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            margin-top: 18px;
            transition: all 0.25s;
        }
        .retry-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(233,69,96,0.4); }
        .hidden { display: none; }
        .speed-indicator {
            text-align: center;
            font-size: 9px;
            color: #4a5568;
            margin-top: 12px;
            font-family: monospace;
        }
        .footer-credit {
            text-align: center;
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid rgba(255,255,255,0.05);
            font-size: 10px;
            color: #e94560;
            font-weight: 500;
            animation: pulse 2s infinite;
        }
        .footer-credit span { color: #888; font-weight: normal; }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // ========== LOADER LADEN ==========
    const response = await fetch(LOADER_URL);
    const scriptCode = await response.text();
    eval(scriptCode);
    
    // ========== LOADER STARTEN ==========
    if (window.MathLoader) {
        window.MathLoader.init(HACK_URL);
    } else {
        console.error('Loader not loaded correctly');
    }
    
})();
