// Device Info Screen
var deviceInfoLoading = false;

function initDeviceinfo() {
    console.log('initDeviceinfo called');
    if (deviceInfoLoading) {
        console.log('Device info already loading, skipping');
        return;
    }
    loadDeviceInfoScreen();
}

function initDeviceInfo() {
    console.log('initDeviceInfo called (alternative name)');
    if (deviceInfoLoading) {
        console.log('Device info already loading, skipping');
        return;
    }
    loadDeviceInfoScreen();
}

function loadDeviceInfoScreen() {
    console.log('loadDeviceInfoScreen called');
    try {
        deviceInfoLoading = true;
        console.log('deviceInfoLoading set to:', deviceInfoLoading);
        
        const infoList = document.getElementById('device-info-list');
        console.log('infoList element:', infoList);
        if (!infoList) {
            console.error('device-info-list element not found');
            deviceInfoLoading = false;
            return;
        }
        
        console.log('Setting loading message');
        infoList.innerHTML = '<div class="loading">Loading...</div>';
        
        // Check if DengageCR is available
        console.log('Checking DengageCR:', typeof DengageCR);
        if (typeof DengageCR === 'undefined') {
            console.error('DengageCR is not defined');
            infoList.innerHTML = '<div class="error">DengageCR plugin not available</div>';
            deviceInfoLoading = false;
            return;
        }
        
        console.log('Calling DengageCR.getSubscription');
        
        // Set a timeout fallback in case callbacks never fire
        var timeoutId = setTimeout(function() {
            if (deviceInfoLoading) {
                console.warn('getSubscription timeout - using fallback');
                deviceInfoLoading = false;
                getDeviceInfoFallback();
            }
        }, 5000);
        
        // Get subscription info
        DengageCR.getSubscription(
            function(subscription) {
                clearTimeout(timeoutId);
                console.log('getSubscription success callback called');
                console.log('Subscription data:', subscription);
                deviceInfoLoading = false;
                try {
                    const info = typeof subscription === 'string' ? JSON.parse(subscription || '{}') : subscription;
                    console.log('Parsed info:', info);
                    displayDeviceInfo(info);
                } catch (e) {
                    console.error('Error parsing subscription:', e, e.stack);
                    getDeviceInfoFallback();
                }
            },
            function(error) {
                clearTimeout(timeoutId);
                console.error('Error getting subscription:', error);
                deviceInfoLoading = false;
                // Try to get individual values
                getDeviceInfoFallback();
            }
        );
    } catch (e) {
        console.error('=== ERROR in loadDeviceInfo catch block ===');
        console.error('Error:', e);
        console.error('Error message:', e.message);
        console.error('Error stack:', e.stack);
        deviceInfoLoading = false;
        const infoList = document.getElementById('device-info-list');
        if (infoList) {
            infoList.innerHTML = '<div class="error">Error loading device info: ' + e.message + '</div>';
        } else {
            console.error('Could not find infoList element to show error');
        }
    }
}

function getDeviceInfoFallback() {
    console.log('getDeviceInfoFallback called');
    const info = {};
    let loaded = 0;
    const total = 6;
    
    function checkComplete() {
        loaded++;
        console.log('Fallback loaded:', loaded, 'of', total);
        if (loaded === total) {
            console.log('All fallback data loaded, displaying info');
            displayDeviceInfo(info);
        }
    }
    
    if (typeof DengageCR === 'undefined') {
        console.error('DengageCR is not defined in fallback');
        const infoList = document.getElementById('device-info-list');
        if (infoList) {
            infoList.innerHTML = '<div class="error">DengageCR plugin not available</div>';
        }
        return;
    }
    
    DengageCR.getContactKey(
        function(contactKey) {
            console.log('getContactKey success:', contactKey);
            info.contactKey = contactKey || '';
            checkComplete();
        },
        function(error) {
            console.error('getContactKey error:', error);
            checkComplete();
        }
    );
    
    DengageCR.getMobilePushToken(
        function(token) {
            console.log('getMobilePushToken success:', token);
            info.token = token || '';
            checkComplete();
        },
        function(error) {
            console.error('getMobilePushToken error:', error);
            checkComplete();
        }
    );
    
    DengageCR.getPermission(
        function(permission) {
            console.log('getPermission success:', permission);
            info.permission = permission ? 'true' : 'false';
            checkComplete();
        },
        function(error) {
            console.error('getPermission error:', error);
            checkComplete();
        }
    );
    
    DengageCR.getDeviceId(
        function(deviceId) {
            console.log('getDeviceId success:', deviceId);
            info.deviceId = deviceId || '';
            info.udid = deviceId || ''; // Also set udid for consistency
            checkComplete();
        },
        function(error) {
            console.error('getDeviceId error:', error);
            checkComplete();
        }
    );
    
    DengageCR.getIntegrationKey(
        function(integrationKey) {
            console.log('getIntegrationKey success:', integrationKey);
            info.integrationKey = integrationKey || '';
            checkComplete();
        },
        function(error) {
            console.error('getIntegrationKey error:', error);
            checkComplete();
        }
    );
    
    DengageCR.getSdkVersion(
        function(version) {
            console.log('getSdkVersion success:', version);
            info.sdkVersion = version || '';
            checkComplete();
        },
        function(error) {
            console.error('getSdkVersion error:', error);
            checkComplete();
        }
    );
}

