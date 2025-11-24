// Screen tracking utility - exposed globally
window.trackScreenView = function(screenId) {
    if (typeof DengageCR === 'undefined') {
        console.warn('DengageCR not available for tracking');
        return;
    }
    
    // Get screen display name
    const screenNames = {
        'home': 'Home',
        'device-info': 'Device Info',
        'contact-key': 'Change Contact Key',
        'inbox-messages': 'Inbox Messages',
        'in-app-message': 'In App Message',
        'rt-in-app-message': 'Real Time In App Message',
        'rt-in-app-filters': 'Real Time In App Filters',
        'geofence': 'Geofence',
        'in-app-inline': 'InApp Inline',
        'app-story': 'App Story',
        'event-history': 'Event History',
        'cart': 'Cart',
        'notification': 'Ask Notifications'
    };
    
    const screenName = screenNames[screenId] || screenId;
    const timestamp = new Date().toISOString();
    
    // Send pageview event
    const pageViewData = {
        screen_name: screenName,
        screen_id: screenId,
        timestamp: timestamp,
        platform: 'android'
    };
    
    DengageCR.pageView(
        pageViewData,
        function() {
            console.log('PageView tracked for:', screenName);
        },
        function(error) {
            console.error('Error tracking pageView:', error);
        }
    );
    
    // Send custom event
    const customEventData = {
        screen_name: screenName,
        screen_id: screenId,
        timestamp: timestamp,
        action: 'screen_view',
        platform: 'android',
        user_agent: navigator.userAgent,
        screen_width: window.screen.width,
        screen_height: window.screen.height
    };
    
    DengageCR.sendCustomEvent(
        'screen_events',
        'screen_view',
        customEventData,
        function() {
            console.log('Custom event tracked for:', screenName);
        },
        function(error) {
            console.error('Error tracking custom event:', error);
        }
    );
};

// Also expose as regular function for backward compatibility
function trackScreenView(screenId) {
    window.trackScreenView(screenId);
}

// Navigation functions
function navigateToScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Track screen view
        trackScreenView(screenId);
        
        // Initialize screen if needed - try multiple function name formats
        const camelCase = screenId.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
        const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        
        // Try different function name formats
        const functionNames = [
            'init' + pascalCase,
            'init' + camelCase,
            'init' + screenId.replace(/-/g, ''),
            'init' + screenId.replace(/-/g, '').charAt(0).toUpperCase() + screenId.replace(/-/g, '').slice(1)
        ];
        
        for (let i = 0; i < functionNames.length; i++) {
            const funcName = functionNames[i];
            if (typeof window[funcName] === 'function') {
                console.log('Calling init function:', funcName);
                setTimeout(function() {
                    window[funcName]();
                }, 50);
                break;
            }
        }
    }
}

function navigateToHome() {
    navigateToScreen('home');
}

function initializeNavigation() {
    // Set up menu button handlers
    const menuButtons = document.querySelectorAll('.menu-button[data-screen]');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            if (screenId === 'notification') {
                // Track notification screen view
                trackScreenView('notification');
                // Special handling for notification
                DengageCR.promptForPushNotifications(
                    function() {
                        console.log('Notification permission requested');
                        alert('Notification permission requested');
                    },
                    function(error) {
                        console.error('Error requesting notification permission:', error);
                    }
                );
            } else {
                navigateToScreen(screenId);
            }
        });
    });
}

