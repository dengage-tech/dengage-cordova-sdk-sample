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
    
    // Register for notifications (callback receives Dengage notification events).
    DengageCR.registerNotification(
        function(payload) {
            try {
                const parsedPayload =
                    typeof payload === 'string' ? JSON.parse(payload) : payload;
                console.log('Dengage notification event:', JSON.stringify(parsedPayload, null, 2));

                if (parsedPayload && parsedPayload.eventType === 'PUSH_OPEN') {
                    showNotificationPayloadDialog(parsedPayload);
                }
            } catch (error) {
                console.error('Unable to parse notification payload:', error);
            }
        },
        function(error) {
            console.error('Error registering for notifications:', error);
        }
    );
}

function showNotificationPayloadDialog(payload) {
    const payloadText =
        payload && Object.keys(payload).length
            ? JSON.stringify(payload, null, 2)
            : 'Payload could not be parsed.';
    const payloadView = document.getElementById('last-payload-text');
    const timestampEl = document.getElementById('last-payload-time');

    if (payloadView) {
        payloadView.textContent = payloadText;
    }

    if (timestampEl) {
        timestampEl.textContent = `Last clicked: ${new Date().toLocaleTimeString()}`;
    }
}

