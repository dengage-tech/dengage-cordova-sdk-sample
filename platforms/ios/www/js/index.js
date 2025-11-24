// Main entry point
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready');
    initializeApp();
}

function initializeApp() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize Dengage SDK
    initializeDengage();
    
    // Track initial home screen view
    setTimeout(function() {
        if (typeof trackScreenView === 'function') {
            trackScreenView('home');
        }
    }, 500);
}