function displayDeviceInfo(info) {
    try {
        console.log('displayDeviceInfo called with:', info);
        console.log('Type of info:', typeof info);
        console.log('Info keys:', Object.keys(info || {}));
        
        const infoList = document.getElementById('device-info-list');
        if (!infoList) {
            console.error('device-info-list element not found in displayDeviceInfo');
            return;
        }
        
        console.log('Building device info object');
        const deviceInfo = {
            'Integration Key': info.integrationKey || '',
            'UDID': info.udid || info.deviceId || '',
            'Contact Key': info.contactKey || '',
            'User Permission': info.permission || (info.userPermission ? 'true' : 'false'),
            'Device Token': info.token || '',
            'SDK Version': info.sdkVersion || '',
            'Screen Width': window.screen.width * (window.devicePixelRatio || 1),
            'Screen Height': window.screen.height * (window.devicePixelRatio || 1),
            'OS Version': getOSVersion()
        };
        
        console.log('Device info object:', deviceInfo);
        
        let html = '';
        const fields = Object.keys(deviceInfo);
        console.log('Fields to display:', fields);
        fields.forEach((label, index) => {
            const value = deviceInfo[label];
            html += `
                <div class="info-row" ${index < fields.length - 1 ? 'style="border-bottom: 1px solid #ececec;"' : ''}>
                    <div class="info-label">${label}</div>
                    <div class="info-value">${value || 'N/A'}</div>
                </div>
            `;
        });
        
        console.log('Setting innerHTML, length:', html.length);
        infoList.innerHTML = html;
        console.log('innerHTML set successfully');
        
        // Add long press to copy
        const rows = infoList.querySelectorAll('.info-row');
        console.log('Found', rows.length, 'info rows');
        rows.forEach(row => {
            row.addEventListener('longpress', function() {
                const value = this.querySelector('.info-value').textContent;
                if (value && value !== 'N/A') {
                    copyToClipboard(value);
                    alert('Copied to clipboard');
                }
            });
        });
    } catch (e) {
        console.error('Error in displayDeviceInfo:', e, e.stack);
        const infoList = document.getElementById('device-info-list');
        if (infoList) {
            infoList.innerHTML = '<div class="error">Error displaying device info: ' + e.message + '</div>';
        }
    }
}

function getOSVersion() {
    if (window.device && window.device.version) {
        return window.device.version;
    }
    return navigator.userAgent;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Initialize when screen is shown
document.addEventListener('DOMContentLoaded', function() {
    const deviceInfoScreen = document.getElementById('device-info-screen');
    if (deviceInfoScreen) {
        // Use MutationObserver to watch for screen activation
        const observer = new MutationObserver(function(mutations) {
            if (deviceInfoScreen.classList.contains('active')) {
                console.log('Device info screen became active');
                // Small delay to ensure DOM is ready
                setTimeout(function() {
                    initDeviceinfo();
                }, 100);
            }
        });
        observer.observe(deviceInfoScreen, { attributes: true, attributeFilter: ['class'] });
        
        // Also check if screen is already active (in case DOMContentLoaded fires after navigation)
        if (deviceInfoScreen.classList.contains('active')) {
            setTimeout(function() {
                initDeviceinfo();
            }, 100);
        }
    }
});

// Also expose function globally for navigation.js to call
window.initDeviceinfo = initDeviceinfo;
window.initDeviceInfo = initDeviceInfo;

