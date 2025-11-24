// Dengage SDK Initialization
function initializeDengage() {
    console.log('Initializing Dengage SDK');
    
    // Set log status (enable logging)
    DengageCR.setLogStatus(
        true,
        function() {
            console.log('Dengage log status set to true');
        },
        function(error) {
            console.error('Error setting log status:', error);
        }
    );
    
    // Register for notifications
    DengageCR.registerNotification(
        function() {
            console.log('Registered for notifications');
        },
        function(error) {
            console.error('Error registering for notifications:', error);
        }
    );
    
    // Set up notification click listener if available
    if (typeof window.addEventListener !== 'undefined') {
        document.addEventListener('onNotificationClicked', function(event) {
            console.log('Notification clicked:', event);
        });
    }
}

