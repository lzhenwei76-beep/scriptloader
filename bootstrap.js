(async function() {
    'use strict';

    const HACK_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/MathlethicsCheat/main/hack.js';
    
    const CSS_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/scriptloader/refs/heads/main/loader.css';
    const LOADER_URL = 'https://raw.githubusercontent.com/lzhenwei76-beep/scriptloader/refs/heads/main/loader.js';
    
    // CSS laden
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    document.head.appendChild(link);
    
    // Loader laden
    const response = await fetch(LOADER_URL);
    const scriptCode = await response.text();
    eval(scriptCode);
    
    // Loader starten mit Hack-URL
    if (window.MathLoader) {
        window.MathLoader.init(HACK_URL);
    } else {
        console.error('Loader not loaded correctly');
    }
    
})();
